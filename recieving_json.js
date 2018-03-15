var express = require('express');
var mysql = require('mysql2');
var query = require('querystring');
var request = require('request');

var info = {
    ajax : 'true',
    select_model : "Select model",
    brand : '9'
};

var info1 = {
    ajax : 'true',
    model : '97',
    select_buildyear : "Select year"
};

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'mytestdb',
    user: 'myuser',
    password: 'mypass'
});

var data = query.stringify(info);
var length = data.length;

request({
    headers : {
        'Content-Length': length,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://www.bcconsulting.lu/en/#individual-file-service/4' ,
    body: data,
    method: 'POST'
}, function (err, res, body) {
    var obj = JSON.parse(body);//Parsing string into json obj

    var values = [];
    for(var x in obj){
        values.push([obj[x].id , obj[x].label]);  //STORED JSON IN THE FORM OF AN ARRAY
    }

    connection.query("INSERT INTO Model (OID,Name) Values ?" , [values], function(err, result) {
        if(err) throw err;
        console.log("Inserted successfully");
    });

});

var data1 = query.stringify(info1);
var length1 = data1.length;

request({
    headers : {
        'Content-Length': length1,
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://www.bcconsulting.lu/en/#individual-file-service/4' ,
    body: data1,
    method: 'POST'
}, function (err, res, body) {
    var obj1 = JSON.parse(body);//Parsing string into json obj
    console.log(obj1);
    var values1 = [];
    for(var y in obj1){
        values1.push([obj1[y].id , obj1[y].label]);  //STORED JSON IN THE FORM OF AN ARRAY
    }

     connection.query("INSERT INTO YearDetails (OID,data) Values ?" , [values1], function(err, result) {
        if(err) throw err;
        console.log("Inserted successfully");
    });

});
