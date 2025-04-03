import { AbstractRepository, AggregateRoot, Entity } from '../src';

// 定义领域事件
export class OrderCreatedEvent {
  constructor(public readonly orderId: string) {}
}

export class OrderLineItemAddedEvent {
  constructor(
    public readonly orderId: string,
    public readonly lineItemId: string,
    public readonly productId: string,
    public readonly quantity: number,
    public readonly unitPrice: number,
  ) {}
}

// 定义值对象
export class Money {
  constructor(
    public readonly amount: number,
    public readonly currency: string = 'CNY',
  ) {}

  public static fromNumber(amount: number): Money {
    return new Money(amount);
  }

  public add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new Error('Cannot add money with different currencies');
    }
    return new Money(this.amount + other.amount, this.currency);
  }

  public multiply(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }
}

// 定义实体
export interface LineItemData {
  id: string;
  productId: string;
  quantity: number;
  unitPrice: Money;
}

export class LineItem extends Entity<LineItemData> {
  public id: string;
  public productId: string;
  public quantity: number;
  public unitPrice: Money;

  constructor(data: LineItemData) {
    super(true); // 新建实体
    this.id = data.id;
    this.productId = data.productId;
    this.quantity = data.quantity;
    this.unitPrice = data.unitPrice;
  }

  public getTotal(): Money {
    return this.unitPrice.multiply(this.quantity);
  }

  public updateQuantity(quantity: number): void {
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
    this.quantity = quantity;
    this.markChanged('quantity');
  }
}

// 定义聚合根
export interface OrderData {
  id: string;
  customerId: string;
  status: 'created' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  items: LineItem[];
}

export class Order extends AggregateRoot<OrderData> {
  public id: string;
  public customerId: string;
  public status: 'created' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  private _items: LineItem[] = [];

  constructor(id: string, customerId: string) {
    super(true); // 新建实体
    this.id = id;
    this.customerId = customerId;
    this.status = 'created';

    // 发布创建事件
    this.apply(new OrderCreatedEvent(id));
  }

  // 获取订单项
  public get items(): LineItem[] {
    return [...this._items];
  }

  // 添加订单项
  public addItem(productId: string, quantity: number, unitPrice: number): LineItem {
    if (this.status !== 'created') {
      throw new Error('Cannot add items to an order that is not in created status');
    }

    const lineItemId = `item-${this._items.length + 1}`;
    const lineItem = new LineItem({
      id: lineItemId,
      productId,
      quantity,
      unitPrice: Money.fromNumber(unitPrice),
    });

    this._items.push(lineItem);
    // 将子实体添加到聚合根的管理中
    this.addChildEntity(lineItem);

    // 标记items字段变更
    this.markChanged('items');

    // 发布事件
    this.apply(new OrderLineItemAddedEvent(this.id, lineItemId, productId, quantity, unitPrice));

    return lineItem;
  }

  // 移除订单项
  public removeItem(lineItemId: string): void {
    if (this.status !== 'created') {
      throw new Error('Cannot remove items from an order that is not in created status');
    }

    const index = this._items.findIndex((item) => item.id === lineItemId);
    if (index === -1) {
      throw new Error(`Line item with id ${lineItemId} not found`);
    }

    const lineItem = this._items[index];
    this._items.splice(index, 1);

    // 从聚合根的管理中移除子实体
    this.removeChildEntity(lineItem);

    // 标记items字段变更
    this.markChanged('items');
  }

  // 计算订单总金额
  public getTotal(): Money {
    return this._items.reduce((total, item) => total.add(item.getTotal()), new Money(0));
  }

  // 标记订单为已支付
  public markAsPaid(): void {
    if (this.status !== 'created') {
      throw new Error('Cannot mark as paid an order that is not in created status');
    }

    this.status = 'paid';
    this.markChanged('status');
  }

  // 事件处理程序
  public onOrderCreatedEvent(event: OrderCreatedEvent): void {
    console.log(`Order ${event.orderId} created`);
  }

  public onOrderLineItemAddedEvent(event: OrderLineItemAddedEvent): void {
    console.log(
      `Line item added to order ${event.orderId}: ${event.quantity} x ${event.productId}`,
    );
  }
}

// 定义订单仓库
export class OrderRepository extends AbstractRepository<Order, string> {
  private orders: Map<string, Order> = new Map();

  async findAll(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.get(id) || null;
  }

  protected async doCreate(entity: Order): Promise<Order> {
    this.orders.set(entity.id, entity);
    return entity;
  }

  protected async doUpdate(entity: Order, changedData: Partial<OrderData>): Promise<Order> {
    // 在实际应用中，这里会将变更的字段更新到数据库
    console.log('更新订单，变更的字段:', Object.keys(changedData));

    // 重新保存实体
    this.orders.set(entity.id, entity);
    return entity;
  }

  protected async doRemove(entityOrId: Order | string): Promise<void> {
    const id = typeof entityOrId === 'string' ? entityOrId : entityOrId.id;
    this.orders.delete(id);
  }

  // 重写处理子实体的方法
  protected async handleChildEntity(entity: Entity<any>): Promise<void> {
    if (entity instanceof LineItem) {
      console.log('保存订单项:', entity);
      // 在实际应用中，这里会将订单项保存到数据库
      if (entity.isNew) {
        console.log('创建新的订单项:', entity.id);
      } else if (entity.isChanged) {
        console.log('更新订单项:', entity.id, '变更字段:', entity.changedFields);
      }

      // 标记为已保存
      entity.setSaved();
    }
  }
}

// 使用示例
async function demo() {
  // 创建订单仓库
  const orderRepo = new OrderRepository();

  // 创建订单
  const order = new Order('order-1', 'customer-1');

  // 添加订单项
  order.addItem('product-1', 2, 100);
  order.addItem('product-2', 1, 200);

  // 保存订单（将同时保存订单项）
  await orderRepo.save(order);
  console.log('订单已保存，ID:', order.id);
  console.log('订单总金额:', order.getTotal().amount);

  // 修改订单
  const lineItem = order.items[0];
  lineItem.updateQuantity(3);
  order.markAsPaid();

  // 再次保存订单
  await orderRepo.save(order);
  console.log('订单已更新');
  console.log('订单总金额:', order.getTotal().amount);
}

// 如果直接运行此文件，则执行示例
if (require.main === module) {
  demo().catch(console.error);
}
