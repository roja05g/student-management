import React, { useState } from "react";
import "./App.css";
import TableComp from "./components/TableComp";
import FormModal from "./components/FormModal";

function App() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({ name: "", rollNumber: "" });

  const handleAddStudent = (student) => {
    setStudents([student, ...students]);
    setFilter({ name: "", rollNumber: "" });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredStudents = students.filter((student) => {
    const nameMatch = student.firstName
      .toLowerCase()
      .includes(filter.name.toLowerCase());
    const rollNumberMatch = student.rollNumber
      .toLowerCase()
      .includes(filter.rollNumber.toLowerCase());

    return (
      (!filter.name || nameMatch) && (!filter.rollNumber || rollNumberMatch)
    );
  });

  return (
    <div className="container mt-5">
      <h1>Student Management System</h1>

      <div className="d-flex mb-3">
        <input
          type="text"
          name="name"
          className="form-control mr-2"
          placeholder="Search by Name"
          value={filter.name}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="rollNumber"
          className="form-control mr-2"
          placeholder="Search by Roll Number"
          value={filter.rollNumber}
          onChange={handleFilterChange}
        />
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Student
        </button>
      </div>

      <TableComp students={filteredStudents} />

      {isModalOpen && (
        <FormModal
          onClose={() => setIsModalOpen(false)}
          onAddStudent={handleAddStudent}
        />
      )}
    </div>
  );
}

export default App;
