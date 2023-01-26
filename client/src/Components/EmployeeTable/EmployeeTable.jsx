import { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
  const [value, setValue] = useState("");
  const newEmployees = employees.filter((employee) =>
    employee.position.includes(value) || employee.level.includes(value)
      ? employee
      : 0
  );
  return (
    <div className="EmployeeTable">
      <input
        placeholder="Search by Position or Level"
        name={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Position</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {newEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                <Link to={`/update/${employee._id}`}>
                  <button type="button">Update</button>
                </Link>
                <button type="button" onClick={() => onDelete(employee._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
