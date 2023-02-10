import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Components/Loading";

const fetchEmployees = (signal, id) => {
  return fetch(`/api/employees/${id}`, { signal }).then((res) => res.json());
};
const createKitten = (kitten) => {
  return fetch("/api/kittens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kitten),
  }).then((res) => res.json());
};

const Kitten = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  let location = useLocation();
  let id = location.state?.id;

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const kitten = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    return handleCreateKitten({ ...kitten, ...{ employee: id } });
  };

  const handleCreateKitten = (kitten) => {
    setLoading(true);

    createKitten(kitten)
      .then(() => {
        fetchData();
        navigate(`/kittens/${id}`);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  function fetchData() {
    const controller = new AbortController();
    fetchEmployees(controller.signal, id)
      .then((employees) => {
        setLoading(false);
        setData(employees.kittens);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((kitten, index) => (
            <tr key={index}>
              <td>{kitten.name}</td>
              <td>{kitten.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <form className="KittenForm" onSubmit={onSubmit}>
        <div className="control">
          <label htmlFor="name">Kitten Name:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className="control">
          <label htmlFor="weight">Kitten weight:</label>
          <input type="text" name="weight" id="weight" />
        </div>
        <div className="buttons">
          <button type="submit">Add kitten</button>
        </div>
      </form>
    </div>
  );
};

export default Kitten;
