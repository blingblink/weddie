import Layout from '../../../components/Layout';
import WeddingCreateOrEditMenu from '../../../components/weddings/create/WeddingCreateOrEditMenu';
import prisma from '../../../lib/prisma';

export default function WeddingEditPage(props) {
  const {
    wedding,
    dishesForWedding,
    servicesForWedding,
    workingShifts,
    halls,
    dishes,
    services,
  } = props;
  if (!wedding) return;

  return (
    <Layout title="Drinkies" description="Selling drinks">
      <WeddingCreateOrEditMenu
        wedding={wedding}
        dishesForWedding={dishesForWedding}
        servicesForWedding={servicesForWedding}
        workingShifts={workingShifts}
        halls={halls}
        dishes={dishes}
        services={services}
      />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  let dishesForWedding = await prisma.dishForWedding.findMany({
    where: {
      weddingId: id,
    },
    select: {
      id: true,
      servingOrder: true,
      dish: {
        select: {
          id: true,
          name: true,
          price: true,
          note: true,
          isAvailable: true,
        },
      },
    },
  });
  dishesForWedding = dishesForWedding.map(dishForWedding => ({
    ...dishForWedding.dish,
    servingOrder: dishForWedding.servingOrder,
  }));
  
  let servicesForWedding = await prisma.serviceForWedding.findMany({
    where: {
      weddingId: id,
    },
    select: {
      id: true,
      service: {
        select: {
          id: true,
          name: true,
          price: true,
          note: true,
          isAvailable: true,
        },
      },
    },
  });
  servicesForWedding = servicesForWedding.map(serviceForWedding => serviceForWedding.service);

  let wedding = await prisma.wedding.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      groomName: true,
      brideName: true,
      dateOfWedding: true,
      workingShiftId: true,
      hallId: true,
      deposit: true,
      totalPrice: true,
      numOfTables: true,
      phoneNumber: true,
    },
  });
  if (!wedding) return { props: {} };

  wedding.dateOfWedding = wedding.dateOfWedding.toISOString().substring(0, 10);

  // Restaurant's data
  const workingShifts = await prisma.workingShift.findMany({
    select: {
      id: true,
      weekday: true,
      startHour: true,
      endHour: true,
    },
  });
  const halls = await prisma.hall.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      maxTables: true,
      pricePerTable: true,
      note: true,
    },
  });
  const dishes = await prisma.dish.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
      note: true,
    },
  });

  const services = await prisma.service.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      id: true,
      name: true,
      price: true,
      note: true,
    },
  });

  return {
    props: {
      wedding,
      dishesForWedding,
      servicesForWedding,
      workingShifts,
      halls,
      dishes,
      services,
    },
  }
}
