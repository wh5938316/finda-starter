/**
 * 值对象基类
 * 值对象是根据其属性值而非身份标识来定义的不可变对象
 *
 * @template T 值对象的属性类型
 */
export abstract class ValueObject<T extends Record<string, any>> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze({ ...props });
  }

  /**
   * 比较两个值对象是否相等
   * 值对象通过比较所有属性值来确定相等性
   *
   * @param other 要比较的另一个值对象
   * @returns 两个值对象是否相等
   */
  public equals(other: ValueObject<T>): boolean {
    if (other === null || other === undefined) {
      return false;
    }

    if (other.constructor !== this.constructor) {
      return false;
    }

    return this.equalsTo(other);
  }

  /**
   * 具体比较两个值对象的方法
   * 默认实现是比较所有props属性
   * 子类可以重写此方法以提供自定义的相等性比较逻辑
   *
   * @param other 要比较的另一个值对象
   * @returns 两个值对象是否相等
   */
  protected equalsTo(other: ValueObject<T>): boolean {
    const thisProps = Object.entries(this.props);
    const otherProps = Object.entries(other.props);

    if (thisProps.length !== otherProps.length) {
      return false;
    }

    for (const [key, value] of thisProps) {
      if (value instanceof ValueObject) {
        // 递归比较嵌套的值对象
        const otherValue = other.props[key];
        if (!(otherValue instanceof ValueObject) || !value.equals(otherValue)) {
          return false;
        }
      } else if (Array.isArray(value)) {
        // 比较数组
        const otherValue = other.props[key];
        if (!Array.isArray(otherValue) || value.length !== otherValue.length) {
          return false;
        }

        for (let i = 0; i < value.length; i++) {
          const item = value[i];
          const otherItem = otherValue[i];

          if (item instanceof ValueObject) {
            if (!(otherItem instanceof ValueObject) || !item.equals(otherItem)) {
              return false;
            }
          } else if (item !== otherItem) {
            return false;
          }
        }
      } else if (value !== other.props[key]) {
        return false;
      }
    }

    return true;
  }

  /**
   * 获取指定属性的值
   *
   * @param key 属性名
   * @returns 属性值
   */
  protected getValue<K extends keyof T>(key: K): T[K] {
    return this.props[key];
  }
}
