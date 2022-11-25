import prisma from '../../lib/prisma';

const calculateTotalPrice = async ({ hallId, numOfTables, dishes, services }) => {
  const hall = await prisma.hall.findUnique({
    where: { id: hallId },
  });

  let totalPrice = numOfTables * hall.pricePerTable;
  dishes.forEach(dish => totalPrice += numOfTables * dish.price);
  services.forEach(service => totalPrice += numOfTables * service.price);

  return totalPrice;
};

const postHandler = async (req, res) => {
  const {
    groomName,
    brideName,
    dateOfWedding,
    workingShiftId,
    hallId,
    deposit,
    numOfTables,
    phoneNumber,
    dishes,
    services,
  } = req.body;

  const totalPrice = await calculateTotalPrice({
    hallId,
    numOfTables,
    dishes,
    services,
  });
  const result = await prisma.wedding.create({
    data: {
      groomName,
      brideName,
      dateOfWedding: new Date(dateOfWedding),
      workingShiftId,
      hallId,
      totalPrice: totalPrice,
      deposit: deposit,
      numOfTables: numOfTables,
      phoneNumber: phoneNumber,

      // Nested-create the services and dishes
      dishes: {
        create: dishes.map(dish => ({
          dishId: dish.id,
          servingOrder: dish.servingOrder,
        })),
      },
      services: {
        create: services.map(service => ({
          serviceId: service.id,
        })),
      },

      // Create an unsigned Contract and unpaid Receipt for the wedding
      receipts: {
        create: [
          {
            name: 'Hoá đơn đặt cọc',
            price: deposit,
            isDeposit: true,
          },
          {
            name: 'Hoá đơn tổng tiền',
            price: totalPrice,
          },
          
        ],
      },
      contracts: {
        create: {
          description: "Contract Template",
          isSigned: false,
        },
      }
    },
  });


  return res.status(201).json(result);
}


const putHandler = async (req, res) => {
  const {
    id,
    groomName,
    brideName,
    dateOfWedding,
    workingShiftId,
    hallId,
    deposit,
    numOfTables,
    dishes,
    services,
  } = req.body;

  // Remove all dishes and services before creating the wedding
  await prisma.dishForWedding.deleteMany({
    where: {
      weddingId: id,
    },
  });
  await prisma.serviceForWedding.deleteMany({
    where: {
      weddingId: id,
    },
  });

  const totalPrice = await calculateTotalPrice({
    hallId,
    numOfTables,
    dishes,
    services,
  });
  const result = await prisma.wedding.update({
    where: { id },
    data: {
      groomName,
      brideName,
      dateOfWedding: new Date(dateOfWedding),
      workingShiftId,
      hallId,
      totalPrice: totalPrice,
      deposit: deposit,
      numOfTables: numOfTables,
      dishes: {
        create: dishes.map(dish => ({
          dishId: dish.id,
          servingOrder: dish.servingOrder,
        })),
      },
      services: {
        create: services.map(service => ({
          serviceId: service.id,
        })),
      },
    },
  });
  return res.status(201).json(result);
}

export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  // else if (req.method === 'GET') return getHandler(req, res);
  else if (req.method === 'PUT') return putHandler(req, res);
  // else if (req.method === 'DELETE') return deleteHandler(req, res);

  res.status(404).send("");
}
