import prisma from '../../lib/prisma';

const postHandler = async (req, res) => {
  const {
    weddingId,
    serviceId,
  } = req.body;

  const result = await prisma.serviceForWedding.create({
    data: {
      weddingId,
      serviceId,
    },
  });
  return res.status(201).json(result);
}

const deleteHandler = async (req, res) => {
  const {
    weddingId,
    serviceId,
  } = req.body;

  const result = await prisma.serviceForWedding.delete({
    data: {
      weddingId,
      serviceId,
    },
  });
  return res.status(201).json(result);
}

export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  else if (req.method === 'DELETE') return deleteHandler(req, res);

  res.status(404).send("");
}
