import React, { useState, useEffect } from "react";
import API from "../api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!firstName || !lastName) return;
    await API.post("/students", { firstName, lastName });
    setFirstName("");
    setLastName("");
    fetchStudents();
  };

  return (
    <div>
      <h2>Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.firstName} {s.lastName}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={firstName}
        placeholder="First Name"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        value={lastName}
        placeholder="Last Name"
        onChange={(e) => setLastName(e.target.value)}
      />
      <button onClick={addStudent}>Add Student</button>
    </div>
  );
}