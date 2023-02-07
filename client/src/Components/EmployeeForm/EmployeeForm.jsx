import React, { useState, useEffect } from "react";
import Select from "react-select";
const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    return onSave(employee);
  };

  const [equipmentNames, setEquipmentNames] = useState(null);
  async function fetchEquipments() {
    const response = await fetch("/api/equipments/");
    const data = await response.json();
    const arr = data.map((x) => {
      return { value: x.Eq_name, label: x.Eq_name };
    });
    setEquipmentNames(arr);
  }
  const [divisions, setDivisions] = useState(null);
  async function fetchDivisions() {
    const response = await fetch("/api/divisions/");
    const data = await response.json();
    const arr = data.map((x) => {
      return { value: x._id, label: x.name };
    });
    setDivisions(arr);
  }

  useEffect(() => {
    fetchEquipments();
    fetchDivisions();
  }, []);

  const namesArr = equipmentNames ? equipmentNames : null;
  const divisionArr = divisions ? divisions : null;

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
        <Select options={namesArr} name="equipment" />
      </div>
      <div className="control">
        <label htmlFor="current_salary">Salary:</label>
        <input
          defaultValue={employee ? employee.current_salary : null}
          name="current_salary"
          id="current_salary"
        />
      </div>
      <div className="control">
        <label htmlFor="desired_salary">Desired Salary:</label>
        <input
          defaultValue={employee ? employee.desired_salary : null}
          name="desired_salary"
          id="desired_salary"
        />
      </div>
      <div className="control">
        <label htmlFor="starting_date">Starting Date:</label>
        <input
          type="date"
          name="starting_date"
          id="starting_date"
          defaultValue={employee ? employee.starting_date : null}
        />
      </div>
      <div className="control">
        <label htmlFor="favourite_color">Favourite Color:</label>
        <input
          type="color"
          defaultValue="#e66465"
          name="favourite_color"
          id="favourite_color"
        />
      </div>
      <div className="control">
        <label htmlFor="desired_salary">Division</label>
        <Select options={divisionArr} name="division" />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
