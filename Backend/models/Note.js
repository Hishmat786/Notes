import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    email: { type: String, required: true },
    title: { type: String, required: true },
    note: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Note", NoteSchema);
