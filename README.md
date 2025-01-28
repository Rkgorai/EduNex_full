# EduNex

EduNex is a platform designed to bridge the gap between students, professionals, and high-quality educational resources in India. It connects users to personalized tutors, courses, and skill development programs, enhancing accessibility and efficiency in learning. The project is especially beneficial for users in Tier 2 and Tier 3 cities, addressing the growing demand for upskilling and quality education.

## Features

- **Personalized Learning**: Matches users with tutors and courses based on location, skill level, and aspirations.
- **Search and Filter Options**: Advanced search bar and dynamic filters to refine results for courses and tutors.
- **Real-time Updates**: Displays up-to-date information on courses, tutors, and events.
- **Event Discovery**: Enables users to find and register for webinars, hackathons, and skill-development programs.

## Technologies Used

### Frontend
- **React**: For building a dynamic and user-friendly interface.
- **CSS Grid**: For creating a seamless grid-based layout to display courses and resources.
- **Real-time Filtering**: Implements responsive search and filter functionality.

### Backend
- **Flask**: A lightweight Python web framework for backend development.
- **RESTful API**: Provides endpoints to fetch real-time data for courses, tutors, and events.
- **JSON Sanitization**: Ensures clean and consistent data handling to prevent errors.

### Database
- Integrated with a database that stores information about courses, tutors, and events.

## Project Setup

### Prerequisites
- Python 3.x
- Node.js and npm
- Flask
- React

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Rkgorai/EduNex_full.git
   ```

2. Navigate to the project directory:
   ```bash
   cd EduNex_full
   ```

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Install frontend dependencies:
   ```bash
   cd EduNex_full
   npm install
   ```

5. Run:
   ```bash
   python run.py
   ```

## Usage

1. Navigate to the web application in your browser (typically at `http://localhost:3000` for React frontend).
2. Search for courses, tutors, or events using the search bar or filters.
3. View detailed information and register for events or connect with tutors.
