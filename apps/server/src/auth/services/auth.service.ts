import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Email } from '@finda-co/domain-auth-core';

import { IdentityEntity, IdentityProvider } from '../../entities/identity.entity';
import { UserEntity } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(IdentityEntity)
    private identityRepository: Repository<IdentityEntity>,
  ) {}

  /**
   * 使用初始化方法来创建用户账户
   */
  async registerUser(
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
  ): Promise<UserEntity> {
    // 创建Email值对象（内置验证）
    const emailObj = Email.from(email);

    // 创建用户
    const user = UserEntity.create(uuidv4(), emailObj, firstName, lastName);

    await this.userRepository.save(user);

    // 创建身份
    const identity = IdentityEntity.create(
      uuidv4(),
      user.id,
      IdentityProvider.CREDENTIAL,
      emailObj.value,
    );

    // 使用初始化方法设置密码
    await identity.initializePassword(password);

    await this.identityRepository.save(identity);

    // 在内存中建立关系
    user.addIdentity(identity);

    return user;
  }
}
