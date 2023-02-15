import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "react-pagination-bar";
import "react-pagination-bar/dist/index.css";
import "./ToolTable.css";
import React from "react";
import Popup from "reactjs-popup";
import DeletePopup from "../DeletePopup";

const ToolTable = ({ tool, onDelete }) => {
  const [toolData, setToolData] = useState(tool);
  const [value, setValue] = useState("");
  const [nameToggle, setNameToggle] = useState(true);
  const [weightToggle, setWeightToggle] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pagePostsLimit = 5;

  useEffect(() => {
    setToolData(tool);
  }, [tool]);
  let filteredTool = toolData.filter((tool) =>
    tool.name.includes(value) ? tool : 0
  );

  function Arranger(name, level, position) {
    if (name) {
      nameToggle
        ? setToolData(tool.sort((a, b) => (a.name > b.name ? 1 : -1)))
        : setToolData(tool.sort((a, b) => (a.name > b.name ? -1 : 1)));
    } else if (level) {
      weightToggle
        ? setToolData(tool.sort((a, b) => (a.weight > b.weight ? 1 : -1)))
        : setToolData(tool.sort((a, b) => (a.weight > b.weight ? -1 : 1)));
    }
  }

  return (
    <div className="ToolTable">
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
                  setWeightToggle(weightToggle ? false : true);
                  Arranger(false, true, false);
                }}
              >
                Weight
              </button>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {filteredTool
            .slice(
              (currentPage - 1) * pagePostsLimit,
              currentPage * pagePostsLimit
            )
            .map((tool) => (
              <tr key={tool._id}>
                <td>{tool.name}</td>
                <td>{tool.weight}</td>

                <td>
                  <Link to={`/updateTool/${tool._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button onClick={() => onDelete(tool._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        itemsPerPage={pagePostsLimit}
        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        totalItems={toolData.length}
        pageNeighbours={2}
      />
    </div>
  );
};

export default ToolTable;
