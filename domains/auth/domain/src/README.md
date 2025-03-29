# 认证域模型更新记录

## Identity 类更新

已对 Identity 类进行以下更新:

1. 增加了 `accountId` 字段，用于表示由SSO提供的账户ID，对于credential类型则等于userId
2. 将 `providerId` 改为 `provider`，并使用类型安全的字符串字面量类型
3. 定义了 `providerValues` 字符串常量数组，用于定义可接受的提供商类型:
   ```typescript
   export const providerValues = ['credential', 'google', 'github', 'facebook'] as const;
   export type Provider = (typeof providerValues)[number];
   ```
4. 更新了相关事件以使用新的 `Provider` 类型

## UserRole 类型更新

将 UserRole 从枚举改为字符串字面量类型:

```typescript
export const userRoleValues = ['user', 'admin'] as const;
export type UserRole = (typeof userRoleValues)[number];
```

## 基础设施层临时兼容方案

由于domain模块的更改尚未发布到 `@finda-co/domain-auth-core` 包中，基础设施层的代码临时保持兼容性:

1. Mapper 类中添加了适当的转换，使用旧的API调用新的实现
2. 在发布新版本的domain-auth-core包后，基础设施层代码应进行更新，以直接使用新的字段和类型

## 迁移注意事项

1. 确保更新基础设施层中的所有引用providerId的地方为provider
2. 将旧的providerAccountId更改为accountId
3. 更新数据库模式以包含accountId字段
