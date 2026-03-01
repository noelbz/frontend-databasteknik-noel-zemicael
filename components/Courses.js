import React, { useState, useEffect } from "react";
import API from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addCourse = async () => {
    if (!newName) return;
    try {
      await API.post("/courses", { name: newName });
      setNewName("");
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        placeholder="New course name"
      />
      <button onClick={addCourse}>Add Course</button>
    </div>
  );
}