const express = require("express");
const app = express();
const cors = require("cors");
const moongose = require("mongoose");
const db = require("./model");
const Role = db.role;
const Event = require("./model/clubData.model");
const userEvent = require("./model/userEventRegistrationData.model")
const multer = require("multer");
const { authJwt } = require("./middlewares");

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
  { name: "qrCode", maxCount: 1 },
]);

// POST route to handle event creation with image uploads
app.post("/api/event", uploadImages, authJwt.verifyToken, async (req, res) => {
  const userId = req.userId;
  const eventData = req.body;
  eventData.createdBy = userId;
  try {
    eventData.widescreenPoster = {
      data: req.files["widescreenPoster"][0].buffer,
      contentType: req.files["widescreenPoster"][0].mimetype,
    };
    eventData.potraitPoster = {
      data: req.files["potraitPoster"][0].buffer,
      contentType: req.files["potraitPoster"][0].mimetype,
    };
    eventData.qrCode = {
      data: req.files["qrCode"][0].buffer,
      contentType: req.files["qrCode"][0].mimetype,
    };
    const event = new Event(eventData);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

app.get("/api/getEvents", authJwt.verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const events = await Event.find({ createdBy: userId });
    if (events.length < 1) {
      return res.status(401).send({ message: "No Events Found." });
    }
    res.status(200).send(events);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching events");
  }
});


app.get("/api/getAllUserRegistrations", async (req, res) => {
  try {
    const allRegistrations = await userEvent.find();
    if(allRegistrations.length < 1){
      return res.status(401).send({message: "No User Registration Found"})
    }
    res.status(200).send(allRegistrations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error Fetching User Events");
  }
});

app.get("/api/getUserEvents", async (req, res) => {
  try {
    const events = await Event.find(
      {},
      { createdBy: 0, widescreenPoster: 0, __v: 0 }
    );
    if(events.length < 1){
      return res.status(401).send({message: "No Events Found"})
    }
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send("Error Fetching Events");
  }
});

app.get("/api/getEventBanners", async (req, res) => {
  try {
    const banner = await Event.find(
      {},
      {
        widescreenPoster: 1,
        date: 1,
        time: 1,
        category: 1,
        seats: 1,
        _id: 0,
      }
    )
      .sort({ createdAt: -1 })
      .limit(4);
      if(banner.length < 1){
        return res.status(401).send({message: "No Latest Events Found"})
      }
    res.status(200).send(banner);
  } catch (error) {
    res.status(500).send("Error Finding Banner");
  }
});



app.post("/api/userEventRegistrationData", async (req, res) => {
  console.log(req.body)
  try {
    const eventData = req.body;
    const newUserEvent = new userEvent(eventData);
    await newUserEvent.save();
    res.status(201).send("Event registration successful.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
