import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import "./DivisionTable.css";
import React from "react";
import Popup from "reactjs-popup";
import DeletePopup from "../DeletePopup";

const DivisionTable = ({ divisions, onDelete }) => {
  const [divisionData, setDivisionData] = useState(divisions);
  const [value, setValue] = useState("");
  const [nameToggle, setNameToggle] = useState(true);
  const [bossToggle, setBossToggle] = useState(true);
  const [budgetToggle, setBudgetToggle] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 5;

  useEffect(() => {
    setDivisionData(divisions);
  }, [divisions]);

  let filteredDivision = divisionData.filter((division) =>
    division.name.includes(value) ? division : 0
  );

  function Arranger(name, boss, budget) {
    if (name) {
      nameToggle
        ? setDivisionData(divisions.sort((a, b) => (a.name > b.name ? 1 : -1)))
        : setDivisionData(divisions.sort((a, b) => (a.name > b.name ? -1 : 1)));
    } else if (boss) {
      bossToggle
        ? setDivisionData(divisions.sort((a, b) => (a.boss > b.boss ? 1 : -1)))
        : setDivisionData(divisions.sort((a, b) => (a.boss > b.boss ? -1 : 1)));
    } else if (budget) {
      budgetToggle
        ? setDivisionData(
            divisions.sort((a, b) => (a.budget > b.budget ? 1 : -1))
          )
        : setDivisionData(
            divisions.sort((a, b) => (a.budget > b.budget ? -1 : 1))
          );
    }
  }

  return (
    <div className="DivisionTable">
      <input
        placeholder="Search by Name"
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
                  setBossToggle(bossToggle ? false : true);
                  Arranger(false, true, false);
                }}
              >
                Boss
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  setBudgetToggle(budgetToggle ? false : true);
                  Arranger(false, false, true);
                }}
              >
                Budget
              </button>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredDivision
            .slice(
              (currentPage - 1) * pagePostsLimit,
              currentPage * pagePostsLimit
            )
            .map((division) => (
              <tr key={division._id}>
                <td>{division.name}</td>
                <td>{division.boss?.name}</td>
                <td>{division.budget}</td>
                <td>
                  <Link to={`/updateDivision/${division._id}`}>
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
                          id={division._id}
                          onClose={close}
                          name="Division"
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
        totalItems={filteredDivision.length}
        pageNeighbours={2}
      />
    </div>
  );
};

export default DivisionTable;
