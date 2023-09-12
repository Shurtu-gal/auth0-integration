import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { EmptyModuleBase } from "./base/empty.module.base";
import { EmptyService } from "./empty.service";
import { EmptyController } from "./empty.controller";
import { EmptyResolver } from "./empty.resolver";

@Module({
  imports: [EmptyModuleBase, forwardRef(() => AuthModule)],
  controllers: [EmptyController],
  providers: [EmptyService, EmptyResolver],
  exports: [EmptyService],
})
export class EmptyModule {}
