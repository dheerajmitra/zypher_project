var express = require('express');
var app = express();
app.use(express.static('public'));


app.get('/user_add.html', function (req, res) {
    res.sendFile(__dirname + "/" + "user_add.html");
})

app.get('/useradd', function (req, res) {
    // Prepare output in JSON format
    response = {
        user_id: req.query.userid,//adding user_id to database
        email: req.query.email_id,//adding email to database
        event_id: req.query.eventid,//adding event_id to database

    };
    //taking event as a database and user_register is collection or table
    console.log(response);
    res.end(JSON.stringify(response));

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/event";
    var flag = 0;
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;


        var dbase = db.db("event");

        console.log(response.email);
        dbase.collection("user_register").findOne({ acc: response.email }, function (err, result) {
            if (err) {

                flag = 1;
            }
            else
                console.log(result);


            if (flag == 1) {
                var MongoClient = require('mongodb').MongoClient;
                var url = "mongodb://localhost:27017/event";
                MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbase = db.db("event");
                    var nodemailer = require('nodemailer');
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'companyemail@gmail.com',
                            pass: 'companypassword'
                        }
                    });
                    var mailOptions = {
                        from: 'companyemail@gmail.com',
                        to: rsponse.email,
                        subject: 'subject of email',
                        text: 'That was easy!'
                    };
                    dbase.collection("user_register").insertOne(response, function (err, res) {
                        if (err) {
                            throw err;
                        } else {
                            console.log("1 record inserted");
                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });


                        }
                        //res.redirect("/home");
                        db.close();
                    });
                });
            }
        });
    });
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})