"use client";

import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import { getEmployees } from "./lib/action";
import { Employees } from "@prisma/client";
import EmployeeCard from "@/components/EmployeeCard";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState<Employees[] | null>(null);

  // Fetch employees on initial render
  useEffect(() => {
    if (employees === null) {
      getEmployees().then((data) => {
        setEmployees(data);
      });
    }
  }, [employees]);

  return (
    <div className="flex flex-col py-6 items-center h-screen bg-[#05071E] w-full">
      <h1 className="font-bold mt-3 text-2xl text-white">Zapllo Demo</h1>
      {/*
       * Form Modal
       */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        setEmployees={setEmployees}
      />

      {/*
       * List of employees
       */}
      <div className="flex space-y-5 overflow-auto mt-4 flex-col md:grid md:grid-flow-row md:grid-cols-4 md:gap-4 md:grid-rows-subgrid md:space-y-0  w-full h-full p-8">
        {employees &&
          employees.map((employee) => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              setEmployees={setEmployees}
            />
          ))}
        {employees?.length === 0 && (
          <div className="text-white text-center">No employees found</div>
        )}
      </div>

      {/*
       * Modal to add employee
       */}
      <div
        onClick={() => setShowModal(true)}
        className="absolute bottom-10 right-10 hover:cursor-pointer"
      >
        <button className="px-5 py-3  hover:-translate-y-2 transition-transform duration-400 text-white font-medium rounded-md app-btn">
          Add Employee
        </button>
      </div>
    </div>
  );
}
