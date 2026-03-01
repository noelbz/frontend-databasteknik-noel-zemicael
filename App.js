import React from "react";
import Courses from "./components/Courses";
import CourseSessions from "./components/CourseSessions";
import Students from "./components/Students";
import Teachers from "./components/Teachers";
import Registrations from "./components/Registrations";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>EduApp Frontend</h1>
      <Courses />
      <CourseSessions />
      <Students />
      <Teachers />
      <Registrations />
    </div>
  );
}

export default App;