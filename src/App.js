import React from "react";
import UserList from "./UserList";
import "./App.css";
const App = () => {
  return (
    <div className="container">
      {" "}
      <h1>User Management App</h1> <UserList />{" "}
    </div>
  );
};
export default App;
