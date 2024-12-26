/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

const imagesCustomizations = [
  "product/vhlfd1db5gcmmnj9pxgi",
  "product/uqtxwdfbcbg1fvgc73is",
  "product/rlgxjrcwmcx1ctfcbwld",
  "product/o4478awis9fzqnzt348c",
  "product/mr848oxkbyld0umow0wj",
  "product/mocf1xzn8qyqyfxx5vk1",
  "product/ya8brzt2mvcp4mlra0zl",
  "product/ng6zchm9pqagvuuq4wby",
  "product/vthef84kjhpypl1tvezl",
  "product/vsyyiac4nrhtyfly7kpl",
  "product/oduuaquc0o9lubpheijh",
  "product/aujnpi1zdotgcjexwlqs",
  "product/v4kakhn3ydzybtlgybqc",
  "product/utb8awjotxljqgkcxtbs",
  "product/jbmbczumndavsooma9ea",
  "product/zem76yigyxw1mjxei6jx",
  "product/aui3jaikxruwpa6vzhpy",
  "product/wtl265mhtt7vndogari7",
  "product/ooo2srwtde0hllmr9elq",
  "product/ayja4cmnmp4znyie9awc",
  "product/sirsxpnu6y8bn9cgt8at",
  "product/zt7ey4rherubgtynefb4",
  "product/gqfwb8xyyugk0ld48iva",
  "product/gizg4llmvuiesyvjraie",
  "product/rdserwmg5v3pk508iafy",
  "product/bccuizoghbxufruhifko",
  "product/hqinvobxmuwztmwrwksl"
];

const imagesThemes = [
  "theme/v9rhywf91sfi332ej7lm",
  "theme/sbyxrcolofwvrczjwer2",
  "theme/xxbwrogd9qxr37kbr9lm",
  "theme/okjj0ppjtgfxaxahrrix",
  "theme/yfbxq1in5resdoqs8lgd",
  "theme/xuc5o9bwoz5aed7uy2hi",
  "theme/gnfulyvmvq6oumvu6alc",
  "theme/u1prhhgiyavuwrjeydo7",
  "theme/xotztbrozpez1ahfnwvz"
];

const imagesGraffitis = [
  "theme/v9rhywf91sfi332ej7lm",
  "theme/sbyxrcolofwvrczjwer2",
  "theme/xxbwrogd9qxr37kbr9lm",
  "theme/okjj0ppjtgfxaxahrrix",
  "graffiti/mjona1xguvsn2dgqis3l"
];

const getRandomElement = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}


async function main() {
  // Créer des catégories de sneakers
  const categorySneakers = [];
  const colorPrimaries = [];

  for (let i = 0; i < 5; i++) {
    const category = await prisma.categorySneaker.create({
      data: {
        name: faker.commerce.department(),
        description: faker.lorem.paragraph(),
        designer: faker.person.fullName(),
        popularity: faker.number.int({ min: 0, max: 100 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    categorySneakers.push(category);
  }

  // Créer des tags de sneakers
  const tagSneakers = [];
  for (let i = 0; i < 10; i++) {
    const tag = await prisma.tagSneaker.create({
      data: {
        name: faker.commerce.productAdjective(),
        description: faker.lorem.paragraph(),
        popularity: faker.number.int({ min: 0, max: 100 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    tagSneakers.push(tag);
  }

  // Créer des sneakers
  const sneakers = [];
  for (let i = 0; i < 10; i++) {
    const sneaker = await prisma.sneaker.create({
      data: {
        marque: faker.company.name(),
        model: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: parseFloat(faker.commerce.price()),
        reduction: faker.number.float({ min: 0, max: 0.5 }),
        isPromo: faker.datatype.boolean(),
        isCustomByGraffiti: faker.datatype.boolean(),
        stock: faker.number.int({ min: 0, max: 100 }),
        categoryId: categorySneakers[faker.number.int({ min: 0, max: categorySneakers.length - 1 })].id,
        tags: {
          connect: tagSneakers.slice(0, faker.number.int({ min: 1, max: 3 })).map(tag => ({ id: tag.id })),
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    sneakers.push(sneaker);
  }

  // Créer des couleurs primaires pour les sneakers
  for (const sneaker of sneakers) {
    for (let i = 0; i < 2; i++) {
      const colorPrimary = await prisma.colorPrimary.create({
        data: {
          quantity: faker.number.int({ min: 0, max: 100 }),
          name: faker.color.human(),
          color: faker.color.rgb(),
          sneakerId: sneaker.id,
        },
      });

      // Créer des tailles pour chaque couleur primaire
      for (let j = 0; j < 3; j++) {
        await prisma.size.create({
          data: {
            size: faker.number.int({ min: 36, max: 46 }),
            quantity: faker.number.int({ min: 0, max: 100 }),
            colorPrimaryId: colorPrimary.id,
          },
        });
      }

      colorPrimaries.push(colorPrimary);
    }
  }

  // Créer des catégories de customs
  const categoryCustoms = [];
  for (let i = 0; i < 5; i++) {
    const category = await prisma.categoryCustom.create({
      data: {
        name: faker.commerce.department(),
        description: faker.lorem.paragraph(),
        maintenance: faker.lorem.sentence(),
        properties: faker.lorem.sentence(),
        materials: faker.lorem.sentence(),
        creationTime: faker.date.past(),
        popularity: faker.number.int({ min: 0, max: 100 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    categoryCustoms.push(category);
  }

  // Créer des catégories de themes
  const categoryThemes = [];
  for (let i = 0; i < 5; i++) {
    const category = await prisma.categoryTheme.create({
      data: {
        name: faker.commerce.department(),
        secondName: faker.commerce.department(),
        description: faker.lorem.paragraph(),
        popularity: faker.number.int({ min: 0, max: 100 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    categoryThemes.push(category);
  }

  // Créer les themes de customs
  const themeCustoms = [];
  for (let i = 0; i < 10; i++) {
    const theme = await prisma.theme.create({
      data: {
        name: faker.commerce.productAdjective(),
        description: faker.lorem.paragraph(),
        popularity: faker.number.int({ min: 0, max: 100 }),
        categoryId: categoryThemes[faker.number.int({ min: 0, max: categoryThemes.length - 1 })].id,
        image: {
          create: {
            publicId: imagesThemes[faker.number.int({ min: 0, max: imagesThemes.length - 1 })],
            secureUrl: "secure url",
          }
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    themeCustoms.push(theme);
  }

  // ------------------------------------------------------------------------------------------
  // Créer des catégories de graffiti
  const categoryGraffitis = [];
  for (let i = 0; i < 5; i++) {
    const category = await prisma.categoryGraffiti.create({
      data: {
        name: faker.commerce.department(),
        description: faker.lorem.paragraph(),
        popularity: faker.number.int({ min: 0, max: 100 }),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
    categoryGraffitis.push(category);
  }

  // Créer les graffittis

  for (let i = 0; i < 10; i++) {
    await prisma.graffiti.create({
      data: {
        name: faker.commerce.productAdjective(),
        description: faker.lorem.paragraph(),
        textMaxLength: faker.number.int({ min: 3, max: 15 }),
        textMinLength: faker.number.int({ min: 3, max: 15 }),
        textMaxWords: faker.number.int({ min: 3, max: 3 }),
        price: parseFloat(faker.commerce.price()),
        popularity: faker.number.int({ min: 0, max: 100 }),
        categoryId: categoryGraffitis[faker.number.int({ min: 0, max: categoryGraffitis.length - 1 })].id,
        image: {
          create: {
            publicId: imagesGraffitis[faker.number.int({ min: 0, max: imagesGraffitis.length - 1 })],
            secureUrl: "secure url",
          }
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  }

  // Créer des customs
  for (let i = 0; i < 20; i++) {
    const custom = await prisma.custom.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        slug: faker.lorem.slug(),
        price: parseFloat(faker.commerce.price()),
        colorPrimaryId: getRandomElement(colorPrimaries).id,
        categories: {
          connect: categoryCustoms.slice(0, faker.number.int({ min: 1, max: 3 })).map(category => ({ id: category.id })),
        },
        themes: {
          connect: themeCustoms.slice(0, faker.number.int({ min: 1, max: 3 })).map(theme => ({ id: theme.id })),
        },
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });

    // Créer des couleurs secondaires pour chaque custom
    for (let j = 0; j < 3; j++) {
      await prisma.colorSecondary.create({
        data: {
          name: faker.color.human(),
          color: faker.color.rgb(),
          customId: custom.id,
        },
      });
    }

    // Créer des images pour chaque custom
    for (let j = 0; j < 3; j++) {
      await prisma.imageCustom.create({
        data: {
          publicId: imagesCustomizations[faker.number.int({ min: 0, max: imagesCustomizations.length - 1 })],
          secureUrl: "secure url",
          customId: custom.id,
        },
      });
    }
  }

  console.log('Base de données pré-remplie avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
