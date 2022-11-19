import prisma from '../../lib/prisma';
import { removeEmptyFromObj } from '../../components/utils';

const postHandler = async (req, res) => {
  const {
  	receiptId,
    payerName,
    cardNumber,
    cardExpiry,
    cardCvc,
  } = req.body;

  const result = await prisma.payment.create({
    data: {
      receiptId,
      payerName,
      cardNumber,
      cardExpiry,
      cardCvc,
    },
  });

  await prisma.receipt.update({
    where: {
      id: receiptId,
    },
    data: {
      isPaid: true,
      paidAt: new Date(),
    },
  });
  return res.status(201).json(result);
}

const getHandler = async (req, res) => {
  const { id } = req.query;
  const payment = await prisma.payment.findUnique({
    where: {
      id,
    }
  });

  return res.status(201).json({
    payment,
  });
}

export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);
  else if (req.method === 'GET') return getHandler(req, res);

  res.status(404).send("");
}
