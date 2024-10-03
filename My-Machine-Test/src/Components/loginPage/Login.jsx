import { useState, useEffect } from "react";
import "./login.css";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {
  const initialValues = { username: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (isSubmit && Object.keys(formErrors).length === 0) {
      const timer = setTimeout(() => {
        navigate("/dashBoard");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSubmit, formErrors, navigate]);

  const validate = (values) => {
    const errors = {};
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    } else if (!regex.test(values.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return errors;
  };

  return (
    <div className="wrapper">
      

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="flex-container">
          <h1>LogIn</h1>
        </div>
        <div className="InputBox">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={formValues.username}
            onChange={handleChange}
          />
          <p>{formErrors.username}</p>

          <label htmlFor="password">Password:</label>
          <input
            type="password" // Change type to password for security
            id="password"
            name="password"
            required
            value={formValues.password}
            onChange={handleChange}
          />
          <p>{formErrors.password}</p>

          <button type="submit"> LogIn </button>
        </div>
        <div className="flex-end">
        <Link to="/forgotPassword">Forgot Password</Link>
          <h3>
            Dont have an account?
            <Link to="/signUp">SignUp</Link>
          </h3>
        </div>
        {isSubmit ? (
        Object.keys(formErrors).length === 0 ? (
          <div className="ui message success">Signed in successfully. Redirecting to dashboard..y</div>
         ) : null
      ) : null}
      </form>
    </div>
  );
};

export default Login;
