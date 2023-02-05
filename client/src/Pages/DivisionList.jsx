import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import DivisionTable from "../Components/DivisionTable";

const fetchDivisions = (signal) => {
  return fetch("/api/divisions", { signal }).then((res) => res.json());
};

const deleteDivision = (id) => {
  return fetch(`/api/divisions/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const DivisionList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteDivision(id).catch((err) => console.log(err));
    setData((divisions) => {
      return divisions.filter((division) => division._id !== id);
    });
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchDivisions(controller.signal)
      .then((division) => {
        setLoading(false);
        setData(division);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setData(null);
          throw error;
        }
      });

    return () => controller.abort();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return <DivisionTable divisions={data} onDelete={handleDelete} />;
};

export default DivisionList;
