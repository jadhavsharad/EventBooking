const express = require("express");
const app = express();
const cors = require("cors");
const moongose = require("mongoose");
const db = require("./model");
const Role = db.role;
const Event = require("./model/clubData.model");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

moongose
  .connect("mongodb://127.0.0.1:27017/EventBooking")
  .then(() => {
    console.log("MongoDB Connected Successfully.");
  })
  .catch((err) => {
    console.log("Error Connecting: ", err);
  });

async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "admin" }).save(),
      ]);

      console.log("Roles added successfully.");
    } else {
      console.log("Roles already exist.");
    }
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
}

initial();
// Define multer upload middleware for handling image uploads
const uploadImages = upload.fields([
  { name: "widescreenPoster", maxCount: 1 },
  { name: "potraitPoster", maxCount: 1 },
]);

// POST route to handle event creation with image uploads
app.post("/api/event", uploadImages, async (req, res) => {
  try {
    const eventData = req.body;
    eventData.widescreenPoster = {
      data: req.files["widescreenPoster"][0].buffer,
      contentType: req.files["widescreenPoster"][0].mimetype,
    };
    eventData.potraitPoster = {
      data: req.files["potraitPoster"][0].buffer,
      contentType: req.files["potraitPoster"][0].mimetype,
    };

    console.log(eventData);
    const event = new Event(eventData);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.get("/api/getEvents", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching events");
  }
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log("Server is running...");
});

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
