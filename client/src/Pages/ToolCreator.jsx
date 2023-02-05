import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToolForm from "../Components/ToolForm";

const createTool = (tool) => {
  return fetch("/api/tools", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tool),
  }).then((res) => res.json());
};

const ToolCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateTool = (tool) => {
    setLoading(true);

    createTool(tool)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <ToolForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateTool}
    />
  );
};

export default ToolCreator;
