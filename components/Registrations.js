import React, { useState, useEffect } from "react";
import API from "../api";

export default function Registrations() {
  const [registrations, setRegistrations] = useState([]);
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    fetchRegistrations();
    fetchStudents();
    fetchSessions();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const res = await API.get("/registrations");
      setRegistrations(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchStudents = async () => {
    try {
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSessions = async () => {
    try {
      const res = await API.get("/sessions");
      setSessions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addRegistration = async () => {
    if (!studentId || !sessionId) return;
    try {
      await API.post("/registrations", {
        studentId: parseInt(studentId),
        courseSessionId: parseInt(sessionId),
      });
      setStudentId("");
      setSessionId("");
      fetchRegistrations();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Registrations</h2>
      <ul>
        {registrations.map((r) => (
          <li key={r.id}>
            {r.student?.firstName} {r.student?.lastName} -{" "}
            {r.session?.course?.name} |{" "}
            {new Date(r.session?.startDate).toLocaleDateString()} -{" "}
            {new Date(r.session?.endDate).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <select value={studentId} onChange={(e) => setStudentId(e.target.value)}>
        <option value="">Select Student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.firstName} {s.lastName}
          </option>
        ))}
      </select>

      <select value={sessionId} onChange={(e) => setSessionId(e.target.value)}>
        <option value="">Select Session</option>
        {sessions.map((s) => (
          <option key={s.id} value={s.id}>
            {s.course?.name} | {new Date(s.startDate).toLocaleDateString()} -{" "}
            {new Date(s.endDate).toLocaleDateString()}
          </option>
        ))}
      </select>

      <button onClick={addRegistration}>Add Registration</button>
    </div>
  );
}