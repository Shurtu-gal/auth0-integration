import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt/jwt.strategy';

@Module({
  imports: [
    forwardRef(()  => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [
    JwtStrategy,
  ],
  controllers: [],
  exports: [PassportModule],
})
export class AuthModule {}
