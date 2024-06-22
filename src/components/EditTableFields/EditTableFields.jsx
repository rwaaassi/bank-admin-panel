import { useState } from "react";
import "./EditTableFields.css"

const EditableField = ({ label, value, onSave, buttonLabel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
     if (
       (label === "Age" || label === "Cash" || label === "Credit") &&
       inputValue < 0
     ) {
       alert("Value cannot be negative");
       return;
     }
     onSave(inputValue);
     setIsEditing(false);
  };

  return (
    <div className="editable-field">
      {isEditing ? (
        <>
          <input
            type={
              label === "Age" || label === "Cash" || label === "Credit"
                ? "number"
                : "text"
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSaveClick} className="save-edit-btn">Save</button>
        </>
      ) : (
        <>
          <h4>
            {label}: {value}
          </h4>
          <button onClick={handleEditClick}>{buttonLabel}</button>
        </>
      )}
    </div>
  );
};

export default EditableField;
