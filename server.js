// server.js
// This is an express server app running on the web server.
// This copy of server is for the food site.
var express = require("express");
var app = express();

// Serve any static files from the public dir
app.use(express.static("public"));

// The mysql object allows one to talk to a running
// instance of a MySQL server.
var mysql = require("mysql");

// Creates our /names endpoint. This endpoint will respond with a
// json representation of the food names. This is an array of objects,
// all of which have just a 'name' attribute.
// e.g.  [{"name"="Banana"}, {"name"="Peanut Butter"}]
app.get("/names", getFoodNames);
function getFoodNames( req, res) {
    console.log("getFoodNames called");

    // The connection object allows one to connect to
    // the given MySQL server (in this case on localhost)
    // with the given user and password, looking at the
    // specified database.
    var conn = mysql.createConnection( {
        host: "localhost",
        user: "aulikm",
        password: "$395Mi569",
        database: "AulikGames"
            });
    // Calling the connect function causes the connection
    // object (in the variable 'conn') to actually connect
    // with the credentials specified.
    conn.connect( function( err) {
        if( err) {
            //textForClient += "Error connecting: " + err;
        }
        else {
            //textForClient += "Connection established";
        }});
    // Here is the sql query that we want to run.
    var sql = "select name from food";

    // this function is to be run when the query returns a result.
    function selectNameFromFood(err,rows) {
        console.log("selectNameFromFood called");
        if( err) {
            // send back an error code in result
        }
        else {
            res.send( JSON.stringify( rows));
        }
    }

    // this statement actually runs the query on mysql.
    conn.query( sql, selectNameFromFood);

    // this statement will close the connection.
    conn.end();

}

// Creates our /data endpoint. This endpoint will respond with a
// json representation of the food requested by the 'food' parameter.
// This response is an array of a single food object.
// e.g.  [{"id"="1", "name"="Banana", "size"="3",
//         "sizeunit"="cups  ", "cal"="160","sodium"="35"}]
app.get("/data", getFoodData);
function getFoodData( req, res) {
    // Grab the parameter to this query, the food name.
    let requestedFood = req.query.food;
    console.log("getFoodData called with food=" + req.query.food);

    // Create and connect a connection to the MySQL server.
    var conn = mysql.createConnection( {
       host: "localhost",
       user: "aulikm",
       password: "$395Mi569",
       database: "AulikGames"
            });
    conn.connect( function( err) {
        if( err) {
            //textForClient += "Error connecting: " + err;
        }
        else {
            //textForClient += "Connection established";
        }});

    // Here is the sql query that we want to run.
    var sql = "select * from food where name = \"" + requestedFood + "\"";
    // Run the query on mysql.
    conn.query( sql, function (err,rows) {
            console.log("selectDataFromFood called");
            if( err) {
                // send back an error code in result
            }
            else {
                // Send back the rows (an array of row objects) as a JSON string
                res.send( JSON.stringify( rows));
            }
        }
    );
    // Close the connection.
    conn.end();
}


// Start the web server running on port 3007
app.listen(3040);
