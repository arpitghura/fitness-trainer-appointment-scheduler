import { TableCell } from "flowbite-react";
import React, { useState } from "react";

export const EditableCell = ({
  value: initialValue,
  isEditing,
  updateItem, // This is a custom function that we supplied to our table instance
  id: id,
  inputName,
  editingNodeId,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const [fieldName, setFieldName] = useState(null);

  const onChange = (e) => {
    setValue(e.target.value);
    setFieldName(e.target.name);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateItem(id, value, fieldName);
  };

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  /**
   * Event handler to make a row editable.
   * @param e
   */
  const setRowEditing = (e) => {
    // TODO
  };

  let retObj = null;
  if (isEditing && editingNodeId == id) {
    switch (id) {
      default:
        retObj = (
          <input
            className="input-edit inline-block w-3/4 border border-gray-300 rounded p-2 leading-tight focus:outline-none focus:bg-white focus:border-blue-500  dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            name={inputName}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
          />
        );
        break;
    }
  } else {
    switch (id) {
      // case "action_btn":
      //   retObj = (
      //     <>
      //       <button
      //         className="btn btn-sm btn-info btn-sm-td"
      //         onClick={setRowEditing}
      //       >
      //         {isEditing ? "Save" : "Edit"}
      //       </button>
      //     </>
      //   );
      //   break;
      default:
        retObj = <div>{value}</div>;
        break;
    }
  }
  return retObj;
};

export default EditableCell;
