//import express
const express = require("express");

//import express router
const router = express.Router();

// import journal controllers
const {
  createJournal,
  updateJournal,
  deleteJournal,
  getJournal,
  getUser,
  exportJournalAsPDF,
  exportJournalAsText,
} = require("../controllers/journalController");


const { protect } = require("../middlewares/auth");


router.post("/create", protect, createJournal);
router.put("/update/:id", protect, updateJournal);
router.delete("/delete/:id", protect, deleteJournal);
router.get("/", protect, getJournal);
router.get("/getuser", protect, getUser);
router.get("/export/pdf/:id", protect, exportJournalAsPDF);
router.get("/export/text/:id", protect, exportJournalAsText);

module.exports = router;
