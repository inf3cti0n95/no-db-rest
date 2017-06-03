# no-db-rest
Create a REST API with Storing Data in File i.e. No DB

An express middleware to get REST-like interface without any Database, the Data is stored in a file

```
var express = require('express');
var NoDBRest = require('no-db-rest').NoDBRest;

var app = express();
app.use(NoDBRest('data.json'));

app.listen(3000,()=>{
    console.log("here at 3k");
})

```

Here the Data will be stored in JSON form in data.json

## Different HTTP Requests for Data Operations

### GET - To reterive data from the data.json 

e.g. Sending a GET request to http://localhost:3000?name=naruto

Searches for the Object with property name and value "naruto" and sends the the whole object as response.

### PUT - To update data from the data.json 

e.g. SENDING a PUT request to http://localhost:3000?search=name=naruto,age=15&update=name=sakura

Searches for the Objects with property name and value "naruto" and with property age with value 15, updates it with name property to "sakura" and sends the number of objects updated as response.


### POST - To store data to the data.json 

e.g. Sending a POST request to http://localhost:3000?name=naruto

Add a for the Object with property name and value "naruto" and sends true as response if successful.


### DELETE - Deletes the object from data.json 

e.g. Sending a DELETE request to http://localhost:3000?name=naruto

Searches for the Objects with property name and value "naruto", Deletes them from data file and sends the number of objects updated as response.
