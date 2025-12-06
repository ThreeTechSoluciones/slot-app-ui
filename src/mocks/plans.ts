import type { PlanResponse } from "../app/types/responses/PlanResponse.type";

export const MOCK_PLANS: PlanResponse[] = [
  {
    id: "1",
    name: "Dos veces por semana",
    numberOfDays: 2,
    price: 15000,
  },
  {
    id: "2",
    name: "Tres veces por semana",
    numberOfDays: 3,
    price: 22000,
  },
  {
    id: "3",
    name: "Cuatro veces por semana",
    numberOfDays: 4,
    price: 30000,
  },
  {
    id: "4",
    name: "Cinco veces por semana",
    numberOfDays: 5,
    price: 40000,
  },
];
