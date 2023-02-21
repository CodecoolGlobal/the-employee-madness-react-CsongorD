import { useState } from "react";

const postCompany = (company) => {
  fetch("/api/companies", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
    },
    body: JSON.stringify(company),
  });
};

const Company = () => {
  const [name, setName] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const company = { name: name };
    postCompany(company);
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default Company;
