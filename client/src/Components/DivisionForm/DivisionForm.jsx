import React, { useState, useEffect } from "react";
import Select from "react-select";
const DivisionForm = ({ onSave, disabled, division, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const division = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});

    return onSave(division);
  };

  const [bossNames, setBossNames] = useState(null);
  async function fetchData() {
    const response = await fetch("/api/divisions/");
    const data = await response.json();
    const arr = data.map((x) => {
      return { value: x.boss, label: x.boss.name };
    });
    setBossNames(arr);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const namesArr = bossNames ? bossNames : null;

  return (
    <form className="DivisionForm" onSubmit={onSubmit}>
      {division && (
        <input type="hidden" name="_id" defaultValue={division._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={division ? division.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="boss">Boss:</label>
        <Select options={namesArr} name="boss" />
      </div>

      <div className="control">
        <label htmlFor="budget">Budget:</label>
        <input
          defaultValue={division ? division.budget : null}
          name="budget"
          id="budget"
        />
      </div>
      <div className="control" style={{ display: "flex" }}>
        <label htmlFor="location">Location:</label>
        <input
          placeholder="City"
          defaultValue={division ? division.location.city : null}
          name="city"
          id="city"
        />
        <input
          placeholder="Country"
          defaultValue={division ? division.location.country : null}
          name="country"
          id="county"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {division ? "Update Division" : "Create Division"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default DivisionForm;
