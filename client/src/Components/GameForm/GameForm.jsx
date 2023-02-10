import React from "react";

const GameForm = ({ onSave, disabled, game, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const game = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    return onSave(game);
  };

  return (
    <form className="GamerForm" onSubmit={onSubmit}>
      {game && <input type="hidden" name="_id" defaultValue={game._id} />}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input defaultValue={game ? game.name : null} name="name" id="name" />
      </div>

      <div className="control">
        <label htmlFor="maxPlayers">maxPlayers:</label>
        <input
          defaultValue={game ? game.maxPlayers : null}
          name="maxPlayers"
          id="maxPlayers"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {game ? "Update Game" : "Create Game"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default GameForm;
