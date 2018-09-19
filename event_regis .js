var express = require('express');
var app = express();
app.use(express.static('public'));


app.get('/event_regi.html', function (req, res) {
    res.sendFile(__dirname + "/" + "event_regi.html");
})

app.get('/eventadd', function (req, res) {
    // Prepare output in JSON format
    response = {
        event_id: req.query.eventid,//adding event_id to database
        event_name: req.query.name,//adding event_name to database
        event_date: req.query.date//adding event_date to database

    };
    //taking event as a database and event_register is collection or table
    console.log(response);
    res.end(JSON.stringify(response));
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/event";
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbase = db.db("event");

        dbase.collection("event_register").insertOne(response, function (err, res) {
            if (err) {
                throw err;
            } else {
                console.log("1 record inserted");


            }
            //res.redirect("/home");
            db.close();
        });
    });

})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)

})