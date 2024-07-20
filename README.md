# --daily-journal-app--

# journal-app
Create/Edit Journal Entries: Add and modify journal entries with rich text content.
Mood Tracker: Track daily moods with a mood tracking feature.
Tagging System: Organize entries with tags.
Location Tracking: Save and display the location of journal entries.
Profile Management: View and edit user profile information.



Technologies Used:

Frontend:

React
Bootstrap for styling
React Router for navigation
Axios for API requests
React Icons for icons

User Authentication

Register a new user or log in with existing credentials.
Upon successful login, you will be redirected to the main journal page.
Managing Journal Entries


Add New Entry:
Click the "Add" button in the navbar.
Fill in the title, content, and other fields.
Click "Save" to add the entry.


Edit Entry:
Click the "Edit" button on a journal entry.
Modify the fields as needed.
Click "Save" to update the entry.

Delete Entry:
Click the "Delete" button on a journal entry to remove it.


Profile Management
Click on the profile icon in the navbar.

Code Overview

Backend
models/: Contains the Mongoose models for User and Journal entries.
routes/: Contains the Express routes for user and journal operations.
controllers/: Contains the logic for handling requests.
middleware/: Contains middleware for authentication and error handling.
Frontend
src/components/: Contains reusable components like Navbar, TagInput, MediaPicker, Moodtracker, and LocationTracker.
src/pages/: Contains the main pages of the application like Home, AddEditNote, and Profile.
src/App.js: The main entry point of the application.
src/index.js: The entry point for rendering the React app.


Backend:

Node.js
Express.js
MongoDB with Mongoose
JSON Web Tokens (JWT) for authentication
