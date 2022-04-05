import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/Nav";
import axios from "axios";
import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Paper, Container, Grid, Typography } from "@mui/material";
import { textAlign } from "@mui/system";
type Props = {
  _id: String;
  title: String;
  isCompleted: Boolean;
};
function Dashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    background: "green",
    cursor: "pointer",
    color: "white",
  }));
  const handleDone = (id: String) => {
    axios
      .put(
        `https://mysaitodo.herokuapp.com/todo/${id}`,
        {},
        { headers: { token: token } }
      )
      .then((res) => {
        if (res.status === 200) {
          let _todos = todos;
          settodos(
            _todos
              ? _todos.filter((todo) => res.data.todo._id !== todo._id)
              : _todos
          );
        }
      });
  };
  const [todos, settodos] = useState<Array<Props>>();
  const token = localStorage.getItem("Token")
    ? JSON.stringify(localStorage.getItem("Token"))
    : "";
  useEffect(() => {
    if (!token) {
      window.location.href = "/";
    }
  });
  const [addtodo, settodo] = useState("");
  useEffect(() => {
    axios
      .get("https://mysaitodo.herokuapp.com/todos", {
        headers: { token: token,'Content-type':'application/json',
                        'Access-Control-Allow-Origin': '*' },
      })
      .then((res) => {
        if (res.status === 200) {
          settodos(res.data.todos);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleformsubmit = (e:React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post(
        "https://mysaitodo.herokuapp.com/todo",
        { title: addtodo },
        {
          headers: { token: token,'Content-type':'application/json',
                        'Access-Control-Allow-Origin': '*', },
        }
      )
      .then((res) => {
        console.log(res);
        settodo("");
        alert("Todo Added Successfully");

        if (todos) {
          settodos([...todos, res.data.todo]);
        } else {
          settodos([res.data.todo]);
        }
      })
      .catch((err) => console.log(err));
  };
  return token ? (
    <>
      <ResponsiveAppBar />
      <div
        style={{
          maxWidth: "500px",
          padding: "20px 0",
          border: "2px solid transparent",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Helvetica",
            color: "#59af4ce0",
            fontSize: "3rem",
          }}
        >
          Todo List
        </h1>
        <form
          className="form"
          style={{
            marginTop: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="standard-basic"
            label="Add A Todo"
            value={addtodo}
            onChange={(e) => settodo(e.target.value)}
            variant="standard"
            style={{ width: "60%", fontFamily: "Helvetica" }}
          />
          <Fab color="primary" aria-label="add" onSubmit={(e)=>handleformsubmit(e)}>
            <AddIcon />
          </Fab>
        </form>
      </div>
      {/* Todo portion start */}

      {todos ? (
        todos.map((item, index) =>
          item.isCompleted ? (
            ""
          ) : (
            <Container maxWidth="sm" key={index}>
              <Grid
                container
                style={{
                  border: "1px solid black",
                  padding: 10,
                  margin: 10,
                  borderTopLeftRadius: 4,
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  borderTopRightRadius: 4,
                }}
              >
                <Grid item xs={9}>
                  <Typography variant="h6">{item.title}</Typography>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={2} onClick={() => handleDone(item._id)}>
                  <Item>Done</Item>
                </Grid>
              </Grid>
            </Container>
          )
        )
      ) : (
        <Typography variant="h4" textAlign="center">
          Try adding Todo Here!!!
        </Typography>
      )}
    </>
  ) : (
    <div></div>
  );
}

export default Dashboard;
