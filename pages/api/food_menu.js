// import prisma from '../../lib/prisma';
// 
// const postHandler = async (req, res) => {
//   const {
//     userEmail,
//     drinkId,
//   } = req.body;
//   const user = await prisma.user.findUnique({
//     where: {
//       email: userEmail,
//     }
//   });
//   const existingDrinkInCart = await prisma.drinkInShoppingCart.findUnique({
//     where: {
//       userId_drinkId: {
//         userId: user.id,
//         drinkId,
//       },
//     },
//   });
// 
//   let result;
//   if (existingDrinkInCart) {
//     result = await prisma.drinkInShoppingCart.update({
//       where: {
//         userId_drinkId: {
//           userId: user.id,
//           drinkId,
//         },
//       },
//       data: {
//         quantity: existingDrinkInCart.quantity + 1,
//       }
//     });
//   } else {
//     result = await prisma.drinkInShoppingCart.create({
//       data: {
//         userId: user.id,
//         drinkId,
//         quantity: 1,
//       }
//     });
//   }
//   return res.status(201).json(result);
// }
// 
// const getHandler = async (req, res) => {
//   const { userEmail } = req.query;
//   const user = await prisma.user.findUnique({
//     where: {
//       email: userEmail,
//     }
//   });
//   const drinksRelations = await prisma.drinkInShoppingCart.findMany({
//     where: {
//       userId: {
//         equals: user.id,
//       }
//     },
//     orderBy: {
//       createdAt: "asc",
//     },
//     select: {
//       quantity: true,
//       drink: {
//         select: {
//           id: true,
//           name: true,
//           sizeInMl: true,
//           priceInDong: true,
//           drinkPhotos: {
//             select: {
//               data: true,
//             },
//             orderBy: {
//               createdAt: 'asc',
//             },
//           },
//         },
//       },
//     },
//   });
//   const formattedDrinks = drinksRelations.map(relation => ({
//     ...relation.drink,
//     quantity: relation.quantity,
//     drinkPhotos: relation.drink.drinkPhotos.length > 0 ? [relation.drink.drinkPhotos[0].data] : [],
//   }));
// 
//   return res.status(201).json({
//     drinks: formattedDrinks,
//   });
// }
// 
// const putHandler = async (req, res) => {
//   const {
//     userEmail,
//     drinkId,
//   } = req.body;
//   const user = await prisma.user.findUnique({
//     where: {
//       email: userEmail,
//     }
//   });
//   const result = await prisma.drinkInShoppingCart.delete({
//     where: {
//       userId_drinkId: {
//         userId: user.id,
//         drinkId,
//       },
//     },
//   });
// 
//   return res.status(201).json(result);
// }
// 
// const deleteHandler = async (req, res) => {
//   const {
//     userEmail,
//     drinkId,
//   } = req.body;
//   const user = await prisma.user.findUnique({
//     where: {
//       email: userEmail,
//     }
//   });
//   const result = await prisma.drinkInShoppingCart.delete({
//     where: {
//       userId_drinkId: {
//         userId: user.id,
//         drinkId,
//       },
//     },
//   });
// 
//   return res.status(201).json(result);
// }
// 
// export default function handler(req, res) {
//   if (req.method === 'POST') return postHandler(req, res);
//   else if (req.method === 'GET') return getHandler(req, res);
//   else if (req.method === 'PUT') return putHandler(req, res);
//   else if (req.method === 'DELETE') return deleteHandler(req, res);
// 
// 
//   res.status(404).send("");
// }
