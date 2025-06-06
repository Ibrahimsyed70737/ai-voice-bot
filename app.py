from flask import Flask, render_template, jsonify, request
import os
import google.generativeai as genai
import datetime
import psutil
import requests
import re
import webbrowser
from dotenv import load_dotenv # Import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__) # Use __app_id if defined, otherwise Flask(__name__)

# Configure the Google Generative AI model
# IMPORTANT: Use os.getenv() to retrieve API keys from environment variables.
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create the GenerativeModel instance with specified safety settings and generation configuration.
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash", # Using the Gemini 1.5 Flash model for fast responses.
    safety_settings=[
        # Configure safety thresholds to block potentially harmful content.
        {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
        {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    ],
    generation_config={
        # Set generation parameters for model output.
        "temperature": 1, # Controls randomness of output. Higher values mean more random.
        "top_p": 0.95,    # Nucleus sampling: filters out low probability tokens.
        "top_k": 64,      # Top-k sampling: considers only the top k most likely tokens.
        "max_output_tokens": 8192, # Maximum number of tokens to generate.
        "response_mime_type": "text/plain", # Ensure response is plain text.
    },
)

# Start a chat session with initial history.
# This chat_session maintains context for the conversation.
# For a multi-user application, you would need a mechanism to manage
# separate chat sessions for each connected user (e.g., using Flask sessions or a database).
chat_session = model.start_chat(
    history=[
        {"role": "user", "parts": ["hi..\n"]},
        {"role": "model", "parts": ["Hi! How can I help you today? \n"]},
    ]
)

# Function to fetch weather information from OpenWeatherMap.
def get_weather(city):
    # IMPORTANT: Retrieve API key from environment variables.
    api_key = os.getenv("OPENWEATHER_API_KEY")
    base_url = "http://api.openweathermap.org/data/2.5/weather?"
    complete_url = base_url + "appid=" + api_key + "&q=" + city + "&units=metric"

    try:
        response = requests.get(complete_url)
        response.raise_for_status() # Raise an HTTPError for bad responses (4xx or 5xx)
        data = response.json()

        if data["cod"] != "404": # Check if city was found
            main = data["main"]
            weather_desc = data["weather"][0]["description"]
            temp = main["temp"]
            return f"The current temperature in {city} is {temp}°C with {weather_desc}."
        else:
            return "City not found."
    except requests.exceptions.RequestException as e:
        # Handle network-related errors (e.g., connection issues, timeouts)
        print(f"Weather API error: {e}")
        return "Sorry, I couldn't fetch the weather information right now due to a network issue."
    except Exception as e:
        # Catch any other unexpected errors during API call or JSON parsing
        print(f"An unexpected error occurred in get_weather: {e}")
        return "An unexpected error occurred while getting weather information."

# --- Flask Routes ---

@app.route('/')
def index():
    """
    Renders the main HTML page of the voice assistant.
    Flask's render_template looks for 'index.html' in the 'templates' folder.
    """
    return render_template('index.html')

@app.route('/process_text', methods=['POST'])
def process_text():
    """
    API endpoint to receive text input from the frontend, process it,
    and return a text response. This function handles various commands
    and integrates with the Generative AI model.
    """
    data = request.get_json() # Get JSON data sent from the frontend
    user_input = data.get('user_input', '').lower() # Extract user input and convert to lowercase
    assistant_response_text = ""

    print(f"Received user input: '{user_input}'") # Log the received input for debugging

    try:
        # Check for specific commands in the user input
        if "hello" in user_input:
            assistant_response_text = "Hi, how can I help you?"
        elif "stop the process" in user_input:
            # This command is handled on the frontend to stop speech recognition.
            # Here, it just provides a textual response indicating server-side limitations.
            assistant_response_text = "I cannot stop the server process from here, but I can cease listening on the frontend."
        elif "open notepad" in user_input:
            # Execute system command to open Notepad (Windows specific)
            os.system("notepad")
            assistant_response_text = "Opening Notepad."
        elif "current time" in user_input:
            # Get and format the current time
            current_time = datetime.datetime.now().strftime("%H:%M:%S")
            assistant_response_text = f"The current time is {current_time}"
        elif "current weather" in user_input:
            # Use regex to extract city name from the input
            city_match = re.search(r'current weather in ([a-zA-Z\s]+)', user_input, re.IGNORECASE)
            if city_match:
                city = city_match.group(1).strip()
                assistant_response_text = get_weather(city) # Call weather function
            else:
                assistant_response_text = "Please specify a city for weather information."
        elif "close notepad" in user_input:
            # Iterate through running processes to find and terminate Notepad
            for proc in psutil.process_iter():
                if "notepad" in proc.name().lower():
                    proc.kill()
                    assistant_response_text = "Notepad closed."
                    break # Exit loop once found and killed
            else: # This 'else' block executes if the loop completes without a 'break'
                assistant_response_text = "Notepad is not running."
        elif "open chrome" in user_input:
            # Open Chrome browser (command varies by OS)
            # 'start chrome' for Windows, 'google-chrome' for Linux, 'open -a "Google Chrome"' for macOS
            os.system("start chrome")
            assistant_response_text = "Opening Chrome."
        elif "close chrome" in user_input:
            # Iterate through running processes to find and terminate Chrome
            for proc in psutil.process_iter():
                if "chrome" in proc.name().lower():
                    proc.kill()
                    assistant_response_text = "Chrome closed."
                    break
            else:
                assistant_response_text = "Chrome is not running."
        elif "open calculator" in user_input:
            # Open Calculator (command varies by OS)
            # 'calc' for Windows, 'gnome-calculator' or 'kcalc' for Linux, 'open -a Calculator' for macOS
            os.system("calc")
            assistant_response_text = "Opening Calculator."
        elif "close calculator" in user_input:
            # Iterate through running processes to find and terminate Calculator
            for proc in psutil.process_iter():
                if "calculator" in proc.name().lower():
                    proc.kill()
                    assistant_response_text = "Calculator closed."
                    break
            else:
                assistant_response_text = "Calculator is not running."
        elif "search" in user_input:
            # Perform a Google search
            query = user_input.replace("search", "").strip()
            if query:
                search_url = f"https://www.google.com/search?q={query}"
                webbrowser.open(search_url) # Opens URL in default browser
                assistant_response_text = f"Here are the search results for {query}"
            else:
                assistant_response_text = "What would you like me to search for?"
        else:
            # If no specific command, send the input to the Generative AI model
            # Requesting output limited to 100 words for conciseness
            response = chat_session.send_message(f"Limit to 100 words\n{user_input}")
            assistant_response_text = response.text

    except Exception as e:
        # Catch any general exceptions during command processing
        print(f"An error occurred during processing: {e}")
        assistant_response_text = "An unexpected error occurred while processing your request."

    # Return the assistant's response as JSON
    return jsonify({"assistant_response": assistant_response_text})

if __name__ == '__main__':
    # Run the Flask application.
    # debug=True: Enables debug mode, providing detailed error messages and auto-reloading.
    # threaded=True: Allows the Flask development server to handle multiple requests concurrently,
    # which is useful for non-blocking operations like waiting for AI responses.
    # For production, a more robust WSGI server (e.g., Gunicorn, uWSGI) should be used.
    app.run(debug=True, threaded=True)