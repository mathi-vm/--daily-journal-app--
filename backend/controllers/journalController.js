const asyncHandler = require("express-async-handler");
const journal = require("../models/journalModel");
const User = require("../models/userModel");
const fs = require("fs");
const pdf = require("html-pdf");
const path = require("path");
const express = require("express");
const app = express();

//create journal
const createJournal = asyncHandler(async (req, res) => {
  //console.log(req.user);

  if (!req.body.title) {
    res.status(400);
    throw new Error("please enter all the text fields");
  }
  const {
    title,
    mood,
    date,
    tags,
    media,
    content,
    savedlocation,
    location,
  } = req.body;

  const Journal = await journal.create({
    title,
    mood,
    date,
    location,
    savedlocation,
    content,
    media,
    tags,

    user: req.user.id,
  });
  res.status(201).send(Journal);
});

//get journal
const getJournal = asyncHandler(async (req, res) => {
  const Journal = await journal.find({ user: req.user.id });
  res.status(200).send(Journal);
});

//update journal
const updateJournal = asyncHandler(async (req, res) => {
  const Journal = await journal.findById(req.params.id);
  if (!Journal) {
    res.status(400);
    throw new Error("Journal note found");
  }
  if (!req.user) {
    res.status(401);
    throw new Error("user not found");
  }
  if (Journal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const updateJournal = await journal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).send(updateJournal);
});


//deletejournal
const deleteJournal = asyncHandler(async (req, res) => {
  const Journal = await journal.findById(req.params.id);
  if (!Journal) {
    res.status(400);
    throw new Error("journal not found");
  }
  //check if such user is there
  if (!req.user) {
    res.status(400);
    throw new Error("user not authorized");
  }
  if (Journal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("user not authorized");
  }

  const deleteJournal = await journal.deleteOne({ _id: req.params.id });
  res.status(200).send({ id: req.params.id });
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Find user in database by ID
  const user = await User.findById(userId).select("-password");

  // Check if user exists
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Respond with user data
  res.status(200).json({
    user,
    message: "User data retrieved successfully",
  });
});

// Export journal as PDF
const exportJournalAsPDF = asyncHandler(async (req, res) => {
  const Journal = await journal.findById(req.params.id);

  if (!Journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  const html = `
      <h1>${Journal.title}</h1>
      <p>${Journal.content}</p>
      <p>Tags: ${Journal.tags.join(", ")}</p>
      <p>Mood: ${Journal.mood}</p>
      <p>location: ${Journal.location}</p>
      <p>Date: ${Journal.date}</p>
      <p>savedlocation: ${Journal.savedlocation}</p>
      <p>media: ${Journal.media}</p>
    `;

  pdf.create(html).toStream((err, stream) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.setHeader("Content-type", "application/pdf");
    stream.pipe(res);
  });
});

// Export journal as Text
const exportJournalAsText = asyncHandler(async (req, res) => {
  const Journal = await journal.findById(req.params.id);

  if (!Journal) {
    res.status(404);
    throw new Error("Journal not found");
  }

  const text = `
      Title: ${Journal.title}\n
      Content: ${Journal.content}\n
      Tags: ${Journal.tags.join(", ")}\n
      Mood: ${Journal.mood}\n
      Date: ${Journal.date}\n
      location:${Journal.location}\n
    `;

  res.setHeader("Content-Disposition", 'attachment; filename="journal.txt"');
  res.setHeader("Content-Type", "text/plain");
  res.send(text);
});

module.exports = {
  createJournal,
  getJournal,
  updateJournal,
  deleteJournal,
  getUser,
  exportJournalAsPDF,
  exportJournalAsText,
};
