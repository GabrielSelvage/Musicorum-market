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
        type: Array,
    },
    level: {
        type: String,
    },
    tags: {
        type: Array,
    },
    teacher: {
        type: String,
    }
});

const Lesson = model("Lesson", lessonSchema);

module.exports = Lesson;
