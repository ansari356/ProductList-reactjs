import React from "react";
import { useState } from "react";
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstNameError: null,
    lastNameError: null,
    usernameError: null,
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
      // mean we are updating the formData state with the new value of the input field
      // the [id] is a dynamic key that corresponds to the input field's id
      // the value is the new value of the input field
    });

    switch (id) {
      case "firstName":
        setFormErrors({
          ...formErrors,
          firstNameError: value.length === 0 ? "Required" : null,
        });
        break;
      case "lastName":
        setFormErrors({
          ...formErrors,
          lastNameError: value.length === 0 ? "Required" : null,
        });
        break;
      case "username":
        setFormErrors({
          ...formErrors,
          usernameError:
            value.length === 0
              ? "Required"
              : value.length < 3
              ? "Username too short"
              : null,
        });
        break;
      case "email":
        setFormErrors({
          ...formErrors,
          emailError: emailRegex.test(value) ? null : "Invalid email format",
        });
        break;
      case "password":
        setFormErrors({
          ...formErrors,
          passwordError: passwordRegex.test(value)
            ? null
            : "Password must include uppercase, lowercase, number, special character, and be at least 8 characters",
        });
        break;
      case "confirmPassword":
        setFormErrors({
          ...formErrors,
          confirmPasswordError:
            value !== formData.password ? "Passwords do not match" : null,
        });
        break;
      default:
        break;
        // default case is used to handle any other cases that are not explicitly defined
        // In this case, we are not doing anything in the default case
        // The default case is optional and can be omitted if not needed
        // if the id is not one of the above, do nothing
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid =
      Object.values(formErrors).every((err) => err === null) &&
      Object.values(formData).every((val) => val.trim() !== "");
      // Check if all form fields are filled and valid
    // Object.values(formErrors) returns an array of the values of the formErrors object
    // Object.values(formData) returns an array of the values of the formData object
    // every() returns true if all elements in the array pass the test implemented by the provided function
    // In this case, we are checking if all formErrors are null and all formData values are not empty strings
    // If all fields are valid, we can proceed with form submission
    

    if (isValid) {
      alert("Registration successful!");
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      alert("Please correct the errors before submitting.");
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <hr />

      <div className="container mt-4">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className={`form-control ${
                formErrors.firstNameError && "border-danger"
              }`}
              value={formData.firstName}
              onChange={handleChange}
            />
            {formErrors.firstNameError && (
              <small className="text-danger">{formErrors.firstNameError}</small>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className={`form-control ${
                formErrors.lastNameError && "border-danger"
              }`}
              value={formData.lastName}
              onChange={handleChange}
            />
            {formErrors.lastNameError && (
              <small className="text-danger">{formErrors.lastNameError}</small>
            )}
          </div>

          {/* Username */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              className={`form-control ${
                formErrors.usernameError && "border-danger"
              }`}
              value={formData.username}
              onChange={handleChange}
            />
            {formErrors.usernameError && (
              <small className="text-danger">{formErrors.usernameError}</small>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`form-control ${
                formErrors.emailError && "border-danger"
              }`}
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.emailError && (
              <small className="text-danger">{formErrors.emailError}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`form-control ${
                formErrors.passwordError && "border-danger"
              }`}
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.passwordError && (
              <small className="text-danger">{formErrors.passwordError}</small>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`form-control ${
                formErrors.confirmPasswordError && "border-danger"
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPasswordError && (
              <small className="text-danger">
                {formErrors.confirmPasswordError}
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
