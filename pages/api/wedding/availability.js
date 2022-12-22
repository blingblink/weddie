import prisma from '../../../lib/prisma';

const postHandler = async (req, res) => {
  const {
    dateOfWedding, // string
  } = req.body;

  const timestamp = Date.parse(dateOfWedding);
  if (isNaN(timestamp) === true) return res.status(201).json({});

  const objDateOfWedding = new Date(dateOfWedding);
  const weddings = await prisma.wedding.findMany({
    where: {
      dateOfWedding: objDateOfWedding,
    },
    select: {
      id: true,
      workingShiftId: true,
      hallId: true,
    },
  });
  const shiftsUsingHalls = {};
  weddings.forEach(wedding => {
    if (wedding.workingShiftId in shiftsUsingHalls)
      shiftsUsingHalls[wedding.workingShiftId].push(wedding.hallId);
    else
      shiftsUsingHalls[wedding.workingShiftId] = [wedding.hallId];
  });

  const weekdayOfWedding = objDateOfWedding ? objDateOfWedding.getDay() : null;
  const workingShifts = await prisma.workingShift.findMany({
    where: {
      weekday: weekdayOfWedding,
    },
    select: {
      id: true,
      weekday: true,
      startHour: true,
      endHour: true,
    },
  });
  const halls = await prisma.hall.findMany({
    where: {
      isAvailable: true,
    },
    select: {
      id: true,
      name: true,
      type: true,
      maxTables: true,
      pricePerTable: true,
      note: true,
    },
  });

  // Calculate the available halls for each working shift on the date.
  const availability = {};
  workingShifts.forEach(shift => {
    const availableHallsInShift = halls.filter(hall =>
      shiftsUsingHalls[shift.id] ? !shiftsUsingHalls[shift.id].includes(hall.id) : true
    );

    if (availableHallsInShift.length > 0) {
      availability[shift.id] = availableHallsInShift;
    }
  });

  return res.status(201).json(availability);
}

export default function handler(req, res) {
  if (req.method === 'POST') return postHandler(req, res);

  res.status(404).send("");
}