import React from "react";
import loginImg from "../images/login.png";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    mobile: "",
    terms: false,
  });

  const [error, setError] = useState({
    name: false,
    userName: false,
    email: false,
    mobile: false,
    terms: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors before validating
    setError({
      name: false,
      userName: false,
      email: false,
      mobile: false,
      terms: false,
    });

    // Collect errors in an object
    let newErrors = {};

    if (formData.name.trim().length === 0) {
      newErrors.name = true;
    }
    if (formData.email.trim().length === 0) {
      newErrors.email = true;
    }
    if (formData.mobile.trim().length === 0) {
      newErrors.mobile = true;
    }
    if (formData.userName.trim().length === 0) {
      newErrors.userName = true;
    }
    if (!formData.terms) {
      newErrors.terms = true;
    }

    // If there are errors, update state and stop submission
    if (Object.keys(newErrors).length > 0) {
      setError((prevErrors) => ({ ...prevErrors, ...newErrors }));
      return;
    }

    // If no errors, proceed with form submission
    console.log(formData);
    localStorage.setItem("user", JSON.stringify(formData));
    toast.success("User created successfully");
    navigate("/genre");
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >
      <div
        className="login-poster"
        style={{
          width: "50vw",
          position: "relative",
          height: "100vh",
        }}
      >
        <img
          src={loginImg}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt="poster"
        />
        <h1
          style={{
            position: "absolute",
            color: "white",
            bottom: "11vh",
            left: "3vw",
            background: "transparent",
            fontSize: "3.1rem",
            fontWeight: "900",
            fontFamily: "Roboto",
            fontStyle: "normal",
          }}
        >
          Discover new things on
          <br /> Superapp
        </h1>
      </div>
      <div className="login-form"
        
      >
        <h1
          style={{
            fontFamily: "Single Day",
            fontWeight: "400",
            fontStyle: "normal",
            fontSize: "3.3rem",
            color: "#72DB73",
          }}
        >
          Super App
        </h1>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.6rem" }}>
          Create your new account
        </h2>
        <form>
          <input
            style={{
              border: error.name ? "1px solid red " : "1px solid #72DB73 ",
            }}
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          ></input>
          {error.name && <p style={{ color: "red" }}>Name is Required</p>}
          <input
            style={{
              border: error.userName ? "1px solid red " : "1px solid #72DB73 ",
            }}
            type="text"
            placeholder="UserName"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
          ></input>
          {error.userName && (
            <p style={{ color: "red" }}>userName is Required</p>
          )}
          <input
            style={{
              border: error.email ? "1px solid red " : "1px solid #72DB73 ",
            }}
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          ></input>
          {error.email && <p style={{ color: "red" }}>Email is Required</p>}
          <input
            style={{
              border: error.mobile ? "1px solid red " : "1px solid #72DB73 ",
            }}
            type="text"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={(e) =>
              setFormData({ ...formData, mobile: e.target.value })
            }
          ></input>
          {error.mobile && <p style={{ color: "red" }}>Mobile is Required</p>}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1vw",
              marginTop: "1vh",
            }}
          >
            <input
              type="checkbox"
              name="terms"
              id="terms"
              checked={formData.terms}
              onChange={(e) =>
                setFormData({ ...formData, terms: e.target.checked })
              }
            />

            <label htmlFor="terms">
              I agree to the{" "}
              <span style={{ color: "#72DB73" }}>Terms of Service</span> and{" "}
              <span style={{ color: "#72DB73" }}>Privacy Policy</span>
            </label>
          </div>
          {error.terms && (
            <p style={{ color: "red" }}>Please Accept Terms and Conditions</p>
          )}
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#72DB73",
              padding: "0.9rem",
              borderRadius: "30px",
              fontSize: "1.2rem",
              fontWeight: "bolder",
              color: "white",
              border: "none",
              marginTop: "2vh",
              width: "70%",
            }}
          >
            SIGN UP
          </button>

          <p
            style={{
              width: "70%",
              fontSize: "1rem",
              color: "gray",
              marginTop: "1vh",
            }}
          >
            By clicking on Sign up. you agree to Superapp
            <span style={{ color: "#72DB73" }}>
              Terms and Conditions of Use
            </span>{" "}
          </p>
          <p
            style={{
              width: "70%",
              fontSize: "1rem",
              color: "gray",
              marginTop: "1vh",
            }}
          >
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head Superapp{" "}
            <span style={{ color: "#72DB73" }}>Privacy Policy</span>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
