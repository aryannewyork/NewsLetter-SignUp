const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const res = require("express/lib/response");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }

        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/a25be60afd";
    const options = {
        method: "POST",
        auth: "aryan1:ba038c5c89379e456da48a37d6ad564f-us18"
    }

    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    console.log("failure!!!");
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("server is runnig at port 3000");
});




//API KEY
//ba038c5c89379e456da48a37d6ad564f-us18

//LIST-ID
//a25be60afd