import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const sectionsMap = {
  1: ["A", "B"],
  2: ["A", "B", "C"],
  3: ["A"],
  4: ["A", "B"],
  5: ["A", "B", "C", "D"],
  6: ["A", "B", "C"],
  7: ["A", "B"],
  8: ["A", "B", "C", "D", "E"],
  9: ["A", "B", "C", "D"],
  10: ["A", "B", "C", "D", "E", "F"],
};

function FormModal({ onClose, onAddStudent }) {
  const [sections, setSections] = useState([]);
  const [rollNumbers, setRollNumbers] = useState({});

  const initialValues = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    class: "",
    section: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Future dates are not allowed")
      .required("Required"),
    class: Yup.string().required("Required"),
    section: Yup.string().required("Required"),
  });

  const generateRollNumber = (classSelected, sectionSelected) => {
    const key = `${classSelected}${sectionSelected}`;
    const currentCount = rollNumbers[key] || 0;
    const newCount = currentCount + 1;
    setRollNumbers({ ...rollNumbers, [key]: newCount });
    return `${classSelected}${sectionSelected}${String(newCount).padStart(
      3,
      "0"
    )}`;
  };

  const handleClassChange = (classSelected) => {
    setSections(sectionsMap[classSelected] || []);
  };

  return (
    <>
      <div className="modal show d-block" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Student</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                  const rollNumber = generateRollNumber(
                    values.class,
                    values.section
                  );
                  onAddStudent({ ...values, rollNumber });
                  resetForm();
                  onClose();
                }}
              >
                {({ setFieldValue }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <Field name="firstName" className="form-control" />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <Field name="lastName" className="form-control" />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateOfBirth">Date of Birth</label>
                      <Field
                        name="dateOfBirth"
                        type="date"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="dateOfBirth"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="class">Class</label>
                      <Field
                        name="class"
                        as="select"
                        className="form-control"
                        onChange={(e) => {
                          setFieldValue("class", e.target.value);
                          handleClassChange(e.target.value);
                        }}
                      >
                        <option value="">Select Class</option>
                        {Object.keys(sectionsMap).map((classNum) => (
                          <option key={classNum} value={classNum}>
                            {classNum}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="class"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="section">Section</label>
                      <Field
                        name="section"
                        as="select"
                        className="form-control"
                      >
                        <option value="">Select Section</option>
                        {sections.map((section) => (
                          <option key={section} value={section}>
                            {section}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="section"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-primary">
                        Add Student
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormModal;
