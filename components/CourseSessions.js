import React, { useState, useEffect } from "react";
import API from "../api";

export default function CourseSessions() {
  const [sessions, setSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [courseId, setCourseId] = useState("");

  useEffect(() => {
    fetchSessions();
    fetchCourses();
  }, []);

  const fetchSessions = async () => {
    try {
      const res = await API.get("/sessions");
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await API.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addSession = async () => {
    if (!startDate || !endDate || !courseId) return;
    try {
      await API.post("/sessions", {
        startDate,
        endDate,
        courseId: parseInt(courseId),
      });
      setStartDate("");
      setEndDate("");
      setCourseId("");
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Course Sessions</h2>
      <ul>
        {sessions.map((s) => (
          <li key={s.id}>
            {s.course?.name} | {new Date(s.startDate).toLocaleDateString()} -{" "}
            {new Date(s.endDate).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={addSession}>Add Session</button>
    </div>
  );
}