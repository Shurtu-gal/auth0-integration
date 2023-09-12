import { UserWhereUniqueInput } from "./UserWhereUniqueInput";
import { UserUpdateManyWithoutUsersInput } from "./UserUpdateManyWithoutUsersInput";
import { OrganizationUpdateManyWithoutUsersInput } from "./OrganizationUpdateManyWithoutUsersInput";
import { InputJsonValue } from "../../types";
import { ProfileWhereUniqueInput } from "../profile/ProfileWhereUniqueInput";

export type UserUpdateInput = {
  name?: string;
  bio?: string;
  email?: string;
  age?: number;
  birthDate?: Date;
  score?: number;
  manager?: UserWhereUniqueInput | null;
  employees?: UserUpdateManyWithoutUsersInput;
  organizations?: OrganizationUpdateManyWithoutUsersInput;
  interests?: Array<"programming" | "design">;
  priority?: "high" | "medium" | "low";
  isCurious?: boolean;
  location?: string;
  extendedProperties?: InputJsonValue;
  profile?: ProfileWhereUniqueInput | null;
  username?: string;
  password?: string;
  roles?: InputJsonValue;
};
