import { Injectable } from "@nestjs/common";
import { JwtBaseStrategy } from "./base/jwt.strategy.base";
import { ConfigService } from "@nestjs/config";
import { UserService } from "src/user/user.service";

@Injectable()
export class JwtStrategy extends JwtBaseStrategy {
  constructor(
    protected readonly configService: ConfigService,
    protected readonly userService: UserService,
  ) {
    super(configService, userService);
  }
}