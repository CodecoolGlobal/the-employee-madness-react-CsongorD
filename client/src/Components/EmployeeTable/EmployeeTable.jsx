import { useState } from "react";
import { Link } from "react-router-dom";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onDelete }) => {
  const [employeeData, setEmployeeData] = useState(employees);
  const [value, setValue] = useState("");
  const [nameToggle, setNameToggle] = useState(true);
  const [levelToggle, setLevelToggle] = useState(true);
  const [positionToggle, setPositionToggle] = useState(true);
  let filteredEmployees = employeeData.filter((employee) =>
    employee.position.includes(value) || employee.level.includes(value)
      ? employee
      : 0
  );

  const updatePresent = (employee) => {
    return fetch(`/api/employees/${employee._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ present: !employee.present }),
    }).then((res) => res.json());
  };

  function nameArranger(name, level, position) {
    if (name) {
      nameToggle
        ? setEmployeeData(employees.sort((a, b) => (a.name > b.name ? 1 : -1)))
        : setEmployeeData(employees.sort((a, b) => (a.name > b.name ? -1 : 1)));
    } else if (level) {
      levelToggle
        ? setEmployeeData(
            employees.sort((a, b) => (a.level > b.level ? 1 : -1))
          )
        : setEmployeeData(
            employees.sort((a, b) => (a.level > b.level ? -1 : 1))
          );
    } else if (position) {
      positionToggle
        ? setEmployeeData(
            employees.sort((a, b) => (a.position > b.position ? 1 : -1))
          )
        : setEmployeeData(
            employees.sort((a, b) => (a.position > b.position ? -1 : 1))
          );
    }
  }

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
            <th>
              <button
                onClick={() => {
                  setNameToggle(nameToggle ? false : true);
                  nameArranger(true, false, false);
                }}
              >
                Name
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  setLevelToggle(levelToggle ? false : true);
                  nameArranger(false, true, false);
                }}
              >
                Level
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  setPositionToggle(positionToggle ? false : true);
                  nameArranger(false, false, true);
                }}
              >
                Postition
              </button>
            </th>
            <th>Present</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.level}</td>
              <td>{employee.position}</td>
              <td>
                {employee.present ? (
                  <input
                    type="checkbox"
                    defaultChecked
                    onChange={() => {
                      updatePresent(employee);
                    }}
                  />
                ) : (
                  <input
                    type="checkbox"
                    onChange={() => {
                      updatePresent(employee);
                    }}
                  />
                )}
              </td>
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
