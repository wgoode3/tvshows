const mongoose = require("mongoose");

const TvShowSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [2, "Title must be 2 characters or longer"]
    },
    Genre: {
        type: String,
        required: [true, "Genre is required"]
    },
    Network: {
        type: String,
        required: [true, "Network is required"]
    }
}, {timestamps: true});

mongoose.model("TvShow", TvShowSchema);