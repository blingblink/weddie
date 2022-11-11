import prisma from '../../lib/prisma';

const postHandler = async (req, res) => {
  const {
    groomName,
    brideName,
    dateOfWedding,
    workingShiftId,
    hallId,
    deposit,
    numOfTables,
  } = req.body;

  const result = await prisma.wedding.create({
    data: {
      groomName,
      brideName,
      dateOfWedding: new Date(dateOfWedding),
      workingShiftId,
      hallId,
      deposit,
      numOfTables,
    },
  });
  return res.status(201).json(result);
}

export default function handler(req, res) {
  req.method === 'POST' ? postHandler(req, res) : res.status(404).send("");
}
