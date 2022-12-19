import prisma from '../../lib/prisma';
import { dateToString, groupBy } from '../../components/utils';

const getFirstDateOfMonth = (month, year) => new Date(year, month - 1, 1);
const getLastDateOfMonth = (month, year) => new Date(year, month, 0);

const postHandler = async (req, res) => {
  const {
    month,
    year,
  } = req.body;

  // TODO: [To Consider] Delete the previous monthly report for this month and year
  // await prisma.monthlyReport.deleteMany({
  //   where: {
  //     month,
  //     year,
  //   },
  // });

  // Example response - `monthlySummary`:
  // [
  //   {
  //     _count: { id: 3 }, // There are 3 weddings on this date
  //     _sum: { totalPrice: 120000000 },
  //     dateOfWedding: 2023-10-22T00:00:00.000Z
  //   }
  // ]

  //  Date | totalPrice | count
  //  20/10  100       2
  //  21/10  120       3
  //  25/10  500       1

  // Vd: Bao cao cho thang 3/2020
  //  SELECT
  //    Wedding.dateOfWedding,
  //    COUNT(*),
  //    SUM(Wedding.totalPrice) 
  //  FROM Wedding
  //  WHERE
  //    Wedding.dateOfWedding >= '2020/03/01'
  //    AND Wedding.dateOfWedding <= '2020/03/31'
  //    AND EXISTS (
  //      SELECT 1
  //      FROM Receipt
  //      WHERE Receipt.isDeposit = 0 AND Receipt.isPaid = 1
  //    )
  //  GROUP BY Wedding.dateOfWedding;
  const monthlyReport = await prisma.wedding.groupBy({
    by: ['dateOfWedding'],
    _count: {
      id: true,
    },
    where: {
      dateOfWedding: {
        gte: getFirstDateOfMonth(month, year),
        lte: getLastDateOfMonth(month, year),
      },
      // Is fully paid
      receipts: {
        some: {
          isDeposit: false,
          isPaid: true,
        },
      },
    },
    _sum: {
      totalPrice: true,
    },
  });
  let totalRevenue = 0;
  monthlyReport.forEach(dailyReport => totalRevenue += dailyReport._sum.totalPrice);

  const weddings = await prisma.wedding.findMany({
    select: {
      id: true,
      dateOfWedding: true,
    },
    where: {
      dateOfWedding: {
        gte: getFirstDateOfMonth(month, year),
        lte: getLastDateOfMonth(month, year),
      },
      // Is fully paid
      receipts: {
        some: {
          isDeposit: false,
          // isPaid: true,
        },
      },
    },
  });

  const weddingsGroupedByDate = groupBy(weddings, 'dateOfWedding', dateToString);

  // Example `result`
  // {
  //   id: 'clbbvvfd50574h8t7iwdh4nqq',
  //   month: 10,
  //   year: 2023,
  //   totalRevenue: 120000000n,
  //   createdAt: 2022-12-06T07:11:53.993Z
  // }
  const result = await prisma.monthlyReport.create({
    data: {
      month,
      year,
      totalRevenue,

      dailyReports: {
        create: monthlyReport.map(dailyReport => ({
          date: dailyReport.dateOfWedding,
          numOfWeddings: dailyReport._count.id,
          revenue: dailyReport._sum.totalPrice,

          weddingsInDailyReport: {
            create: weddingsGroupedByDate[dateToString(dailyReport.dateOfWedding)].map(wedding => ({
              weddingId: wedding.id,
            })),
          },
        })),
      },
    },
  });
  return res.status(201).json({ id: result.id });
}

const deleteHandler = async (req, res) => {
  const { id } = req.body;
  const result = await prisma.monthlyReport.delete({
    where: {
      id,
    },
  });

  return res.status(201).json({});
}

export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  else if (req.method === 'DELETE') return deleteHandler(req, res);

  res.status(404).send("");
}
