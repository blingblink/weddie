import prisma from '../../lib/prisma';
import { removeEmptyFromObj } from '../../components/utils';

const postHandler = async (req, res) => {
  const {
    name,
    price,
    note,
    isAvailable,
  } = req.body;

  const result = await prisma.dish.create({
      data: {
        name,
        price,
        note,
        isAvailable : (isAvailable === null || isAvailable === undefined) ? false : isAvailable,
      },
    });
  return res.status(201).json(result);
}

const getHandler = async (req, res) => {
  const { id } = req.query;
  const dish = await prisma.dish.findUnique({
    where: {
      id,
    }
  });

  return res.status(201).json({
    dish,
  });
}

const putHandler = async (req, res) => {
  const {
    id,
    name,
    price,
    note,
    isAvailable,
  } = req.body;
  const rawUpdateData = {
    name,
    price,
    note,
    isAvailable,
  };
  const updateData = removeEmptyFromObj(rawUpdateData);

  const result = await prisma.dish.update({
    where: { id },
    data: updateData,
  })
  return res.status(201).json(result);
}

const deleteHandler = async (req, res) => {
  const { id } = req.body;
  const result = await prisma.dish.delete({
    where: {
      id,
    },
  });

  return res.status(201).json(result);
}

export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  else if (req.method === 'GET') return getHandler(req, res);
  else if (req.method === 'PUT') return putHandler(req, res);
  else if (req.method === 'DELETE') return deleteHandler(req, res);

  res.status(404).send("");
}