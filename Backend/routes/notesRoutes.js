import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

router.post("/add", async (req, res) => {
    try {
        const { email, title, note } = req.body;
        if (!email || !title || !note) return res.status(400).json({ message: "All fields are required" });

        const newNote = new Note({ email, title, note });
        await newNote.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const { email } = req.query;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const notes = await Note.find({ email });
        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { title, note } = req.body;
        if (!title || !note) return res.status(400).json({ message: "Title and note content are required" });

        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            { title, note },
            { new: true }
        );

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(updatedNote);
    } catch (err) {
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: "Note not found" });

        await note.deleteOne();
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server Error", details: err.message });
    }
});

export default router;
