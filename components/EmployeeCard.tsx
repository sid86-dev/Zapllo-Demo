import { deleteEmployee } from "@/app/lib/action";
import { Employees } from "@prisma/client";
import React, { Dispatch, FC, SetStateAction } from "react";
import toast from "react-hot-toast";

interface IProps {
  employee: Employees;
  setEmployees: Dispatch<SetStateAction<Employees[] | null>>;
}

const EmployeeCard: FC<IProps> = ({ employee, setEmployees }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow h-fit">
      <div className="flex flex-col items-center pb-6 pt-4">
        {/* Name */}
        <h5 className="mb-1 text-xl font-medium text-gray-900 ">
          {employee.firstName} {employee.lastName}
        </h5>
        {/* Company */}
        <span className="text-sm text-gray-500 ">{employee.company}</span>
        {/* Email */}
        <span className="text-sm text-gray-500  mt-5">
          Email : {employee.email}
        </span>
        {/* Phone */}
        <span className="text-sm text-gray-500 ">Phone : {employee.phone}</span>
        {/* Remove Button */}
        <div className="flex mt-4 md:mt-6">
          <button
            onClick={() => {
              toast.promise(
                deleteEmployee(employee.id),
                {
                  loading: "Deleting employee...",
                  success: () => {
                    setEmployees((prev) => {
                      if (!prev) return null;
                      return prev.filter((emp) => emp.id !== employee.id);
                    });
                    return "Employee deleted successfully";
                  },
                  error: "Failed to delete employee",
                },
                {
                  style: {
                    minWidth: "250px",
                  },
                }
              );
            }}
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
