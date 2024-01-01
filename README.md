# React + Vite

Flight Tickets App
Flight Tickets App is a React application that allows users to manage and view flight tickets. The app is built using Vite and follows best practices for structuring the project. It incorporates React Router DOM for navigation, React Hook Form for form handling, Redux Toolkit for state management, Axios for API requests, TypeScript for static typing, Yup for form validation,JSON Server Auth and JSON Server as a mock API to simulate backend functionality.

Make sure you have the following installed:

Clone the repository: git clone https://github.com/asmaasafwat12/FlightTicketsAppTest.git
Install dependencies:npm install
Start the app: npm run dev
Starts the development server along with JSON Server and JSON Server Auth: npm start
Open your browser and navigate to http://localhost:5173 to view the app.
Open your browser and navigate to http://localhost:3002/flightTickets to view the flightTickets data.
Open your browser and navigate to http://localhost:3002/users to view the users data.

Project Structure
The project follows a structured approach with directories like components and redux. This ensures a clean and maintainable codebase.

Technologies Used
The app utilizes the following technologies:

React
Vite
React Router DOM
React Hook Form
Redux Toolkit
Axios
TypeScript
Yup
JSON Server
JSON Server Auth
Authentication is implemented using JSON Server Auth, which provides login, register, and logout functionality. Guards are in place to restrict access to certain pages without logging in first.

Routing
Flight List
Create a page to display a list of flight tickets. Fetch and display flight data from the JSON Server API using Redux Toolkit. Each flight ticket shows the flight code, date, and capacity.

Flight Details Form
Implement a form using React Hook Form to add new flight tickets. Include fields for flight code, date, and capacity. Validate the form using Yup to ensure all fields are filled, and the date is in the future.

Update Flight
Enable the ability to edit existing flight tickets. Clicking on a flight in the list opens a form with pre-filled data. Allow users to update flight code, date, and capacity.

Delete Flight
Implement a delete functionality to remove a flight ticket. Provide a confirmation prompt before deleting.

Authentication
Implement login and register using JSON Server Auth. Implement guards so that users cannot access view, create, or update pages without logging in first. Implement logout functionality.

Development
Available Scripts
In the project directory, you can run the following commands:

npm start: Runs the app in development mode.
npm test: Launches the test runner.
npm run build: Builds the app for production.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
