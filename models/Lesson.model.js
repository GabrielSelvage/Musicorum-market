const { Schema, model } = require("mongoose");

const lessonSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    videoUrl: {
        type: String,
    },
    imagePreviewUrl: {
        type: String,
    },
    course: {
        type: String,
    },
    level: {
        type: String,
    },
    tags: {
        type: Array,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true });

const Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;
