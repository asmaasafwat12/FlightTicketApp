# React + Vite

# Flight Tickets App

**Flight Tickets App** is a **React** application that enables users to manage and view flight tickets. The app is built using **Vite** and follows best practices for structuring the project.

## Technologies Used

The app utilizes the following technologies:

- **React**
- **Vite**
- **React Router DOM**
- **React Hook Form**
- **Redux Toolkit**
- **Axios**
- **TypeScript**
- **Yup**
- **JSON Server**
- **JSON Server Auth**

## Project Structure

The project is organized in a structured manner with key directories:

- **components**: Contains React components.
- **redux**: Holds Redux-related files.

## Getting Started

Make sure you have the following installed:

1. **Clone the repository:**

git clone https://github.com/asmaasafwat12/FlightTicketApp.git

2. **Install dependencies:**

npm install

2. **Start the app:**

npm run dev

3. **Starts the development server along with JSON Server and JSON Server Auth:**

npm start

Open your browser and navigate to http://localhost:5173 to view the app.

View flight tickets and user data:

Flight Tickets: http://localhost:3002/flightTickets
Users: http://localhost:3002/users

Features
Authentication
Authentication is implemented using JSON Server Auth, providing login, register, and logout functionality. Guards are in place to restrict access to certain pages without logging in first.

Routing
Flight List: Display a list of flight tickets fetched from the JSON Server API using Redux Toolkit. Each ticket shows flight code, date, and capacity.

Flight Details Form: Implement a form using React Hook Form to add new flight tickets. Include fields for flight code, date, and capacity. Validate the form using Yup.

Update Flight: Enable the ability to edit existing flight tickets. Clicking on a flight opens a form with pre-filled data.

Delete Flight: Implement delete functionality with a confirmation prompt before deletion.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
