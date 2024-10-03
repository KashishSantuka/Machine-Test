import { useState, useEffect } from "react";
import "./employeList.css";
import SideBar from "../dashBoard/sideBar/SideBar";

const EmployeList = () => {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(""); // Error message
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    designation: "",
    gender: "",
    courses: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3000");

        if (!response.ok) {
          throw new Error("Failed to fetch employee data");
        }

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        setError(error.message); // Assign error message if fetch fails
      }
    };

    fetchEmployees();
  }, []);

  const handleEditClick = (employee) => {
    setEditingEmployeeId(employee._id);
    setFormData({
      name: employee.name,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      designation: employee.designation,
      gender: employee.gender,
      courses: employee.courses.join(", "),
    });
  };

  const handleSaveClick = async (employeeId) => {
    const updatedData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      updatedData.append(key, value);
    });

    try {
      const response = await fetch(
        `http://localhost:3000/employee/edit/${employeeId}`,
        {
          method: "PUT",
          body: updatedData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Update failed");
      }

      const updatedEmployee = await response.json();
      console.log("Updated Employee:", updatedEmployee); // Log updated employee data

      // Update the employee list with the new employee data
      setEmployees((prevEmployees) =>
        prevEmployees.map((employee) =>
          employee._id === updatedEmployee.updatedUser._id ? updatedEmployee.updatedUser : employee
        )
      );

      // Reset editing state
      setEditingEmployeeId(null);
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        designation: "",
        gender: "",
        courses: "",
      });
    } catch (error) {
      console.error("Error during save:", error); // Log any errors
      setError(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/employee/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="Wrapper">
      <div className="mainContent">
        <span className="SideBar">
          <SideBar />
        </span>
        <h1>Employee List</h1>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="table">
        <table>
          <thead>
            <tr>
              <td className="tableHeader">Unique Id</td>
              <td className="tableHeader">Image</td>
              <td className="tableHeader">Name</td>
              <td className="tableHeader">Email</td>
              <td className="tableHeader">Mobile Number</td>
              <td className="tableHeader">Designation</td>
              <td className="tableHeader">Gender</td>
              <td className="tableHeader">Courses</td>
              <td className="tableHeader">Create Date</td>
              <td className="tableHeader">Action</td>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee._id}</td>
                <td>
                  <img src={employee.imgUpload} alt={employee.name} style={{ width: '50px', height: '50px' }} />
                </td>
                <td>
                  {editingEmployeeId === employee._id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  ) : (
                    employee.name
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee._id ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  ) : (
                    employee.email
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee._id ? (
                    <input
                      type="text"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                    />
                  ) : (
                    employee.mobileNumber
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee._id ? (
                    <input
                      type="text"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    />
                  ) : (
                    employee.designation
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee._id ? (
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    >
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                    </select>
                  ) : (
                    (employee.gender === "M" ? "Male" : "Female")
                  )}
                </td>
                <td>
                  {editingEmployeeId === employee._id ? (
                    <input
                      type="text"
                      value={formData.courses}
                      onChange={(e) => setFormData({ ...formData, courses: e.target.value })}
                    />
                  ) : (
                    employee.courses.join(", ")
                  )}
                </td>
                <td>{new Date(employee.createDate).toLocaleDateString()}</td>
                <td>
                  {editingEmployeeId === employee._id ? (
                    <button onClick={() => handleSaveClick(employee._id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEditClick(employee)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(employee._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeList;
