import "./DeletePopup.css";

const DeletePopup = ({ onDelete, id, onClose, name }) => {
  return (
    <div className="DeletePopup">
      <h1>Are you sure you want to delete this {name} ?</h1>
      <button onClick={() => onDelete(id)}>Delete</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default DeletePopup;
