import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import "./EquipmentTable.css";
import React from "react";
import Popup from "reactjs-popup";
import DeletePopup from "../DeletePopup";

const EquipmentTable = ({ equipment, onDelete }) => {
  const [equipmentData, setEquipmentData] = useState(equipment);
  const [value, setValue] = useState("");
  const [nameToggle, setNameToggle] = useState(true);
  const [typeToggle, setTypeToggle] = useState(true);
  const [amountToggle, setAmountToggle] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 5;

  useEffect(() => {
    setEquipmentData(equipment);
  }, [equipment]);
  let filteredEquipment = equipmentData.filter((equipment) =>
    equipment.Eq_type.includes(value) ? equipment : 0
  );

  function Arranger(name, level, position) {
    if (name) {
      nameToggle
        ? setEquipmentData(
            equipment.sort((a, b) => (a.Eq_name > b.Eq_name ? 1 : -1))
          )
        : setEquipmentData(
            equipment.sort((a, b) => (a.Eq_name > b.Eq_name ? -1 : 1))
          );
    } else if (level) {
      typeToggle
        ? setEquipmentData(
            equipment.sort((a, b) => (a.Eq_type > b.Eq_type ? 1 : -1))
          )
        : setEquipmentData(
            equipment.sort((a, b) => (a.Eq_type > b.Eq_type ? -1 : 1))
          );
    } else if (position) {
      amountToggle
        ? setEquipmentData(
            equipment.sort((a, b) => (a.Eq_amount > b.Eq_amount ? 1 : -1))
          )
        : setEquipmentData(
            equipment.sort((a, b) => (a.Eq_amount > b.Eq_amount ? -1 : 1))
          );
    }
  }

  return (
    <div className="EquipmentTable">
      <input
        placeholder="Search by Type"
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
                  setTypeToggle(typeToggle ? false : true);
                  Arranger(false, true, false);
                }}
              >
                Type
              </button>
            </th>
            <th>
              <button
                onClick={() => {
                  setAmountToggle(amountToggle ? false : true);
                  Arranger(false, false, true);
                }}
              >
                Amount
              </button>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredEquipment
            .slice(
              (currentPage - 1) * pagePostsLimit,
              currentPage * pagePostsLimit
            )
            .map((equipment, index) => (
              <tr key={equipment._id}>
                <td>{equipment.Eq_name}</td>
                <td>{equipment.Eq_type}</td>
                <td>{equipment.Eq_amount}</td>
                <td>
                  <Link to={`/updateEquipment/${equipment._id}`}>
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
                          id={equipment._id}
                          onClose={close}
                          name="Equipment"
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
        totalItems={equipmentData.length}
        pageNeighbours={2}
      />
    </div>
  );
};

export default EquipmentTable;
