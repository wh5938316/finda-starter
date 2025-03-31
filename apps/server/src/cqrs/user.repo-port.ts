/**
 * 用户仓库接口
 * 定义与User聚合根交互的所有方法
 */
export interface IUserRepository {
  /**
   * 保存用户
   * @param user 用户聚合根
   */
  save(user: any): Promise<void>;
}
