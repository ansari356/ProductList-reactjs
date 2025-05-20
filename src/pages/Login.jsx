import React, { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: null,
    passwordError: null,
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });

    if (id === "email") {
      setFormErrors({
        ...formErrors,
        emailError: emailRegex.test(value) ? null : "Invalid email format",
      });
    }

    if (id === "password") {
      setFormErrors({
        ...formErrors,
        passwordError: passwordRegex.test(value)
          ? null
          : "Must contain uppercase, lowercase, number, symbol, min 8 characters",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid =
      !formErrors.emailError &&
      !formErrors.passwordError &&
      formData.email &&
      formData.password;

    if (isValid) {
      alert("Login successful!");
      // Do login logic here (e.g., API call)
      setFormData({ email: "", password: "" });
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className={`form-control ${formErrors.emailError && "border-danger"}`}
            value={formData.email}
            onChange={handleChange}
          />
          {formErrors.emailError && (
            <small className="text-danger">{formErrors.emailError}</small>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className={`form-control ${formErrors.passwordError && "border-danger"}`}
            value={formData.password}
            onChange={handleChange}
          />
          {formErrors.passwordError && (
            <small className="text-danger">{formErrors.passwordError}</small>
          )}
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
