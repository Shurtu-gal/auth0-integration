/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as graphql from "@nestjs/graphql";
import * as apollo from "apollo-server-express";
import { isRecordNotFoundError } from "../../prisma.util";
import { MetaQueryPayload } from "../../util/MetaQueryPayload";
import * as nestAccessControl from "nest-access-control";
import * as gqlACGuard from "../../auth/gqlAC.guard";
import { GqlDefaultAuthGuard } from "../../auth/gqlDefaultAuth.guard";
import * as common from "@nestjs/common";
import { AclFilterResponseInterceptor } from "../../interceptors/aclFilterResponse.interceptor";
import { DeleteEmptyArgs } from "./DeleteEmptyArgs";
import { EmptyCountArgs } from "./EmptyCountArgs";
import { EmptyFindManyArgs } from "./EmptyFindManyArgs";
import { EmptyFindUniqueArgs } from "./EmptyFindUniqueArgs";
import { Empty } from "./Empty";
import { EmptyService } from "../empty.service";
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
@graphql.Resolver(() => Empty)
export class EmptyResolverBase {
  constructor(
    protected readonly service: EmptyService,
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {}

  @graphql.Query(() => MetaQueryPayload)
  @nestAccessControl.UseRoles({
    resource: "Empty",
    action: "read",
    possession: "any",
  })
  async _emptiesMeta(
    @graphql.Args() args: EmptyCountArgs
  ): Promise<MetaQueryPayload> {
    const result = await this.service.count(args);
    return {
      count: result,
    };
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => [Empty])
  @nestAccessControl.UseRoles({
    resource: "Empty",
    action: "read",
    possession: "any",
  })
  async empties(@graphql.Args() args: EmptyFindManyArgs): Promise<Empty[]> {
    return this.service.findMany(args);
  }

  @common.UseInterceptors(AclFilterResponseInterceptor)
  @graphql.Query(() => Empty, { nullable: true })
  @nestAccessControl.UseRoles({
    resource: "Empty",
    action: "read",
    possession: "own",
  })
  async empty(
    @graphql.Args() args: EmptyFindUniqueArgs
  ): Promise<Empty | null> {
    const result = await this.service.findOne(args);
    if (result === null) {
      return null;
    }
    return result;
  }

  @graphql.Mutation(() => Empty)
  @nestAccessControl.UseRoles({
    resource: "Empty",
    action: "delete",
    possession: "any",
  })
  async deleteEmpty(
    @graphql.Args() args: DeleteEmptyArgs
  ): Promise<Empty | null> {
    try {
      return await this.service.delete(args);
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new apollo.ApolloError(
          `No resource was found for ${JSON.stringify(args.where)}`
        );
      }
      throw error;
    }
  }
}
