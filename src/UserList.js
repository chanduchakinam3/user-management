import React, { useState, useEffect } from "react";
import UserActions from "./UserAction";
import UserForm from "./UserForm";
import "./UserList.css";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]); // Initialize users as an empty array
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  // Delete a user by ID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedUsers = users
        .filter((user) => user.id !== id)
        .map((user, index) => ({ ...user, id: index + 1 })); // Reassign IDs after deletion
      setUsers(updatedUsers);
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  // Edit an existing user
  const handleEdit = (user) => {
    setEditingUser(user);
  };

  // Handle form submission for add or edit
  const handleFormSubmit = async (newUser) => {
    if (editingUser) {
      try {
        // Send updated user data to the API
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${editingUser.id}`,
          { ...editingUser, ...newUser }
        );
        // Update user in the local state with the response data (after API update)
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? response.data : user
          )
        );
        setEditingUser(null); // Exit edit mode
      } catch (err) {
        setError("Failed to update user");
      }
    } else {
      // Add a new user after checking for duplicates
      const isDuplicate = users.some((user) => user.email === newUser.email);
      if (isDuplicate) {
        setError("A user with this email already exists!");
        return;
      }

      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          newUser
        );
        const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        setUsers([...users, { ...response.data, id: newId }]);
      } catch (err) {
        setError("Failed to add user");
      }
    }
    setError(""); // Clear errors
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <UserForm
        onSubmit={handleFormSubmit}
        user={editingUser}
        existingUsers={users}
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(" ")[0]}</td>
              <td>{user.name.split(" ")[1] || ""}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <UserActions
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
