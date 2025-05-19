# Kindr Kram

## Description

Kindr Kram is a web-based gifting and contribution platform for new parents. It allows a parent (or parents) to create a wishlist of baby items they need, and then invite friends and family to contribute money toward those items in a pooled way. Instead of receiving duplicate gifts or items they don’t need, parents can list exactly what they want, and loved ones can chip in together to fund those specific goals. For example, a parent might add a high-priced stroller (e.g. \€300) to their list, and multiple friends can each contribute a portion of that amount until it’s fully funded. This group gifting approach ensures that even expensive necessities can be covered through collective effort.

This project was initially created as a way to practice and showcase my full-stack development skills, and it was briefly used in a real-world setting by my family. The application features two user perspectives: on one side, the parent users manage their baby registry (adding items and viewing contributions), and on the other side, friends and family can view the registry and make contributions. kinddr.kram aims to make the gifting process more flexible and meaningful – parents get the items they truly need, and contributors feel involved by helping achieve those goals rather than giving random presents.

## Features

* **Personal Baby Registry:** Parents can create a personal baby registry (wishlist) of desired items. Each item entry can include details like the item name, a description or photo, and the target amount needed for that item (the “goal” or price). This gives guests a clear idea of what is needed. (For example, items might range from small essentials like baby clothes to big-ticket gear like cribs or strollers.)
* **Group Gifting Contributions:** Friends and family can contribute funds toward any item on the list. Multiple people are able to pool their contributions to collectively fund an expensive item. Guests may choose to contribute any amount they wish (or even fully fund an item) rather than being tied to buying the whole item themselves. This makes it easy to support the new parents even with a modest budget.
* **Progress Tracking:** The platform tracks the total amount contributed to each item and displays the funding progress (e.g. showing how much of the target has been raised for an item). Contributors can see which items are partially or fully funded before deciding where to contribute. Once an item’s goal amount is reached, it can be marked as **Fully Funded**, and further contributions to that item are disabled. This ensures clarity on which gifts still need funding.
* **User Accounts and Security:** Parents have secure user accounts to manage their registry. They can sign up/login to access an admin dashboard for their baby’s list, where they can add new items, edit or remove items, and monitor contributions. (User authentication is handled via a secure mechanism – e.g. hashed passwords and possibly JWT tokens – so that only authorized parents can modify their registry.)

## Technologies Used

Kindr Kram is built with a modern **MERN**-style tech stack, combining a React frontend with a Node/Express backend and MongoDB database. The key technologies and frameworks include:

* **React** – A JavaScript library for building the frontend user interface. The app uses React (bootstrapped with Create React App) to create a dynamic, single-page application where users can view the registry and contribute. React Router is used for client-side routing (for example, to navigate between a registry view and an admin dashboard). The component-based structure of React makes it easy to manage UI for the list of items and forms for contributions.
* **Node.js & Express** – The backend is built on Node.js, using the Express framework to create a RESTful API. Express handles routes for operations like fetching the list of registry items, adding new items, and posting contribution transactions. It also serves the frontend in production (serving the React build files) and provides APIs that the React app calls. The choice of Node/Express allows fast development and matches well with the JavaScript stack on the client side.
* **MongoDB** – A NoSQL document-oriented database is used to store data for the application. MongoDB was chosen for its flexibility and ease of use with JavaScript via JSON-like documents. The database holds collections such as **Items** (each item in a registry, including its details and funding status) and **Contributions** (records of each contribution made, if tracked separately). In this project, an ODM like Mongoose is used to define schemas and interact with MongoDB in an object-oriented way. MongoDB’s schema-less nature made it easy to iterate on the data model during development.
* **Mongoose ODM** – (Assumed as part of the stack) Mongoose is likely used to define the schema for items and contributions and to simplify database queries. For example, an Item schema might include fields for name, description, image URL, targetAmount, and currentAmountFunded, plus an array of contributor entries or references. Mongoose also handles validation (ensuring contribution amounts don’t exceed the target, etc.) and provides a convenient interface for the Express routes to read/write data.
* **Authentication & Security Libraries** – The app uses standard libraries for security in a Node environment. This includes **bcrypt** (for hashing user passwords) and **JSON Web Tokens (JWT)** for authentication tokens if users log in. Passwords are never stored in plain text, and protected routes (like parent registry management) require a valid JWT. Additionally, **cors** middleware is enabled on the Express server to allow the React dev server to communicate during development, and environment variables are managed via **dotenv** to keep secrets (like DB URI or API keys) out of the code.
* **Other Utilities & Libraries:** On the frontend, libraries like **Axios** (for HTTP requests) or the Fetch API are used to communicate with the backend API. You might also find UI/component libraries or styling solutions; for example, **styled-components** or plain CSS modules for styling the React components. Date/time utilities like **Day.js** could be used if any date formatting is needed (e.g., showing contribution dates), and form handling libraries or validation libraries might be in use for the contribution form. On the backend, aside from Express, we use middleware like body-parser (now part of Express) to parse JSON request bodies, and possibly a library for input validation/sanitization to ensure data integrity. The project is set up to be easily extensible thanks to this modular tech stack.

## Getting Started

To get a local copy of Kindr Kram up and running on your machine, please follow these steps. You will need **Node.js** (and npm) installed, as well as access to a **MongoDB** database (either a local MongoDB server or a cloud MongoDB URI).

### Installation

1. **Clone the repository:** Clone this GitHub repo to your local machine using git. In a terminal, run:

   ```bash
   git clone https://github.com/mpagels/kindr.kram.git
   ```

   Then change directory into the project folder:

   ```bash
   cd kindr.kram
   ```

2. **Install backend dependencies:** Navigate to the backend folder and install the required Node packages using npm:

   ```bash
   cd backend
   npm install
   ```

   This will download all server-side dependencies (Express, Mongoose, etc.) as listed in `backend/package.json`.

3. **Install frontend dependencies:** Next, open another terminal (or navigate back to the project root) and install the React app’s dependencies:

   ```bash
   cd frontend
   npm install
   ```

   This will install all client-side packages (React, React Router, etc.) as defined in `frontend/package.json`.

4. **Configure environment variables:** Kindr Kram requires certain environment-specific settings. In the **backend** directory, create a file named `.env` (not tracked in git) and add the necessary configuration values. For example:

   ```dotenv
   MONGODB_URI=mongodb://localhost:27017/kindr_db   # your MongoDB connection string
   JWT_SECRET=your_jwt_secret_key                   # secret key for JWT signing (if using auth)
   ```

   * Replace `MONGODB_URI` with your own Mongo connection string. If you have MongoDB running locally with no auth, the example above will work (it will use a database named “kindr\_db”). Otherwise, you can use a MongoDB Atlas URI.
   * Set `JWT_SECRET` to any random string (used to sign tokens for authentication).

5. **Initialize the database (optional):** The application will create the necessary collections in MongoDB on the fly when you add items or contributions. There is no separate SQL schema or migration to run. However, you can pre-create an index or test connection by running the server (next step) and ensuring it connects to your MongoDB. If the app requires any default data or admin account, you might need to insert that manually or adjust the code (check the documentation or code comments). In most cases, you can proceed without any pre-seeding.

### Usage

1. **Start the backend server:** In the `backend` directory, start the Node.js server. For development, it’s recommended to use nodemon (if configured) so that the server reloads on code changes. You can run:

   ```bash
   npm run dev
   ```

   This might be defined in the `package.json` to use nodemon. If not, simply run `node server.js` or `npm start` to launch the server. By default, the backend will listen on a port (commonly **5000** or as specified in code or `.env` as `PORT`). You should see console logs indicating the server is running (e.g., “Server started on port 5000” and a successful connection to MongoDB).
2. **Start the frontend development server:** Open a new terminal and navigate to the `frontend` folder. Run the React app with:

   ```bash
   npm start
   ```

   This launches the React development server on **[http://localhost:3000](http://localhost:3000)** (the default port for Create React App). The app will automatically open in your web browser, or you can navigate to the URL manually. In development, the React app is likely configured to proxy API requests to the backend (e.g., via a proxy setting in `package.json`), so any calls from the React app to `/api/...` will be forwarded to the Express server on port 5000.
3. **Use the application:** Once both servers are running, you can interact with Kindr Kram in your browser. If you are a new user (parent), you may need to register an account (if the app has a sign-up page) or there might be a default admin login provided. After logging in, you can begin adding items to your baby registry via the web interface. Use the “Add Item” form to specify the item name, description, and goal amount. The new item should appear on your list.
