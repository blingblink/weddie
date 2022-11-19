import prisma from '../../lib/prisma';

const postHandler = async (req, res) => {
  const {
    weddingId,
    dishId,
    servingOrder,
  } = req.body;

  const result = await prisma.dishForWedding.create({
    data: {
      weddingId,
      dishId,
      servingOrder: (servingOrder === null || servingOrder === undefined) ? 1 : servingOrder,
    },
  });
  return res.status(201).json(result);
}

const deleteHandler = async (req, res) => {
  const {
    weddingId,
    dishId,
  } = req.body;

  const result = await prisma.dishForWedding.delete({
    data: {
      weddingId,
      dishId,
    },
  });
  return res.status(201).json(result);
}

export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  else if (req.method === 'DELETE') return deleteHandler(req, res);

  res.status(404).send("");
}