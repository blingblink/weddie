import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// const prisma = new PrismaClient({
//   log: [
//     {
//       emit: "event",
//       level: "query",
//     },
//   ],
// });
// 
// prisma.$on("query", async (e) => {
//     console.log(`${e.query} ${e.params}`)
// });

export default prisma;
