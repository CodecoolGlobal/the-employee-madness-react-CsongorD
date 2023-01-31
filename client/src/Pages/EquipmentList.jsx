import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";

const fetchEquipment = (signal) => {
  return fetch("/api/equipments", { signal }).then((res) => res.json());
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const handleDelete = (id) => {
    deleteEquipment(id).catch((err) => console.log(err));
    setData((equipment) =>
      equipment.filter((equipment) => equipment._id !== id)
    );
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchEquipment(controller.signal)
      .then((equipment) => {
        setLoading(false);
        setData(equipment);
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

  return <EquipmentTable equipment={data} onDelete={handleDelete} />;
};

export default EquipmentList;
