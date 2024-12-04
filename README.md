# TripTease

## Project Description

**TripTease** is a collaborative travel planning platform designed to streamline the group travel planning process. Organizing trips with friends, family, or colleagues can become chaotic and stressful with disagreements and indecision about where to go, what to do, or where to eat. TripTease solves this problem by offering a shared space where users can suggest trip ideas and vote on them in real-time. This ensures that decisions are made democratically, reducing friction and making trip planning more enjoyable.

The platform addresses the frustration of planning group trips by centralizing suggestions, organizing activities by location, and enabling users to upvote or downvote activities. TripTease helps groups reach consensus smoothly, preventing endless discussions and confusion over plans.

## Product Vision

We envision **TripTease** as the go-to platform for planning group trips, making collaboration simple, transparent, and stress-free. The platform ensures equal input from all members while focusing on enhancing the travel experience by streamlining decision-making. By giving users the ability to suggest activities, vote on them, and mark them as completed, TripTease will empower users to enjoy the trip planning process rather than dread it. Our MVP focuses on core features that enable trip creation, activity suggestion, and voting, with plans for post-trip summaries and rating systems.

## Team Members

* [Anthony Uriarte](https://github.com/anthonyuri)
* [Aditi Kanaujia](https://github.com/akana3866)
* [Frederick Rohn](https://github.com/frederickrohn)
* [Harrison Wong](https://github.com/harrisonmangitwong)
* [Shay Butler](https://github.com/hawk-2414)

## Project History

**TripTease** was conceived as a response to the difficulties many people face when organizing group trips. Whether planning vacations with friends, reunions with family, or corporate retreats, discussions often become frustrating, resulting in confusion and indecision. Our team sought to build a platform that centralizes the planning process, giving every participant a clear and structured way to contribute to the trip.

The platform's journey began with this idea: to solve group decision-making challenges. Over time, **TripTease** evolved into a feature-rich platform, offering suggestions, real-time voting, and easy-to-use tools that bring joy back into trip planning.

## How to Contribute?
Visit the following link to see the requirements you must follow to contribute to the project.
[CONTRIBUTING.md](./CONTRIBUTING.md)

## Building & Testing

### Clone Repo
Start by cloning the project repository to your local machine:
`git clone https://github.com/agiledev-students-fall2024/4-final-project-trip-tease.git`

### How to Run the Application (Frontend & Backend Integrated Together)

To run the application locally, start by setting up both the backend and frontend. First, navigate to the `backend` directory, install the dependencies by running `npm install` (only required once), and then start the backend server using `npm start`. This will launch the backend server on port 3002. 

Next, move to the `frontend` directory, install its dependencies by running `npm install`, and start the frontend server with `npm start`. This will launch the frontend server on port 3000. 

Once both servers are running, you can access the application by visiting `http://localhost:3000` for the frontend and `http://localhost:3002` for the backend.

### How to use the application for testing purposes

You can either sign up, and create a new user profile based on your own information. Or, you can use one of our premade accounts (with pre-populated fields) for testing. Here is a premade user you could use to test the application:

* username: john_doe
* password: password123

### Important Notes

- The frontend is configured to proxy API requests to the backend server running on port 3002. This proxy configuration, specified in the `frontend/package.json` file, routes requests from the frontend at `http://localhost:3000` to the backend on `http://localhost:3002`. This setup helps handle API requests seamlessly without requiring additional CORS configurations.

- Ensure that the `backend` directory contains a `.env` with environment variable `PORT=3002`

- The back-end contains a lot of redundant routes that aren't implemented or needed on the front-end. This is on purpose, some are written in case more front-end features should be implemented in the future, the rest are just useful for locally testing/using the overall functionality of the back-end.

### Testing

To run the tests for our code, follow these simple steps:
1. navigate to the backend: `cd back-end`
2. run the tests + show the coverage report: `npm run coverage`
3. Validation tests show up in the console (in back-end/validators)




