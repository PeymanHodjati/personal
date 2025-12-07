import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const count = await prisma.project.count();
    console.log(`Total projects: ${count}`);
    const projects = await prisma.project.findMany({
        select: { title: true, type: true }
    });
    console.log(projects);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
