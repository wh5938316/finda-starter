import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Email, Password } from '@finda-co/domain-auth-core';

import { IdentityEntity, IdentityProvider } from '../../entities/identity.entity';
import { INTERNAL_IDENTITY_FUNC_TOKEN } from '../../entities/identity.entity';
import { UserEntity, UserRole } from '../../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(IdentityEntity)
    private identityRepository: Repository<IdentityEntity>,
  ) {}

  /**
   * 通过邮箱密码注册用户
   * @param email 邮箱
   * @param password 密码
   * @param firstName 名
   * @param lastName 姓
   * @returns 创建的用户
   */
  async register(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<UserEntity> {
    try {
      // 使用值对象进行验证，确保数据有效
      const emailObj = Email.from(email);

      // 创建用户实体（使用充血模型的工厂方法）
      const user = UserEntity.create(
        uuidv4(),
        emailObj, // 直接传入Email值对象
        firstName,
        lastName,
      );

      // 持久化用户
      const savedUser = await this.userRepository.save(user);

      // 创建身份实体 - 使用异步工厂方法，直接处理密码哈希
      const identity = await IdentityEntity.createWithPassword(
        uuidv4(),
        savedUser.id,
        IdentityProvider.CREDENTIAL,
        emailObj.value, // 使用Email值对象的value属性
        {
          password, // 直接传入明文密码，由工厂方法处理哈希
        },
      );

      // 持久化身份
      await this.identityRepository.save(identity);

      // 添加身份到用户并在内存中建立关系
      savedUser.addIdentity(identity);

      return savedUser;
    } catch (error) {
      // 处理错误，包括Email值对象可能抛出的InvalidEmailError
      throw error;
    }
  }

  /**
   * 用户登录
   * @param email 邮箱
   * @param password 密码
   * @returns 登录成功的用户
   */
  async login(email: string, password: string): Promise<UserEntity> {
    try {
      // 使用Email值对象进行验证
      const emailObj = Email.from(email);

      // 通过Email查找用户（TypeORM会自动使用转换器）
      const user = await this.userRepository.findOne({
        where: { email: emailObj.value },
        relations: ['identities'],
      });

      if (!user) {
        throw new Error('用户不存在');
      }

      // 使用充血模型的业务方法进行密码验证
      const authenticated = await user.authenticate(password);

      if (!authenticated) {
        throw new Error('密码错误');
      }

      // 使用充血模型的业务方法记录登录
      user.recordLogin();

      // 持久化更改
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      // 处理各种错误
      throw error;
    }
  }
}
