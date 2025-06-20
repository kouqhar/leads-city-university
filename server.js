// Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");

// Import our routes
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Initialize the app
const app = express();

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;
const feURI = require("./config/keys").feURI;

// Connect to mongoDB through mongoose
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 5000,
    },
  })
  .then(() => console.log("MongoDB Connected Successfully!!! "))
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Configure CORS to allow requests from your frontend

const allowedOrigins = ["http://localhost:5173", feURI];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);
      else return callback(new Error("Not allowed by CORS"));
    }, // Specify the origin of your frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow the methods your frontend uses
    allowedHeaders: ["Content-Type", "Authorization"], // Allow the headers your frontend sends
  })
);

app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  next();
});

// Passport config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// Port
const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Server listening on port ${port}`));
