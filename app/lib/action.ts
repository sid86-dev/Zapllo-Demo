"use server";

import { IFormData } from "@/types";
import { PrismaClient } from "@prisma/client";

const createEmployee = async (data: IFormData) => {
  const prisma = new PrismaClient();

  return prisma.employees.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      company: data.company,
    },
  });
};

const getEmployees = async () => {
  const prisma = new PrismaClient();

  return prisma.employees.findMany();
};

const deleteEmployee = async (id: string) => {
  const prisma = new PrismaClient();

  return prisma.employees.delete({
    where: {
      id: id,
    },
  });
};

export { createEmployee, getEmployees, deleteEmployee };
