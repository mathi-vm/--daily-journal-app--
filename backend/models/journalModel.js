const mongoose = require("mongoose");

const journalSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    savedlocation: {
      type: String,
    },
    media: [
      {
        type: String,
        ref: "Media",
      },
    ],

    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    mood: {
      type: String,
      enum: ["😊", "😢", "😠", "😃", "😰", "😴", "😐", "😲"],
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        formattedAddress: {
          type: String,
          required: true,
          latitude: { type: Number },
          longitude: { type: Number },
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Journal", journalSchema);
