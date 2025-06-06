# 🏛️ AI Resume Screening & Candidate Ranking System

This is a full-stack web application designed to help recruiters and hiring managers efficiently filter and rank resumes based on a job description. It uses a React frontend for the user interface and a Python Flask backend to handle heavy-lifting tasks like PDF text extraction and resume matching using TF-IDF and Cosine Similarity.

## ✨ Features

* **Job Description Input:** Easily paste or type in the job description for the role.
* **Multiple Resume Uploads:** Upload one or more PDF resume files.
* **Automated Text Extraction:** Backend processes PDF files to extract readable text.
* **Intelligent Matching:** Utilizes TF-IDF (Term Frequency-Inverse Document Frequency) and Cosine Similarity to calculate a relevance score between each resume and the job description.
* **Ranked Results:** Displays resumes ranked by their match score, helping you identify the most suitable candidates quickly.
* **User-Friendly Interface:** A clean and responsive React UI for a smooth experience.

## 🚀 Technologies Used

### Frontend:

* **React:** A JavaScript library for building user interfaces.
* **HTML & CSS:** For structuring and styling the web application.

### Backend:

* **Python:** The programming language for the backend logic.
* **Flask:** A lightweight Python web framework for building the API.
* **Flask-CORS:** For handling Cross-Origin Request Sharing, allowing the frontend to communicate with the backend.
* **PyPDF2:** A Python library for reading and extracting text from PDF files.
* **scikit-learn:** A machine learning library for TF-IDF vectorization and Cosine Similarity calculation.
* **Pandas:** For data manipulation, especially for handling and presenting the results.

## 📁 Project Structure

The project is organized into two main top-level folders, each containing its own application:

```
resume-analyzer/
├── resume-analyzer-backend/   # Python Flask backend
│   ├── app.py                 # Flask application logic
│   ├── requirements.txt       # Python dependencies
│   └── venv/                  # Python Virtual Environment (ignored by Git)
│   └── ... (other Python files/folders)
├── resume-analyzer-plain-css/ # React Frontend
│   ├── public/                # Public assets (e.g., index.html)
│   ├── src/                   # React source code (App.js, index.js, etc.)
│   │   ├── App.js             # Main React component
│   │   └── index.css          # Main CSS file
│   ├── node_modules/          # Node.js dependencies (ignored by Git)
│   ├── package.json           # Frontend dependencies and scripts
│   └── ... (other React/Node files)
├── .gitignore                 # Specifies files/folders to ignore in Git
└── README.md                  # This file
```

## ⚙️ Prerequisites

Before you begin, ensure you have the following software installed on your machine:

* **Git:** For cloning the repository.
    * [Download Git](https://git-scm.com/downloads)
* **Node.js & npm (or Yarn):** For running the React frontend. Node.js comes with npm.
    * **Crucial:** Download the LTS (Long Term Support) version from [nodejs.org](https://nodejs.org/). This ensures compatibility.
* **Python (3.7+ recommended):** For running the Flask backend.
    * [Download Python](https://www.python.org/downloads/)

## 🚀 Setup and Installation

Follow these steps carefully to get the application running on your local machine.

### 1. Clone the Repository

First, clone this entire repository to your local machine:

```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/resume-analyzer.git](https://github.com/YOUR_GITHUB_USERNAME/resume-analyzer.git)
cd resume-analyzer
```
(Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username.)

### 2. Backend Setup (Python Flask)

Navigate into the backend directory and install its dependencies.

```bash
cd resume-analyzer-backend
```

#### a. Create and Activate a Python Virtual Environment (Recommended)

It's good practice to use a virtual environment to manage dependencies for your Python projects separately.

```bash
python -m venv venv
```
* **On Windows:**
    ```bash
    .\venv\Scripts\activate
    ```
* **On macOS/Linux:**
    ```bash
    source venv/bin/activate
    ```

#### b. Install Python Dependencies

```bash
pip install -r requirements.txt
```
(If `requirements.txt` is missing, you might need to generate it from the original backend project using `pip freeze > requirements.txt` after installing `Flask Flask-CORS PyPDF2 scikit-learn pandas`.)

#### c. Run the Flask Backend Server

```bash
python app.py
```
Leave this terminal window open. You should see output indicating that the Flask server is running, typically on `http://127.0.0.1:5000` or `http://localhost:5000`.

### 3. Frontend Setup (React)

Open a **NEW** terminal window. Navigate into the frontend directory and install its dependencies.

```bash
# Assuming you are in the root 'resume-analyzer' folder:
cd ..
cd resume-analyzer-plain-css
```

#### a. Install Node.js Dependencies

```bash
npm install
```
This will install all the necessary packages for your React application.

#### b. Run the React Frontend Development Server

```bash
npm start
```
Leave this terminal window open. This will compile your React application and typically open it automatically in your default web browser at `http://localhost:3000`. If it doesn't open automatically, manually navigate to this URL in your browser.

## 👨‍💻 Usage

Once both the backend and frontend servers are running:

1.  Open your web browser and go to `http://localhost:3000`.
2.  **Enter the Job Description:** Paste or type the job description into the designated text area.
3.  **Upload Resumes:** Click the "Upload Resumes" button and select one or more PDF files from your computer.
4.  **Analyze:** Click the "Analyze Resumes" button.
5.  **View Results:** The application will display a list of uploaded resumes with their calculated match scores (percentage) and indicate whether they are a "match" (score >= 70%).

## ⚠️ Important Notes

* **PDF Parsing:** This application uses `PyPDF2` on the backend for PDF text extraction. While generally effective, the accuracy of text extraction can vary depending on the complexity, formatting, and embedded fonts of the PDF files.
* **Match Accuracy:** The TF-IDF and Cosine Similarity algorithm is a statistical method for text similarity. Its accuracy depends heavily on the quality of the job description and the content of the resumes.
* **Local Development:** Both the frontend and backend must be running simultaneously on your local machine for the application to function.
* **CORS:** The Flask backend is configured with `Flask-CORS` to allow cross-origin requests from the React frontend during development.

## 🤝 Contributing

If you'd like to contribute to this project, feel free to fork the repository, make your changes, and submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
