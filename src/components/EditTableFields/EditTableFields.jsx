import { useState } from "react";

const EditableField = ({ label, value, onSave, buttonLabel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
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
          <button onClick={handleSaveClick}>Save</button>
        </>
      ) : (
        <>
          <h1>
            {label}: {value}
          </h1>
          <button onClick={handleEditClick}>{buttonLabel}</button>
        </>
      )}
    </div>
  );
};

export default EditableField;
