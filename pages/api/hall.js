import prisma from '../../lib/prisma';

const postHandler = async (req, res) => {
  const {
    name,
    type,
    max_tables,
    price_per_table,
    note,
    isAvailable,
  } = req.body;

  // const result = await prisma.hall.create({
  //   data: {
  //     name,
  //     type,
  //     max_tables,
  //     price_per_table,
  //     note,
  //     isAvailable: (isAvailable === null || isAvailable === undefined) ? true : isAvailable,
  //   },
  // });

  // Hack for demo
  const result = {};
//   for (let i = 0; i < 7; i++) {
// 
//     await prisma.workingShift.create({
//       data: {
//         weekday: i,
//         startHour: 9,
//         endHour: 13,
//       },
//     });
//     await prisma.workingShift.create({
//       data: {
//         weekday: i,
//         startHour: 13,
//         endHour: 17,
//       },
//     });
//     await prisma.workingShift.create({
//       data: {
//         weekday: i,
//         startHour: 17,
//         endHour: 21,
//       },
//     });
//   }
  return res.status(201).json(result);
}

export default function handler(req, res) {
  req.method === 'POST' ? postHandler(req, res) : res.status(404).send("");
}
