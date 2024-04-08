const express = require('express')
const app = express()
const cors = require("cors")
const moongose = require('mongoose')
const db = require('./model')
const Role = db.role;
const User = db.user;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

moongose.connect('mongodb://127.0.0.1:27017/EventBooking')
    .then(() => {
        console.log("MongoDB Connected Successfully.")
    })
    .catch(err => {
        console.log("Error Connecting: ", err)
    })


async function initial() {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count === 0) {
            await Promise.all([
                new Role({ name: "user" }).save(),
                new Role({ name: "admin" }).save()
            ]);

            console.log("Roles added successfully.");
        } else {
            console.log("Roles already exist.");
        }
    } catch (err) {
        console.error("Error initializing roles:", err);
    }
}

initial()

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// const port = process.env.PORT || 8000;
app.listen(8000, () => {
    console.log("Server is running...")
})








// app.get('/', (req, res) => {
//     res.setHeader("X-Name", "Sharad Jadhav")
//     res.json({message: "Welcome to Authentication Test"})
//     console.log("Header: ", req.headers)
//     console.log("URL:", req.url)
//     console.log("Cookies: ", req.cookies)
//     console.log("headersDistinct: ", req.headersDistinct)
//     console.log("hostname: ", req.hostname)
//     console.log("httpVersion: ", req.httpVersion)
//     console.log("ip: ", req.ip)
//     console.log("params: ", req.params)
//     console.log("protocol: ", req.protocol)
//     console.log("statusCode: ", req.statusCode)
// })

