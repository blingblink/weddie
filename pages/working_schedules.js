import * as Yup from 'yup';
import prisma from '../lib/prisma';
import ListPage from '../components/ListPage';
import Layout from '../components/Layout';

const daysOfWeek = ["Chủ nhật", "Thứ 2","Thứ 3","Thứ 4","Thứ 5","Thứ 6","Thứ 7"];

export default function WorkingSchedulesPage(props) {
  const {
    workingShifts,
    users,
  } = props;

  const onUpdate = async (user) => {
    try {
      const res = await fetch('/api/working_schedule', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: user.id,
          workingShiftIds: user.workingSchedules,
        }),
      });
      const resJson = await res.json();
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Tên nhân viên',
      type: 'text',
      disabled: true,
      default: '',
    },
    {
      key: 'email',
      label: 'Email',
      type: 'text',
      disabled: true,
      default: '',
    },
    {
      key: 'workingSchedules',
      label: 'Ca làm việc',
      type: 'multi-checkbox',
      default: [],
      acceptableValues: workingShifts.map(shift => ({
        label: `${daysOfWeek[shift.weekday]}, ${shift.startHour}h - ${shift.endHour}h`,
        value: shift.id,
      })),
    },
  ];

  return (
    <Layout title="Drinkies" description="Selling drinks">
      <ListPage
        pageTitle="Lịch làm việc của nhân viên"
        smallPageTableName="Lịch làm việc"
        columns={columns}
        values={users}
        onUpdate={onUpdate}
        resource="working_schedule"
      />
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const workingShifts = await prisma.workingShift.findMany({
    select: {
      id: true,
      weekday: true,
      startHour: true,
      endHour: true,
    },
  });

  const users = await prisma.user.findMany({
    orderBy: {
      updatedAt: "desc",
    },
    where: {
      OR: [
        {
          roleId: {
            not: 0, // Exclude Admin users
          },
        },
        {
          roleId: null,
        },
      ],
      AND: {
        disabled: false, // TODO: Backfill null users
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      email: true,
      roleId: true,
      workingSchedules: {
        select: {
          workingShiftId: true,
        },
      },
    },
  });
  const formattedUsers = users.map(user => ({
    ...user,
    disabled: (user.disabled === null || user.disabled === undefined) ? false : user.disabled,

    workingSchedules: user.workingSchedules.map(schedule => schedule.workingShiftId),
  }));

  return {
    props: {
      workingShifts,
      users: formattedUsers,
    },
  }
}
