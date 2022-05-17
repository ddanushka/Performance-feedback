How to run the application

Create MySQL schema called "performancefeedback"
import data.csv file data to employee table created
Edit Database connectiong related settings in server/config/dbconnection.js

Admin username : dilshandanushka@live.com
      password : dilshan


Run npm install on both server and client apps
to run server use "npm run devStart"
to run client use "npm start"

*Assumptions made
Admin can create/update/delete new admin users and users
Admin can assign/delete feedbacks
Multiple feedbacks can be assigned to a user 

Feedbacks can not be edited once submitted by users
Users are only allowed to see the feedbacks that they are suposed to submit
Once a feedback is submitted it is not editable