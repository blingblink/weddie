import prisma from '../../lib/prisma';

const postHandler = async (req, res) => {
  // Halls
  await prisma.hall.createMany({
    data: [
      {
        name: 'A',
        type: 1,
        maxTables: 100,
        pricePerTable: 1000000,
      },
      {
        name: 'B',
        type: 2,
        maxTables: 200,
        pricePerTable: 2000000,
      },
      {
        name: 'C',
        type: 3,
        maxTables: 500,
        pricePerTable: 5000000,
      },
    ],
  });

  const halls = await prisma.hall.findMany();

  // Working shifts
  let shift;
  for (let i = 0; i < 7; i++) {
    shift = await prisma.workingShift.create({
      data: {
        weekday: i,
        startHour: 9,
        endHour: 13,
      },
    });
    await prisma.workingShift.create({
      data: {
        weekday: i,
        startHour: 13,
        endHour: 17,
      },
    });
    await prisma.workingShift.create({
      data: {
        weekday: i,
        startHour: 17,
        endHour: 21,
      },
    });
  }

  // Weddings
  // TODO: create receipts for each wedding
  // await prisma.wedding.createMany({
  //   data: [
  //     {
  //       groomName: 'Nguyễn Chí D',
  //       brideName: 'Nguyễn Ngọc H',
  //       dateOfWedding: new Date('2022-11-15'),
  //       workingShiftId: shift.id,
  //       hallId: halls[0].id,
  //       deposit: 5000000,
  //       numOfTables: 100,
  //       totalPrice: 100 * halls[0].pricePerTable,
  //       phoneNumber: '123456789',
  //     },
  //     {
  //       groomName: 'Nguyễn Tiến D',
  //       brideName: 'Nguyễn Ngọc H',
  //       dateOfWedding: new Date('2022-12-10'),
  //       workingShiftId: shift.id,
  //       hallId: halls[0].id,
  //       deposit: 50000000,
  //       numOfTables: 200,
  //       totalPrice: 200 * halls[0].pricePerTable,
  //       phoneNumber: '123456789',
  //     },
  //     {
  //       groomName: 'Nguyễn Hoàng L',
  //       brideName: 'Trương Thanh V',
  //       dateOfWedding: new Date('2022-12-28'),
  //       workingShiftId: shift.id,
  //       hallId: halls[0].id,
  //       deposit: 80000000,
  //       numOfTables: 500,
  //       totalPrice: 500 * halls[0].pricePerTable,
  //       phoneNumber: '123456789',
  //     },
  //   ],
  // });

  // Dishes
  await prisma.dish.createMany({
    data: [
      {
        name: 'Mì ý cua sốt kem',
        price: 200000,
        imageUrl: 'https://cdn.tgdd.vn/Files/2021/06/20/1361779/cach-lam-mi-y-cua-sot-kem-beo-ngay-ngon-chuan-pizza-4ps-202201122031546776.jpeg',
        note: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
      },
      {
        name: 'Mì Quảng trộn',
        price: 50000,
        imageUrl: 'https://static.riviu.co/960/image/2020/10/31/90ea462a91b99d088fe6964441a27dc1_output.jpeg',
        note: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
      },
      {
        name: 'Sashimi cá hồi',
        price: 100000,
        imageUrl: 'https://cookingchew.com/wp-content/uploads/2021/11/What-Is-Sashimi.jpg',
        note: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
      },
    ],
  });

  // Service
  await prisma.service.createMany({
    data: [
      {
        name: 'Nhạc Accoustic',
        price: 500000,
      },
      {
        name: 'Thợ chụp hình chuyên nghiệp',
        price: 1000000,
      },
      {
        name: 'Pháo hoa kim tuyến',
        price: 200000,
      },
      {
        name: 'Người hướng dẫn chương trình',
        price: 5000000,
      }
    ],
  });

  return res.status(201).json({});
}

export default function handler(req, res) {
  req.method === 'POST' ? postHandler(req, res) : res.status(404).send("");
}
