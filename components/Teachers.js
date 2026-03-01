import React, { useState, useEffect } from "react";
import API from "../api";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const res = await API.get("/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTeacher = async () => {
    if (!firstName || !lastName) return;
    try {
      await API.post("/teachers", { firstName, lastName });
      setFirstName("");
      setLastName("");
      fetchTeachers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Teachers</h2>
      <ul>
        {teachers.map((t) => (
          <li key={t.id}>
            {t.firstName} {t.lastName}
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
      <button onClick={addTeacher}>Add Teacher</button>
    </div>
  );
}