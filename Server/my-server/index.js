import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import userModel from "./models/User.js";
import User from "./models/User.js";
import multer from "multer";
import path from "path";


const app = express();
app.use(express.json());

const corsOption = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOption));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });
app.use("/uploads", express.static("uploads"));

// GET route with async/await for the database call
app.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
});

// POST route with async/await for creating a user
app.post("/post", upload.single("imgUpload"), async (req, res) => {
  console.log("Received request body:", req.body);
  const { name, email, mobileNumber, designation, gender, courses } = req.body;

  const imgUpload = req.file;

  if (!imgUpload) {
    return res.status(400).send("Image upload is required");
  }

  try {
    const data = await userModel.create({
      name,
      email,
      mobileNumber,
      designation,
      gender,
      courses: JSON.parse(courses), 
      imgUpload: `/uploads/${imgUpload.filename}`, 
    });

    res.status(201).json(data);
    console.log("Added Successfully");
  } catch (err) {
    console.error("Error creating employee:", err);
    res.status(500).send("Error creating employee");
  }
});

app.get("/drop-mobile-index", async (req, res) => {
  try {
    await userModel.collection.dropIndex("mobileNo_1");
    res.send("Index dropped successfully");
  } catch (error) {
    console.error("Error dropping index:", error);
    res.status(500).send("Error dropping index");
  }
});

app.put("/employee/edit/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, email, mobileNumber, designation, gender, courses, imgUpload } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, mobileNumber, designation, gender, courses, imgUpload },
      { new: true } // Ensure it returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      message: "Employee updated successfully",
      updatedUser, // Ensure you are returning this
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.delete("/employee/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedUser });
  } catch(error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("App is running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
