# 🏛️ Radically Classical Voice Assistant

A unique web-based voice assistant that blends cutting-edge AI capabilities with a timeless, elegant "radically classical" user interface. Speak your commands or questions, and receive spoken and displayed responses, all within a visually refined environment.

## ✨ Features

* **Voice Input & Output:** Interact naturally using your voice, with responses spoken back to you.
* **Dual Display:** Both your spoken question and the assistant's answer are displayed on screen.
* **Intelligent Q&A:** Powered by Google's Gemini 1.5 Flash model for conversational AI.
* **System Commands:**
    * "Open Notepad" / "Close Notepad"
    * "Open Chrome" / "Close Chrome"
    * "Open Calculator" / "Close Calculator"
* **Real-time Information:**
    * "Current time"
    * "Current weather in [City Name]" (e.g., "current weather in Guntur")
* **Web Search:** "Search [your query]" (e.g., "search best frontend frameworks")
* **"Radically Classical" UI:** A custom CSS design that aims for timeless elegance with subtle, bold twists, focusing on refined typography, harmonious layouts, and thoughtful use of color and space.

## 🎨 Radically Classical Design Philosophy

The aesthetic of this project is inspired by classical art and architecture, emphasizing symmetry, balance, clear hierarchy, and generous whitespace. The "radical" aspect comes from using this traditional foundation as a canvas for unexpected modern elements: perhaps a vibrant accent color within a muted palette, a bold typographic statement, or subtle, fluid animations that enhance the experience without being distracting. The goal is a design that feels both familiar and fresh, sophisticated yet approachable.

## 🚀 Technologies Used

### Backend:

* **Python 3:** The core programming language.
* **Flask:** A lightweight web framework for the backend server.
* **Google Generative AI (Gemini 1.5 Flash):** For natural language understanding and response generation.
* **OpenWeatherMap API:** To fetch real-time weather data.
* `psutil`, `datetime`, `requests`, `re`, `webbrowser`, `os`: Python libraries for system interactions, time, HTTP requests, regex, and opening web pages.
* `python-dotenv`: For securely loading API keys from a `.env` file.

### Frontend:

* **HTML5:** Structure of the web page.
* **CSS3:** Custom styling for the "radically classical" aesthetic.
* **JavaScript:**
    * **Web Speech API:** For Speech-to-Text (Speech Recognition) and Text-to-Speech (Speech Synthesis).
    * Fetching data from the Flask backend.

## 🛠️ Setup and Installation Guide (For Beginners)

Follow these steps carefully to get the Voice Assistant running on your local machine.

### 1. Prerequisites

Before you start, make sure you have the following installed on your computer:

* **Python 3.8 or higher:**
    * [Download Python](https://www.python.org/downloads/)
    * *Tip for Windows:* During installation, make sure to check **"Add Python to PATH."**
* **Git:** For cloning the project from GitHub.
    * [Download Git](https://git-scm.com/downloads)
* **A Text Editor / IDE:** Like VS Code, Sublime Text, or PyCharm Community.
    * [Download VS Code](https://code.visualstudio.com/download)

### 2. Create `requirements.txt`

First, you need to list your project's Python dependencies. Open your terminal or command prompt in your project's root directory (where `app.py` is) and run:

```bash
pip freeze > requirements.txt
```

### 3. Clone the Repository

Open your terminal or command prompt. Navigate to where you want to save your project (e.g., your Documents or Desktop folder).

```bash
cd path/to/your/desired/directory
```
Now, clone the project from GitHub:

```bash
git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
# Replace 'your-username/your-repo-name.git' with the actual link to your repository
```
Navigate into the cloned project directory:

```bash
cd RadicalClassicalVoiceAssistant # Or whatever you named your repository
```

### 4. Set Up a Virtual Environment

It's best practice to use a virtual environment to manage project dependencies. This keeps your project's libraries separate from your global Python installation.

```bash
# Create the virtual environment
python -m venv venv

# Activate the virtual environment
# On macOS/Linux:
# source venv/bin/activate
# On Windows:
venv\Scripts\activate
```
You'll know it's active when you see `(venv)` at the beginning of your terminal prompt.

### 5. Install Dependencies

With your virtual environment activated, install all the necessary Python libraries:

```bash
pip install -r requirements.txt
```

### 6. Get Your API Keys

This project requires API keys for Google Gemini and OpenWeatherMap.

* **Google Gemini API Key:**
    * Go to the [Google AI Studio dashboard](https://aistudio.google.com/app/apikey).
    * Sign in with your Google account.
    * Click "Create API key in new project" or reuse an existing one.
    * Copy the generated API key.
* **OpenWeatherMap API Key:**
    * Go to [OpenWeatherMap](https://openweathermap.org/api) and sign up for a free account.
    * Once logged in, go to the "API keys" tab in your profile.
    * You'll see a default key, or you can generate a new one. Copy this key.

*Note: It might take a few minutes (or sometimes longer) for a new OpenWeatherMap API key to become active.*

### 7. Create the `.env` File

Create a new file named `.env` in the root directory of your project (the same folder where `app.py` is).
Open `.env` with your text editor and add your API keys like this:

```ini
GEMINI_API_KEY="YOUR_GEMINI_API_KEY_HERE"
OPENWEATHER_API_KEY="YOUR_OPENWEATHER_API_KEY_HERE"
```
**Important:**

* Replace `"YOUR_GEMINI_API_KEY_HERE"` and `"YOUR_OPENWEATHER_API_KEY_HERE"` with the actual keys you obtained.
* Do not include spaces around the `=` sign.
* Never commit your `.env` file to Git! It's already included in your `.gitignore` file to prevent this.

### 8. Run the Flask Application

With your virtual environment still activated, run the Flask application:

```bash
python app.py
```
You should see output similar to this in your terminal:

```
 * Serving Flask app 'app'
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment.
Use a production WSGI server instead.
 * Running on [http://127.0.0.1:5000](http://127.0.0.1:5000)
Press CTRL+C to quit
```

### 9. Access the Voice Assistant

Open your web browser (Chrome, Firefox, Edge, etc.) and go to the following address:

[http://127.0.0.1:5000/](http://127.0.0.1:5000/)

You should now see the "Radically Classical Voice Assistant" interface!

### 10. Interact with the Assistant

* Click the "Speak" button.
* Allow microphone access if prompted by your browser.
* Speak your question or command (e.g., "Hello", "What is the current time?", "Current weather in Guntur", "Open Notepad", "Search cat videos").
* Your question and the assistant's answer will appear on the screen, and the assistant will speak its response.

## 📂 Project Structure

```
RadicalClassicalVoiceAssistant/
├── .env                # Stores your API keys (DO NOT commit to Git!)
├── .gitignore          # Specifies files/folders to ignore in Git
├── app.py              # Flask backend application
|
├── static/             # Static files (CSS, JavaScript, images)
│   |--style.css        # Custom CSS for the "radically classical" design
│   │-- script.js        # Frontend JavaScript for voice interaction and API calls  
│   
│       
└── templates/
    └── index.html      # Frontend HTML structure
```

## 🤝 Contributing

Contributions are welcome! If you have ideas for improvements, new features, or bug fixes, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature X'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Create a Pull Request.

## 📄 License

This project is open source and available under the MIT License.
