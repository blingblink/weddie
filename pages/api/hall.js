import prisma from '../../lib/prisma';

const postHandler = async (req, res) => {
  const {
    name,
    type,
    maxTables,
    pricePerTable,
    note,
    isAvailable,
  } = req.body;

  const result = await prisma.hall.create({
    data: {
      name,
      type,
      maxTables,
      pricePerTable,
      note,
      isAvailable: (isAvailable === null || isAvailable === undefined) ? false : isAvailable,
    },
  });

  // INSERT INTO Hall (name, type, maxTables, pricePerTable, note, isAvailable)
  // values ($1, $2, $3, $4, $5, $6);
  return res.status(201).json(result);
}

const getHandler = async (req, res) => {
  const { id } = req.query;
  const hall = await prisma.hall.findUnique({
    where: {
      id,
    }
  });

  return res.status(201).json({
    hall,
  });
}

const putHandler = async (req, res) => {
  const {
    id,
    name,
    type,
    maxTables,
    pricePerTable,
    note,
  } = req.body;
  const rawUpdateData = {
    name,
    type,
    maxTables,
    pricePerTable,
    note,
  };
  const updateData = removeEmptyFromObj(rawUpdateData);

  const result = await prisma.hall.update({
    where: { id },
    data: updateData,
  })
  return res.status(201).json(result);
}

const deleteHandler = async (req, res) => {
  const { id } = req.body;
  const result = await prisma.hall.delete({
    where: {
      id,
    },
  });
  // DELETE FROM Hall WHERE hall.id = $1;

  return res.status(201).json(result);
}

export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  else if (req.method === 'GET') return getHandler(req, res);
  else if (req.method === 'PUT') return putHandler(req, res);
  else if (req.method === 'DELETE') return deleteHandler(req, res);

  res.status(404).send("");
}