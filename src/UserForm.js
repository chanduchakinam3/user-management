import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ onSubmit, user, existingUsers = [] }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const [first, last] = user.name.split(" ");
      setFirstName(first || "");
      setLastName(last || "");
      setEmail(user.email || "");
      setDepartment(user.company.name || "");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setDepartment("");
    }
    setError(""); // Clear any error when switching users
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate email
    if (!user && existingUsers.some((u) => u.email === email)) {
      setError("A user with this email already exists!");
      return;
    }

    onSubmit({
      name: `${firstName} ${lastName}`,
      email,
      company: { name: department },
    });

    // Clear the form fields after successful submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartment("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        required
      />
      <button type="submit">{user ? "Update User" : "Add User"}</button>
    </form>
  );
};

export default UserForm;
