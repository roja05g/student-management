import React from "react";

function TableComp({ students }) {
  return (
    <div>
      <table className="table table-striped table-bordered mt-4">
        <thead className="thead-dark">
          <tr>
            <th>Roll Number</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Class</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.rollNumber}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.dateOfBirth}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TableComp;
