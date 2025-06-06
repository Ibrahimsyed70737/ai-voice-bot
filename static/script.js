document.addEventListener('DOMContentLoaded', () => {
    // Get references to HTML elements
    const startListeningBtn = document.getElementById('start-listening-btn');
    const stopListeningBtn = document.getElementById('stop-listening-btn');
    const stopSpeakingBtn = document.getElementById('stop-speaking-btn'); // New: Get the stop speaking button
    const conversationLog = document.getElementById('conversation-log');
    const statusIndicator = document.getElementById('status-indicator');
    const statusMessage = document.getElementById('status-message');

    // Initialize Web Speech API components for browser-based speech recognition and synthesis
    // Use vendor prefixes for broader compatibility
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechSynthesis = window.speechSynthesis;

    let recognition; // Will hold the SpeechRecognition object
    let speaking = false; // Flag to track if the assistant is currently speaking

    // Check if SpeechRecognition is supported by the browser
    if (SpeechRecognition) {
        recognition = new SpeechRecognition();
        recognition.continuous = false; // Set to false to listen for a single, complete utterance
        recognition.lang = 'en-US'; // Set the language for recognition
        recognition.interimResults = false; // Only return final results, not interim ones
        recognition.maxAlternatives = 1; // Get only the most probable transcription result
    } else {
        // If SpeechRecognition is not supported, disable the button and inform the user
        startListeningBtn.disabled = true;
        startListeningBtn.textContent = "Speech Recognition Not Supported";
        console.error("Web Speech API (SpeechRecognition) not supported in this browser.");
        return; // Exit the script as core functionality won't work
    }

    /**
     * Appends a new message to the conversation log.
     * @param {string} sender - The sender of the message ('user' or 'assistant').
     * @param {string} text - The text content of the message.
     */
    function appendMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender); // Add 'message' and sender-specific class
        messageDiv.innerHTML = `<strong>${sender === 'user' ? 'You:' : 'Assistant:'}</strong> ${text}`;
        conversationLog.appendChild(messageDiv); // Add the message to the log
        conversationLog.scrollTop = conversationLog.scrollHeight; // Scroll to the bottom to show the latest message
    }

    /**
     * Speaks the given text using the browser's SpeechSynthesis API.
     * Manages UI state (status indicator, button enablement) during speech.
     * @param {string} text - The text to be spoken.
     */
    function speakText(text) {
        if (SpeechSynthesis) {
            speaking = true; // Set speaking flag to true
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US'; // Set language for synthesis
            utterance.rate = 1; // Normal speaking rate
            utterance.pitch = 1; // Normal pitch

            // Event handler for when speech starts
            utterance.onstart = () => {
                statusMessage.textContent = "Speaking...";
                statusIndicator.classList.remove('hidden'); // Show status indicator
                startListeningBtn.disabled = true; // Disable start button while speaking
                stopListeningBtn.classList.add('hidden'); // Hide stop listening button
                stopSpeakingBtn.classList.remove('hidden'); // Show stop speaking button
            };

            // Event handler for when speech ends
            utterance.onend = () => {
                speaking = false; // Reset speaking flag
                statusIndicator.classList.add('hidden'); // Hide status indicator
                startListeningBtn.disabled = false; // Re-enable start button
                stopListeningBtn.classList.add('hidden'); // Ensure stop listening button is hidden
                stopSpeakingBtn.classList.add('hidden'); // Hide stop speaking button
            };

            // Event handler for speech synthesis errors
            utterance.onerror = (event) => {
                console.error('SpeechSynthesisUtterance.onerror', event);
                speaking = false;
                statusIndicator.classList.add('hidden');
                startListeningBtn.disabled = false;
                stopListeningBtn.classList.add('hidden');
                stopSpeakingBtn.classList.add('hidden');
                appendMessage('assistant', 'Sorry, I had trouble speaking that.');
            };

            SpeechSynthesis.speak(utterance); // Start speaking
        } else {
            console.warn("Web Speech API (SpeechSynthesis) not supported in this browser.");
            // If synthesis is not supported, just display the text and re-enable button
            appendMessage('assistant', text);
            startListeningBtn.disabled = false;
            stopListeningBtn.classList.add('hidden');
            stopSpeakingBtn.classList.add('hidden');
        }
    }

    // Event listener for the "Start Listening" button click
    startListeningBtn.addEventListener('click', () => {
        if (speaking) {
            // If the assistant is currently speaking, stop it before starting recognition
            SpeechSynthesis.cancel();
            speaking = false;
        }

        statusMessage.textContent = "Listening...";
        statusIndicator.classList.remove('hidden'); // Show "Listening..." status
        startListeningBtn.disabled = true; // Disable the start button
        stopListeningBtn.classList.remove('hidden'); // Show the stop listening button
        stopSpeakingBtn.classList.add('hidden'); // Hide stop speaking button
        recognition.start(); // Start the speech recognition process
    });

    // Event listener for the "Stop Listening" button click
    stopListeningBtn.addEventListener('click', () => {
        recognition.stop(); // Manually stop the speech recognition
        statusMessage.textContent = "Stopped listening.";
        statusIndicator.classList.add('hidden'); // Hide status indicator
        startListeningBtn.disabled = false; // Re-enable the start button
        stopListeningBtn.classList.add('hidden'); // Hide the stop listening button
        stopSpeakingBtn.classList.add('hidden'); // Ensure stop speaking button is hidden
    });

    // New: Event listener for the "Stop Speaking" button click
    stopSpeakingBtn.addEventListener('click', () => {
        SpeechSynthesis.cancel(); // Stop any ongoing speech synthesis
        speaking = false; // Reset speaking flag
        statusMessage.textContent = "Speaking stopped.";
        statusIndicator.classList.add('hidden'); // Hide status indicator
        startListeningBtn.disabled = false; // Re-enable start button
        stopListeningBtn.classList.add('hidden'); // Hide stop listening button
        stopSpeakingBtn.classList.add('hidden'); // Hide stop speaking button
    });

    // Event handler for when speech is successfully recognized
    recognition.onresult = async (event) => {
        const transcript = event.results[0][0].transcript; // Get the transcribed text
        console.log('You said:', transcript);
        appendMessage('user', transcript); // Display the user's question in the chat log

        statusMessage.textContent = "Thinking...";
        statusIndicator.classList.remove('hidden'); // Show "Thinking..." status
        stopListeningBtn.classList.add('hidden'); // Hide stop listening button while processing/speaking
        stopSpeakingBtn.classList.add('hidden'); // Hide stop speaking button

        try {
            // Send the transcribed text to the Flask backend for processing
            const response = await fetch('/process_text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: transcript }) // Send user input as JSON
            });

            const data = await response.json(); // Parse the JSON response from the backend
            const assistantResponse = data.assistant_response; // Extract the assistant's text response

            appendMessage('assistant', assistantResponse); // Display the assistant's answer
            speakText(assistantResponse); // Make the assistant speak the answer

        } catch (error) {
            console.error('Error communicating with backend:', error);
            appendMessage('assistant', 'Sorry, I could not connect to the service. Please check your connection.');
            statusIndicator.classList.add('hidden');
            startListeningBtn.disabled = false;
            stopListeningBtn.classList.add('hidden');
            stopSpeakingBtn.classList.add('hidden');
        }
    };

    // Event handler for when speech recognition ends (e.g., silence, or manual stop)
    recognition.onend = () => {
        // Only hide status and re-enable buttons if not currently speaking
        if (!speaking) {
            statusIndicator.classList.add('hidden');
            startListeningBtn.disabled = false;
            stopListeningBtn.classList.add('hidden');
            stopSpeakingBtn.classList.add('hidden');
        }
    };

    // Event handler for speech recognition errors
    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        statusIndicator.classList.add('hidden');
        startListeningBtn.disabled = false;
        stopListeningBtn.classList.add('hidden'); // Hide stop listening button on error
        stopSpeakingBtn.classList.add('hidden'); // Hide stop speaking button on error
        let errorMessage = "Sorry, I couldn't understand that.";
        if (event.error === 'not-allowed') {
            errorMessage = "Microphone access denied. Please allow microphone access in your browser settings.";
        } else if (event.error === 'no-speech') {
            errorMessage = "No speech detected. Please try again.";
        }
        appendMessage('assistant', errorMessage);
    };

    // Initial setup: Display and speak a welcome message when the page loads
    appendMessage('assistant', 'Hi! How can I help you today?');
    speakText('Hi! How can I help you today?');
});
