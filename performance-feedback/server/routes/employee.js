const express = require("express");
const router = express.Router();
const db = require("../config/dbConnection");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Get all employees
router.get("/view", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      res.send(err);
    }
    res.send(result);
  });
});

// Get single employee
router.get("/view/one/:id", (req, res) => {
  const UserId = req.params.id;
  db.query(
    `SELECT * FROM employee WHERE employee_id = ${UserId}`,
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
});

// Delete selected employee
router.delete("/delete/:id", (req, res) => {
  const UserId = req.params.id;
  db.query(
    `DELETE FROM employee WHERE employee_id = ${UserId}`,
    (err, result) => {
      if (err) {
        res.send(err);
        console.log(err);
      }
      res.send(result);
      console.log(result);
    }
  );
});

// Create new employee
router.post("/create", (req, res) => {
  const UserName = req.body.username;
  const Position = req.body.position;
  const Department = req.body.department;
  const Email = req.body.email;
  const Password = req.body.password;
  const IsAdmin = req.body.isadmin;

  bcrypt.hash(Password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    const checkEmail = "SELECT * FROM employee WHERE employee_email = ?";
    db.query(checkEmail, Email, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      console.log(result);
      if (result.length > 0) {
        res.send({
          loggedin: true,
          message: "Already exists, please use a different email",
          type: "error",
        });
      } else {
        const sqlCreateUser =
          "INSERT INTO employee (employee_name, employee_position, employee_department, employee_email, employee_password, isadmin) VALUES (?, ?, ?, ?, ?, ?)";
        db.query(
          sqlCreateUser,
          [UserName, Position, Department, Email, hash, IsAdmin],
          (err, result) => {
            if (err) {
              res.send({ message: "An error occured", type: "error" });
            }
            res.send({ message: "User Added Successfully", type: "success" });
          }
        );
      }
    });
    //
  });
});

// Submit feedback
router.put("/create", (req, res) => {
  const id = req.body.id;
  const username = req.body.username;
  const position = req.body.position;
  const department = req.body.department;
  const email = req.body.email;
  const password = req.body.password;
  const isadmin = req.body.isadmin;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    const sqlFeedback = `UPDATE employee SET employee_name = "${username}", employee_position = "${position}", employee_department = "${department}", employee_email = "${email}", employee_password = "${hash}", isadmin = "${isadmin}" WHERE employee_id = "${id}"`;
    db.query(sqlFeedback, (err, result) => {
      if (err) {
        console.log("Error occured " + err);
      }
      //console.log(result);
      res.send({ message: "Successfully Submitted", type: "success" });
    });

    //
  });
});

module.exports = router;
