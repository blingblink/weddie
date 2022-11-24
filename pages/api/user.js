import prisma from '../../lib/prisma';
import { removeEmptyFromObj } from '../../components/utils';

const putHandler = async (req, res) => {
  const {
    id,
    phoneNumber,
    roleId,
    disabled,
  } = req.body;
  const rawUpdateData = {
    phoneNumber,
    roleId,
    disabled,
  };
  const updateData = removeEmptyFromObj(rawUpdateData);

  const result = await prisma.user.update({
    where: { id },
    data: updateData,
  })
  return res.status(201).json(result);
}

export default function handler(req, res) {
  if (req.method === 'PUT') return putHandler(req, res);

  res.status(404).send("");
}