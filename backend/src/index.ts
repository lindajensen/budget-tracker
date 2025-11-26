// Core-modules and third-party modules
import express, { Request, Response } from "express";
import cors from "cors";
import { Client } from "pg";
import dotenv from "dotenv";
import { hashPassword } from "./utils/auth-utils";

// Config
dotenv.config();

// App Instances and Middleware
const app = express();
const port = process.env.port || 8080;

app.use(cors());
app.use(express.json());

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client
  .connect()
  .then(() => console.log("Connected to Neon database"))
  .catch((err) => console.error("Connection error:", err));

// Routes
// Register
app.post("/api/register", async (request: Request, response: Response) => {
  try {
    const { email, password, firstName, lastName } = request.body;

    if (!email || !password || !firstName || !lastName) {
      return response.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return response.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await hashPassword(request.body.password);

    const result = await client.query(
      "INSERT INTO users (email, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name, created_at",
      [email, hashedPassword, firstName, lastName]
    );

    response.status(201).json({
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/api/login", async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
  } catch (error) {
    response.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
