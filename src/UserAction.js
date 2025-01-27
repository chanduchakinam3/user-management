import React from "react";

const UserAction = ({ user, onEdit, onDelete }) => {
  return (
    <div>
      <button onClick={() => onEdit(user)}>Edit</button>
      <button onClick={() => onDelete(user.id)}>Delete</button>
    </div>
  );
};

export default UserAction;
