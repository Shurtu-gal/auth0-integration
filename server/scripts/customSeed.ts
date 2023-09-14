import { EnumUserPriority, PrismaClient } from "@prisma/client";

export async function customSeed() {
  const client = new PrismaClient();
  const username = "admin";

  //replace this sample code to populate your database
  //with data that is required for your service to start
  
  const user = {
    name: "YOUR_NAME",
    email: "YOUR_EMAIL",
    roles: ["user"], // TODO: Add a default role
    username: "YOUR_USERNAME",
    age: 0,
    birthDate: new Date(),
    score: 0,
    interests: [],
    priority: EnumUserPriority.low,
    isCurious: false,
    location: "(32.085300, 34.781769)",
    bio: "YOUR BIO",
    extendedProperties: {},
  };

  await client.user.upsert({
    where: {
      username,
    },

    update: {},
    create: user,
  });

  client.$disconnect();
}
