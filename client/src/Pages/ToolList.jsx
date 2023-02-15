import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import ToolTable from "../Components/ToolTable";

const fetchTools = (signal) => {
  return fetch("/api/tools", { signal }).then((res) => res.json());
};

const deleteTool = (id) => {
  return fetch(`/api/tools/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const ToolList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tool?")) {
      deleteTool(id).catch((err) => console.log(err));
      setData((tools) => {
        return tools.filter((tool) => tool._id !== id);
      });
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    fetchTools(controller.signal)
      .then((tool) => {
        setLoading(false);
        setData(tool);
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
  return <ToolTable tool={data} onDelete={handleDelete} />;
};

export default ToolList;
