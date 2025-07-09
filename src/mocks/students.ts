export const MOCKED_STUDENTS = [
  { id: 1, name: "Rocío", lastname: "Menardi", status: "A término" },
  { id: 2, name: "Graciela", lastname: "Pérez", status: "A término" },
  { id: 3, name: "Lautaro", lastname: "Díaz", status: "Vencido" },
  { id: 4, name: "Martina", lastname: "Sosa", status: "A término" },
  { id: 5, name: "Federico", lastname: "Sanchez", status: "Vencido" },
  { id: 6, name: "Camila", lastname: "Juárez", status: "A término" },
  { id: 7, name: "Ignacio", lastname: "Mendoza", status: "Vencido" },
  { id: 8, name: "Valentina", lastname: "Torres", status: "A término" },
];

export const MOCKED_STUDENT = {
  name: 'Federico',
  lastname: 'Sanchez',
  birthday: '14/02/2000',
  pathologies: undefined,
  admissionDate: '23/03/2025',
  plan: {
    planType: 'Día específico',
    daysPerWeek: 3,
    paymentDueDate: 23
  },
  payments: [
    {
      number: 1,
      date: '23/03/2025',
      amount: 23000,
      status: 'En término',
      payed: true
    },
    {
      number: 2,
      date: '23/04/2025',
      amount: 23000,
      status: 'En término',
      payed: true
    },
    {
      number: 3,
      date: '23/05/2025',
      amount: 26593.2,
      status: 'En término',
      payed: true
    },
    {
      number: 4,
      date: '23/06/2025',
      amount: 26593.2,
      status: 'Vencido',
      payed: false
    },
    {
      number: 5,
      date: '23/07/2025',
      amount: 26593.2,
      status: 'En término',
      payed: false
    },
  ]
}