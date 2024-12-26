/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function resetModels () {
  try {    
    await prisma.$transaction([
      // Supprimer les enregistrements dépendants en premier
      prisma.imageCustom.deleteMany(),
      prisma.imageTheme.deleteMany(),
      prisma.imageGraffiti.deleteMany(),
      prisma.colorSecondary.deleteMany(),
      prisma.size.deleteMany(),
      prisma.likeCustom.deleteMany(),
      prisma.likeTheme.deleteMany(),
      prisma.likeGraffiti.deleteMany(),
      prisma.customization.deleteMany(),
      prisma.colorCustomization.deleteMany(),
  
      // Supprimer les enregistrements principaux ensuite
      prisma.custom.deleteMany(),
      prisma.colorPrimary.deleteMany(),
      prisma.sneaker.deleteMany(),
      prisma.tagSneaker.deleteMany(),
      prisma.graffiti.deleteMany(),
      prisma.theme.deleteMany(),
  
      // Supprimer les catégories en dernier
      prisma.categorySneaker.deleteMany(),
      prisma.categoryCustom.deleteMany(),
      prisma.categoryGraffiti.deleteMany(),
      prisma.categoryTheme.deleteMany(),
    ]);

    const sneakers = await prisma.sneaker.findMany()
    for (let index = 0; index < sneakers.length; index++) {
        const element = sneakers[index];
        await prisma.sneaker.delete({
            where: {
                id: element.id
            }
        })
    }

    console.log('Base de données reset avec succès !');

  } catch (error) {
    throw new Error(error);
  }
};

resetModels()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });