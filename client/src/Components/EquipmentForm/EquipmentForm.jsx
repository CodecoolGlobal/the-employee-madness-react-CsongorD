const EquipmentForm = ({ onSave, disabled, equipment, onCancel }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const entries = [...formData.entries()];
    const equipment = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      
      return acc;
    }, {});
    return onSave(equipment);
  };

  return (
    <form className="EquipmentForm" onSubmit={onSubmit}>
      {equipment && (
        <input type="hidden" name="_id" defaultValue={equipment._id} />
      )}

      <div className="control">
        <label htmlFor="Eq_name">Name:</label>
        <input
          defaultValue={equipment ? equipment.Eq_name : null}
          name="Eq_name"
          id="Eq_name"
        />
      </div>

      <div className="control">
        <label htmlFor="Eq_type">Type:</label>
        <input
          defaultValue={equipment ? equipment.Eq_type : null}
          name="Eq_type"
          id="Eq_type"
        />
      </div>

      <div className="control">
        <label htmlFor="Eq_amount">Amount:</label>
        <input
          defaultValue={equipment ? equipment.Eq_amount : null}
          name="Eq_amount"
          id="Eq_amount"
        />
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {equipment ? "Update Equipment" : "Create Equipment"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EquipmentForm;
