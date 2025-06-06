# AI Chat Portal

Welcome to the AI Chat Portal! This is a simple web application built with Flask that allows users to interact with an AI chatbot, search Google, and get weather information. It includes a user authentication system with login and signup pages, and persists chat histories using MongoDB.

## ✨ Features

* **User Authentication:** Secure login and signup functionalities.
* **Persistent Chat History:** Your conversations are saved and loaded from MongoDB.
* **AI Chatbot:** Interact with Google's Gemini 1.5 Flash model.
* **Weather Tool:** Get current weather for any city.
* **Google Search Tool:** Quickly perform Google searches directly from the chat.
* **Responsive Design:** Adapts to different screen sizes.
* **Radical Dark Theme:** A sleek, cyberpunk-inspired user interface.

## 🚀 Technologies Used

* **Backend:** Python (Flask)
* **Database:** MongoDB
* **AI Model:** Google Gemini 1.5 Flash
* **External APIs:** OpenWeatherMap API, Google Search (simulated via URL)
* **Frontend:** HTML, CSS, JavaScript (Fetch API)
* **Security:** `werkzeug.security` for password hashing, `python-dotenv` for environment variable management.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Python 3.8+:** You can download it from [python.org](https://www.python.org/downloads/).
* **Git:** For cloning the repository. Download from [git-scm.com](https://git-scm.com/downloads/).
* **MongoDB:**
    * **Local Installation:** Download and install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community).
    * **MongoDB Atlas (Cloud):** Recommended for easier setup and deployment. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com/).
* **API Keys:**
    * **Google Gemini API Key:** Obtain one from [Google AI Studio](https://aistudio.google.com/app/apikey).
    * **OpenWeatherMap API Key:** Register and get your key from [openweathermap.org](https://openweathermap.org/api).

## 💻 Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the Repository

Open your terminal or command prompt and clone the project:

```bash
git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME # Replace YOUR_REPO_NAME with the actual repository name you chose
```

### 2. Set Up a Python Virtual Environment

It's good practice to use a virtual environment to manage project dependencies.

```bash
python -m venv venv
```

### 3. Activate the Virtual Environment

* **On macOS/Linux:**
    ```bash
    source venv/bin/activate
    ```
* **On Windows (Command Prompt):**
    ```bash
    venv\Scripts\activate.bat
    ```
* **On Windows (PowerShell):**
    ```powershell
    .\venv\Scripts\Activate.ps1
    ```

### 4. Create and Configure the .env File

This file stores your sensitive API keys and database connection strings securely.

* Create a new file named `.env` in the root of your project directory (at the same level as `app.py`).
* Add the following content to `.env`, replacing the placeholder values with your actual keys and connection string:

    ```ini
    # .env

    # Flask Secret Key (Generate a strong, random key, e.g., using python -c "import os; print(os.urandom(24).hex())")
    FLASK_SECRET_KEY='your_strong_random_flask_secret_key_here'

    # Google Gemini API Key
    GEMINI_API_KEY='YOUR_GOOGLE_GEMINI_API_KEY_HERE'

    # OpenWeatherMap API Key
    OPENWEATHER_API_KEY='YOUR_OPENWEATHERMAP_API_KEY_HERE'

    # MongoDB Connection URI
    # For local MongoDB: MONGO_URI="mongodb://localhost:27017/"
    # For MongoDB Atlas (Cloud): MONGO_URI="mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority"
    MONGO_URI="mongodb://localhost:27017/"
    ```
    **Important:** Make sure your `.gitignore` file contains the line `.env` so this file is not committed to GitHub.

### 5. Install Python Dependencies

With your virtual environment activated, install all required libraries:

```bash
pip install Flask requests google-generativeai pymongo werkzeug python-dotenv
```

### 6. Run the Flask Application

From your project's root directory (where `app.py` is), run the Flask development server:

```bash
python app.py
```

You should see output similar to this:

```
 * Debug mode: on
 * Running on [http://127.0.0.1:5000/](http://127.0.0.1:5000/) (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: XXX-XXX-XXX
```

### 7. Access the Application

Open your web browser and navigate to:

[http://127.0.0.1:5000/](http://127.0.0.1:5000/)

You will be greeted by the AI Chat Portal landing page.

## 🚀 Usage

### Landing Page (`/`):

* Click "LOGIN" to go to the login page.
* Click "SIGNUP" to create a new account.
* Click "GO TO CHAT" to directly access the chat if you're already logged in (otherwise, it will redirect you to login).

### Signup (`/signup`):

* Enter your email, desired username, and password.
* Click "REGISTER ACCOUNT". If successful, you'll be redirected to the login page.

### Login (`/login`):

* Enter your registered username and password.
* Click "INITIATE LOGIN". On successful login, you'll be redirected to the chat page.

### Chat Page (`/chat`):

* **Sidebar:** You'll see a list of your existing chat sessions. Click on a session to load its history.
* **`+ NEW CHAT` button:** Start a fresh conversation.
* **Input Field:** Type your message or query.
* **Action Dropdown:** Select the desired action:
    * **ASK AI:** Sends your message to the Google Gemini chatbot.
    * **GET WEATHER:** Type a city name (e.g., "London", "New York") to get its current weather.
    * **SEARCH GOOGLE:** Type your search query to get a clickable Google search link.
* **SEND button:** Send your message.
* **Logout Button:** At the bottom of the sidebar, click "LOGOUT" to end your session.

## 📂 Directory Structure

```
my_chat_app/
├── app.py                 # Main Flask application logic
├── .env                   # Environment variables (API keys, secret key, DB URI) - IMPORTANT: NOT pushed to Git!
├── .gitignore             # Tells Git which files/folders to ignore (like .env, venv)
├── README.md              # This file
├── templates/             # Flask's default directory for HTML templates
│   ├── index.html         # Landing page with Login/Signup/Chat buttons
│   ├── chat.html          # The main AI chat interface
│   ├── login.html         # User login page
│   └── signup.html        # User registration page
└── static/                # Directory for static files like CSS, JavaScript, images
    ├── style.css          # Main CSS styling for the application
    ├── style2.css         # An example of an additional stylesheet
    └── # You can add your own custom CSS files or other static assets here.
```

## 🔒 Important Notes

* **Security of API Keys:** Never share your `.env` file or commit it to version control (like GitHub). The `.gitignore` file is configured to prevent this.
* **Flask Secret Key:** For a production environment, ensure `FLASK_SECRET_KEY` in your `.env` is a very long, random, and complex string.
* **MongoDB Connection:** Verify your `MONGO_URI` is correct and your MongoDB instance is running before starting the Flask app.
* **Debugging:** `app.run(debug=True)` is used for development. For production deployment, you should use a production-ready WSGI server like Gunicorn or uWSGI.
