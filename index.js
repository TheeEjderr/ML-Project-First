const fs = require('fs');
const express = require('express');
const { createServer  } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server)

file_json = []
Stress = "";
Sleep = "";


app.get("/" , (req,res) =>
{
    res.sendFile(join(__dirname , "index.html"));
});



io.on("connection" , (socket) => {

    
    console.log("Yeni bağlantı:", socket.id);
    fs.readFile('Source/output.json' , function(err,data)
    {
        if(err) throw err;

        const file_json = JSON.parse(data);
        console.log(file_json.Stress)
        Stress = file_json.Stress;
        Sleep = file_json.Sleep;


    });

    socket.emit("sleep" , Sleep)
    socket.emit("stress" , Stress)

    age_ = 0;
    sleep_ = 0;
    activity_ = 0;
    male_ = false;


    socket.on("age" , (age) =>
    {
        console.log(age);
        age_ = age;
    });

    socket.on("activity" , (activity) =>
    {
        console.log(activity);
        activity_ = activity
    });

    socket.on("sleep" , (sleep) =>
    {
        console.log(sleep);
        sleep_ = sleep;
    });

    socket.on("male" , (male) =>
    {
        console.log(male);
        if(male == "on")
        {
            male_ = true;
        }
        else
        {
            male_ = false;
        }

        output_data = {
            "age":age_,
            "sleep":sleep_,
            "activity":activity_,
            "male":male_
        };
    
        console.log(output_data);

        fs.writeFileSync("Source/input.json", JSON.stringify(output_data, null, 2));
    });


    
});




server.listen(3000, () =>
{
    console.log("Server is Running : https://localhost:3000")
})