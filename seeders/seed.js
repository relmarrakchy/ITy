const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.$connect();

    const dataCategory = [
      { id: 1, nom: "Back-end" },
      { id: 2, nom: "Front-end" },
      { id: 3, nom: "Cloud computing" },
      { id: 4, nom: "AI" },
      { id: 5, nom: "DevOps" },
    ];

    await prisma.categorie.createMany({ data: dataCategory });

    console.log('Seeding completed.');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seeder
seed();