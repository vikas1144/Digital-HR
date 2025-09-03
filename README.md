# Digital-HR
Digital HR is a modern web application designed to streamline and automate human resource management for organizations. It provides modules for employee management, attendance tracking, recruitment, sentiment analysis, and more, with a user-friendly interface and robust backend.

## Features

- **Employee Management**: Directory, profile pages, document management, leave management, and salary administration.
- **Attendance Tracking**: Calendar-based attendance, analytics, and reporting.
- **Recruitment**: Job posting, applicant tracking, and resume maker.
- **Sentiment Analysis**: Visualize employee feedback and sentiment.
- **Admin Dashboard**: Manage jobs, employees, and organizational modules.
- **Modern UI**: Built with React and Vite for fast, responsive user experience.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: (MongoDB, Firebase)
- **Other**: ESLint, Context API

## Project Structure

```
Digital-hr/
  backend/         # Node.js/Express backend
    routes/        # API routes (applicants, sentiment)
    index.js       # Entry point
  frontend1/
    digi-hr/
      src/
        components/    # React components
        context/       # Context providers
        elements/      # UI elements
        pages/         # Main pages
        assets/        # Images, videos
      public/          # Static files
      package.json     # Frontend dependencies
      vite.config.js   # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js & npm installed

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/vikas1144/digital-hr.git
   cd digital-hr
   ```
2. **Install backend dependencies**
   ```sh
   cd backend
   npm install
   ```
3. **Install frontend dependencies**
   ```sh
   cd ../frontend1/digi-hr
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```sh
   cd backend
   npm start
   ```
2. **Start the frontend**
   ```sh
   cd ../frontend1/digi-hr
   npm run dev
   ```
3. **Access the app**
   Open your browser and go to `http://localhost:5173` (or the port shown in the terminal).

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Contact

For questions or feedback, contact [vikaskashyap0762156@gmail.com].


