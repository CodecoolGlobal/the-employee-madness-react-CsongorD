import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import "./EmployeeTable.css";
import React from "react";
import Popup from "reactjs-popup";
import DeletePopup from "../DeletePopup";

const EmployeeTable = ({ employees, onDelete }) => {
  const [employeeData, setEmployeeData] = useState(employees);
  const [value, setValue] = useState("");
  const [nameToggle, setNameToggle] = useState(true);
  const [levelToggle, setLevelToggle] = useState(true);
  const [positionToggle, setPositionToggle] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 10;

  useEffect(() => {
    setEmployeeData(employees);
  }, [employees]);

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

  function Arranger(name, level, position) {
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
                  Arranger(true, false, false);
                }}
              >
                Name
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  setLevelToggle(levelToggle ? false : true);
                  Arranger(false, true, false);
                }}
              >
                Level
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  setPositionToggle(positionToggle ? false : true);
                  Arranger(false, false, true);
                }}
              >
                Postition
              </button>
            </th>
            <th>Present</th>
            <th>Equipment</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredEmployees
            .slice(
              (currentPage - 1) * pagePostsLimit,
              currentPage * pagePostsLimit
            )
            .map((employee, index) => (
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
                <td>{employee.equipment}</td>
                <td>
                  <Link to={`/updateEmployee/${employee._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <Popup
                    trigger={<button type="button">Delete</button>}
                    modal={true}
                    position="top center"
                  >
                    {(close) => (
                      <div>
                        <DeletePopup
                          onDelete={onDelete}
                          id={employee._id}
                          onClose={close}
                          name="Employee"
                        />
                      </div>
                    )}
                  </Popup>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={pagePostsLimit}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        totalItems={filteredEmployees.length}
        pageNeighbours={2}
      />
    </div>
  );
};

export default EmployeeTable;
