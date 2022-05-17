const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../config/dbConnection");

// Get all feedback
router.get("/view", (req, res) => {
  const sqlQ = `Select feed.feedback_id, feed.completed as completed, feed.avgall as avgall  , emp.employee_name as assignee, emp.employee_id as assigneeid, emp2.employee_name as receiver, emp2.employee_position as position
    from feedback AS feed
    INNER JOIN employee AS emp ON feed.assignee_id = emp.employee_id
    INNER JOIN employee AS emp2 ON feed.receiver_id = emp2.employee_id`;

  db.query(sqlQ, (err, result) => {
    if (err) {
      res.send(err);
    }
    console.log(result);
    res.send(result);
  });
});

// Submit feedback
router.post("/map", (req, res) => {
  const assigner = req.body.assigner;
  const receiver = req.body.receiver;

  const sqlFeedback =
    "INSERT INTO feedback ( assignee_id, receiver_id) VALUES (?, ?)";
  db.query(sqlFeedback, [assigner, receiver], (err, result) => {
    if (err) {
      // console.log('Error occured ' + err)
    }
    //console.log(result)
    res.send({ message: "Successfully Submitted", type: "success" });
  });
});
// Submit feedback
router.put("/create", (req, res) => {
  const ID = req.body.ID;
  const QW = req.body.QW;
  const MT = req.body.MT;
  const OT = req.body.OT;
  const CS = req.body.CS;
  const AI = req.body.AI;
  const GF = req.body.GF;
  const AVG = req.body.AVG;

  const sqlFeedback = `UPDATE feedback SET quality_work = ${QW}, ability_work_team = ${MT}, open_feedback = ${OT}, communication = ${CS}, improve_comment = '${AI}', general_feedback = '${GF}', avgall = ${AVG}, completed = 1 WHERE feedback_id = ${ID}`;
  db.query(sqlFeedback, (err, result) => {
    if (err) {
      //console.log("Error occured " + err);
    }
    //console.log(result);
    res.send({ message: "Successfully Submitted", type: "success" });
  });
});

// Get single user feedback
router.get("/view/details/:id", (req, res) => {
  const Id = req.params.id;
  db.query(
    `SELECT * FROM feedback WHERE feedback_id = ${Id}`,
    (err, result) => {
      if (err) {
        res.send(err);
      }
      res.send(result);
    }
  );
});

// Delete selected feedback
router.delete("/delete/:id", (req, res) => {
  const Id = req.params.id;
  db.query(`DELETE FROM feedback WHERE feedback_id = ${Id}`, (err, result) => {
    if (err) {
      res.send(err);
      console.log(err);
    }
    res.send(result);
    console.log(result);
  });
});

module.exports = router;
