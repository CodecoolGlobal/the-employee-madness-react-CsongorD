import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameForm from "../Components/GameForm";

const createGame = (game) => {
  return fetch("/api/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game),
  }).then((res) => res.json());
};

const GameCreator = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreateGame = (game) => {
    setLoading(true);

    createGame(game)
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
    <GameForm
      onCancel={() => navigate("/")}
      disabled={loading}
      onSave={handleCreateGame}
    />
  );
};

export default GameCreator;
