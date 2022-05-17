const express = require("express");
const cors = require("cors");
const db = require("./config/dbConnection");
const feedbackRouter = require("./routes/feedback");
const employeeRouter = require("./routes/employee");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    key: "feedback",
    secret: "testappfeedbackperformance",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 1000,
    },
  })
);
app.get("/api/employees/login", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedin: true,
      username: req.session.user.employee_name,
      usernameId: req.session.user.employee_id,
      type: "success",
      message: "logged is successfully",
      isAdmin: req.session.user.isadmin,
    });
  } else {
    res.send({ loggedin: false });
  }
});

app.post("/api/employees/login", (req, res) => {
  const Email = req.body.Email;
  const Password = req.body.Password;
  const IsAdmin = req.body.IsAdmin;

  const sqlCreateUser = "SELECT * FROM employee WHERE employee_email = ?";
  db.query(sqlCreateUser, Email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result && result.length > 0) {
      bcrypt.compare(
        Password,
        result[0].employee_password,
        (error, response) => {
          if (response) {
            req.session.user = result[0];
            console.log(req.session.user.isadmin);
            res.send({
              loggedin: true,
              message: "logged",
              type: "success",
              isAdmin: req.session.user.isadmin,
            });
          } else {
            res.send({
              loggedin: false,
              message: "Wrong password, please try again",
              type: "error",
            });
          }
        }
      );
    } else {
      res.send({ message: "User doesn't exist", type: "error" });
    }
  });
});

app.get("/api/employees/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.error("--> session destroy failed.err -> ", err);
    }
  });
  res.clearCookie("connect.sid");
  res.redirect("/");
});

app.use("/api/feedbacks", feedbackRouter);
app.use("/api/employees", employeeRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
