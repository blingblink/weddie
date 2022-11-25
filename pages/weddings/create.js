import Layout from '../../components/Layout';
import WeddingCreateOrEditMenu from '../../components/weddings/create/WeddingCreateOrEditMenu';
import prisma from '../../lib/prisma';

export default function WeddingCreatePage(props) {
  const {
    workingShifts,
    halls,
    dishes,
    services,
  } = props;

  return (
    <Layout title="Drinkies" description="Selling drinks">
      <WeddingCreateOrEditMenu
        workingShifts={workingShifts}
        halls={halls}
        dishes={dishes}
        services={services}
      />
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
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
      workingShifts,
      halls,
      dishes,
      services,
    },
  }
}
