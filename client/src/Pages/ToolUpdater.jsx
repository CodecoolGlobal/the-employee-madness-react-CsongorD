import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ToolForm from "../Components/ToolForm";
import Loading from "../Components/Loading";

const updateTool = (tool) => {
  return fetch(`/api/tools/${tool._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tool),
  }).then((res) => res.json());
};

const fetchTool = (id) => {
  return fetch(`/api/tools/${id}`).then((res) => res.json());
};

const ToolUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tool, setTool] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [toolLoading, setToolLoading] = useState(true);

  useEffect(() => {
    setToolLoading(true);
    fetchTool(id)
      .then((tool) => {
        setTool(tool);
        setToolLoading(false);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  const handleUpdateTool = (tool) => {
    setUpdateLoading(true);
    updateTool(tool)
      .then(() => {
        navigate("/tools");
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => {
        setUpdateLoading(false);
      });
  };

  if (toolLoading) {
    return <Loading />;
  }

  return (
    <ToolForm
      tool={tool}
      onSave={handleUpdateTool}
      disabled={updateLoading}
      onCancel={() => navigate("/tools")}
    />
  );
};

export default ToolUpdater;
