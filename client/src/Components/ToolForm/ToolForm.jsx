const ToolForm = ({ onSave, disabled, tool, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const entries = [...formData.entries()];
    const tool = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;

      return acc;
    }, {});
    return onSave(tool);
  };

  return (
    <form className="ToolForm" onSubmit={onSubmit}>
      {tool && <input type="hidden" name="_id" defaultValue={tool._id} />}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input defaultValue={tool ? tool.name : null} name="name" id="name" />
      </div>

      <div className="control">
        <label htmlFor="weight">Weight:</label>
        <input
          defaultValue={tool ? tool.weight : null}
          name="weight"
          id="weight"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {tool ? "Update Tool" : "Create Tool"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ToolForm;
