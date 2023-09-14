import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { customSeed } from "./customSeed";
import { EnumUserPriority } from "../src/user/base/EnumUserPriority";

if (require.main === module) {
  dotenv.config();

  seed().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed() {
  console.info("Seeding database...");

  const client = new PrismaClient();

  const data = {
    username: "admin",
    roles: ["user"],
    name: "",
    bio: "",
    email: "example@example.com",
    age: 0,
    birthDate: new Date(),
    score: 0,
    interests: [],
    priority: EnumUserPriority.High,
    isCurious: false,
    location: "(32.085300, 34.781769)",

    extendedProperties: {
      foo: "bar",
    },
  };

  await client.user.upsert({
    where: {
      username: data.username,
    },

    update: {},
    create: data,
  });

  void client.$disconnect();

  console.info("Seeding database with custom seed...");
  customSeed();

  console.info("Seeded database successfully");
}
