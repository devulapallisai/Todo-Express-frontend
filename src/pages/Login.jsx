import React, { useContext, useEffect, useState } from "react";
// CSS Module sheet for applying local changes and not passing to children
import styles from "../css/login.module.css";
import Image from "../images/Image.svg";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import LoginIcon from "@mui/icons-material/Login";
import SignupIcon from "../images/signup.svg";
import Fab from "@mui/material/Fab";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "../App";

function Login({ setUsername, setPassword }) {
  useEffect(() => {
    if (localStorage.getItem("Token")) {
      window.location.href = "/dashboard";
    }
  });
  const { username, password } = useContext(Usercontext);
  const [text, setText] = useState("Sign Up");
  const [signuperror, setsignuperror] = useState(false);
  // signuperror checks if user there in database or not while signing up
  const [loginerror, setloginerror] = useState(false);
  const [passworderror, setpassworderror] = useState(false);
  // loginerrror checks password matching with database or not if user exists in database while logging in
  const [totalerror, settotalerror] = useState(false);
  // totalerror checks whether user in database or not while logging in
  let navigate = useNavigate();
  function handleSignupchange(text, username, adminoruser) {
    if (username !== "" && password !== "") {
      // If both username and password are null then fetch /signup api and then insert data into database after hashing password otherwise display already user exists
      if (password.length < 8) {
        setpassworderror(true);
      } else {
        fetch("https://mysaitodo.herokuapp.com/signup", {
          method: "POST",
          headers: {
            Accept: "application/json",
                        'Content-type':'application/json',
                        'Access-Control-Allow-Origin': '*',
                   
          },
          body: JSON.stringify({ email: username, password: password }),
        }).then((res) => {
          if (res.status === 400) {
            setsignuperror(true);
          } else {
            navigate("/dashboard");
            res.json().then((re) => {
            localStorage.setItem("Token", re.token);
            localStorage.setItem("name", username);
            });
          }
        });
      }
    } else {
      alert("Please fill the form correctly!!!");
    }
  }
  function handleLoginchange(password, username) {
    if (username !== "" && password !== "") {
      fetch("https://mysaitodo.herokuapp.com/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          'Content-type':'application/json',
                        'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email: username, password: password }),
      }).then((res) => {
        res.json().then((re) => {
          if (re.error === "Invalid Username or User doesn't exists") {
            settotalerror(true);
          } else if (re.error === "Invalid password") {
            setloginerror(true);
          } else {
            localStorage.setItem("Token", re.token);
            localStorage.setItem("name", username);
            // console.log("Success");
            navigate("/dashboard");
          }
        });
      });
    } else {
      alert("Please fill form correctly");
    }
  }
  useEffect(() => {
    setTimeout(() => {
      settotalerror(false);
    }, 1000);
  }, [totalerror]);
  useEffect(() => {
    setTimeout(() => {
      setpassworderror(false);
    }, 1000);
  }, [passworderror]);
  useEffect(() => {
    setTimeout(() => {
      setloginerror(false);
    }, 1000);
  }, [loginerror]);
  useEffect(() => {
    setTimeout(() => {
      setsignuperror(false);
    }, 1000);
  }, [signuperror]);

  return (
    <>
      {totalerror ? (
        <Typography
          variant="h4"
          component="h2"
          style={{ textAlign: "center", color: "red" }}
        >
          You haven't signed up yet!!!
        </Typography>
      ) : (
        ""
      )}
      {signuperror ? (
        <Typography
          variant="h4"
          component="h2"
          style={{ textAlign: "center", color: "green" }}
        >
          Looks like your Username is already in use!!!
        </Typography>
      ) : (
        ""
      )}
      <div className={styles.outerbox}>
        <div className={styles.imageclass}>
          <img
            src={text === "Sign Up" ? SignupIcon : Image}
            className={styles.image}
            alt="ImageHere"
          />
        </div>
        <div className={styles.loginask}>
          <Typography variant="h4" component="h2">
            {text}
          </Typography>
          <div style={{ width: "60px" }}>
            <hr
              style={{
                width: "60px",
                backgroundColor: "violet",
                height: "3px",
                borderRadius: "20px",
              }}
            />
          </div>
          <div className={styles.textfields}>
            {text === "Sign Up" ? (
              <Typography
                variant="h5"
                component="h2"
                style={{ textAlign: "left" }}
              >
                Please sign up here if you haven't
              </Typography>
            ) : (
              <Typography
                variant="h5"
                component="h2"
                style={{ textAlign: "left" }}
              >
                If you have signed up please log in now
              </Typography>
            )}
            <TextField
              id="outlined-basic"
              label="Username"
              type="text"
              helperText="Please enter username"
              variant="outlined"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
            />
            {passworderror ? (
              <TextField
                id="outlined-error-helper-text"
                error
                label="Error"
                type="password"
                helperText="Password length must be greater than 7"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            ) : loginerror ? (
              <TextField
                id="outlined-error-helper-text"
                error
                label="Error"
                type="password"
                helperText="Please enter password correctly"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            ) : (
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                helperText="Please enter password"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            )}
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
              type="submit"
              className={styles.buttonchange}
              style={{
                backgroundColor: "green",
                width: "180px",
              }}
              onClick={() => {
                text === "Sign Up"
                  ? handleSignupchange(text, username)
                  : handleLoginchange(password, username);
              }}
            >
              <VpnKeyIcon sx={{ mr: 1 }} />
              {text === "Login" ? "Login" : "Sign Up"}
            </Fab>
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
              className={styles.buttonchange}
              style={{
                backgroundColor: "red",
                width: "180px",
                marginBottom: "50px",
              }}
              onClick={() => {
                setText(text === "Login" ? "Sign Up" : "Login");
                settotalerror(false);
                setloginerror(false);
                setsignuperror(false);
              }}
            >
              <LoginIcon sx={{ mr: 1 }} />
              {text === "Sign Up" ? "Login" : "Sign Up"}
            </Fab>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
