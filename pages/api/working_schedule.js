import prisma from '../../lib/prisma';

const putHandler = async (req, res) => {
  const {
  	employeeId,
    workingShiftIds,
  } = req.body;

  // Remove all previous schedules beforehand
  await prisma.workingSchedule.deleteMany({
    where: { employeeId },
  });

  const result = await prisma.workingSchedule.createMany({
    data: workingShiftIds.map(workingShiftId => ({
      employeeId,
      workingShiftId,
    })),
  });
  return res.status(201).json(result);
}

export default function handler(req, res) {
  // if (req.method === 'POST') return postHandler(req, res);
  // else if (req.method === 'GET') return getHandler(req, res);
  if (req.method === 'PUT') return putHandler(req, res);
  // else if (req.method === 'DELETE') return deleteHandler(req, res);

  res.status(404).send("");
}
