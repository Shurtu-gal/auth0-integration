import { Organization } from "../organization/Organization";
import { JsonValue } from "type-fest";
import { Profile } from "../profile/Profile";

export type User = {
  id: string;
  name: string;
  bio: string;
  email: string;
  age: number;
  birthDate: Date;
  score: number;
  manager?: User | null;
  employees?: Array<User>;
  organizations?: Array<Organization>;
  interests?: Array<"programming" | "design">;
  priority?: "high" | "medium" | "low";
  isCurious: boolean;
  location: string;
  extendedProperties: JsonValue;
  profile?: Profile | null;
  username: string;
  roles: JsonValue;
};
