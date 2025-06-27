const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SERVER RUNNING");
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@skillstack.6gwde6m.mongodb.net/?retryWrites=true&w=majority&appName=skillStack`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const gardenersCollection = client.db("GDB").collection("gardeners");
    const tipsCollection = client.db("GDB").collection("tips");

    // server.js or routes/gardeners.js

    app.post("/api/gardeners", async (req, res) => {
      try {
        const { name, email, photoURL, uid } = req.body;

        if (!email || !uid) {
          return res.status(400).json({ error: "Email and UID are required" });
        }

        const existingGardener = await gardenersCollection.findOne({ uid });

        if (existingGardener) {
          return res.status(200).json({ message: "Gardener already exists" });
        }

        const gardenerData = {
          name,
          email,
          photoURL: photoURL || "",
          uid,
          createdAt: new Date(),
          role: "gardener", // optional: for role management later
        };

        await gardenersCollection.insertOne(gardenerData);

        res
          .status(201)
          .json({
            message: "Gardener registered successfully",
            gardener: gardenerData,
          });
      } catch (error) {
        console.error("Error saving gardener:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    // Define route after DB connection
    app.get("/gardeners", async (req, res) => {
      try {
        const result = await gardenersCollection
          .find({ status: "Active" })
          .limit(8)
          .toArray();
        res.send(result);
      } catch (error) {
        console.error("Error fetching active gardeners:", error);
        res.status(500).send({ message: "Server Error" });
      }
    });
    app.get("/gardeners-all", async (req, res) => {
      try {
        const result = await gardenersCollection.find({}).toArray(); // Removed the status filter
        res.send(result);
      } catch (error) {
        console.error("Error fetching all gardeners:", error);
        res.status(500).send({ message: "Server Error" });
      }
    });

    // GET single gardener by ID
    app.get("/gardeners/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const gardener = await gardenersCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!gardener) {
          return res.status(404).send({ message: "Gardener not found" });
        }

        res.send(gardener);
      } catch (error) {
        console.error("Error fetching gardener details:", error);
        res.status(500).send({ message: "Failed to fetch gardener details" });
      }
    });

    // Get Top 6 Trending Tips
    app.get("/tips-show", async (req, res) => {
      const limit = parseInt(req.query.limit) || 6;

      try {
        const tips = await tipsCollection
          .find({})
          .sort({ totalLiked: -1 }) // 🟢 Trending by likes
          .limit(limit)
          .toArray();

        res.send(tips);
      } catch (error) {
        res.status(500).send({ error: "Failed to fetch trending tips" });
      }
    });

    app.post("/tips", async (req, res) => {
      const newCoffee = req.body;
      const result = await tipsCollection.insertOne(newCoffee);
      res.send(result);
    });

    app.get("/tips/public", async (req, res) => {
      try {
        const publicTips = await tipsCollection
          .find({ availability: "Public" })
          .toArray();
        res.send(publicTips);
      } catch (error) {
        console.error("Error fetching public tips:", error);
        res.status(500).send({ message: "Failed to fetch public tips" });
      }
    });

    app.get("/tips/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const tip = await tipsCollection.findOne({ _id: new ObjectId(id) });

        if (!tip) {
          return res.status(404).send({ message: "Tip not found" });
        }

        res.send(tip);
      } catch (error) {
        console.error("Error fetching tip details:", error);
        res.status(500).send({ message: "Failed to fetch tip details" });
      }
    });

    app.patch("/tips/like/:id", async (req, res) => {
      try {
        const tipId = req.params.id;
        const result = await tipsCollection.updateOne(
          { _id: new ObjectId(tipId) },
          { $inc: { totalLiked: 1 } }
        );

        if (result.modifiedCount === 0) {
          return res
            .status(404)
            .send({ message: "Tip not found or already liked" });
        }

        res.send({ message: "Like updated successfully" });
      } catch (error) {
        console.error("Error updating like:", error);
        res.status(500).send({ message: "Failed to update like" });
      }
    });

    // GET tips by user
    app.get("/api/tips", async (req, res) => {
      const userEmail = req.query.email;

      if (!userEmail) {
        return res.status(400).json({ error: "User email is required" });
      }

      try {
        const userTips = await tipsCollection
          .find({ userEmail: userEmail })
          .toArray(); // <--- missing toArray()
        res.json(userTips);
      } catch (err) {
        console.error("Error fetching tips:", err);
        res.status(500).json({ error: "Failed to fetch tips" });
      }
    });

    // In DELETE route:
    app.delete("/my-tips/:id", async (req, res) => {
      const { id } = req.params;
      await tipsCollection.deleteOne({ _id: new ObjectId(id) });
      res.sendStatus(204);
    });

    //putputput
    app.put("/api/tips/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;

        const result = await tipsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Tip not found" });
        }

        res.json({ message: "Tip updated successfully" });
      } catch (error) {
        console.error("Error updating tip:", error);
        res.status(500).json({ message: "Failed to update tip" });
      }
    });

    // Test DB connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connected to MongoDB and ready to serve!");

    // Start server only after successful connection
    app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
  }
}

run();
