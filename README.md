## Basic requirements:

- [x] The user can see a list of the devices with the relevant data
- [x] The user can see the details of a device on a single page
- [x] The user can see a list of the vulnerabilities with the relevant data
- [x] The user can see the details of a vulnerability on a single page

## Advanced requirements for senior developers:

- [x] The lists of the devices and vulnerabilities are sortable
- [x] The lists of the devices and vulnerabilities can be exported as CSV
- [x] The Entries in a lists can be selected, so that only the selected entries are exported
- [x] The sorting of the lists is maintained after a page reload

## Project Structure

- `src/` - Contains the source code of the project
- `src/components/` - Contains the components of the project
- `src//api/` - Contains the API calls, each file represents a different endpoint with different hooks,
  the hooks use tansctack/react-query to handle the data fetching and caching for 5 min, the hooks also handle the error and loading states.
  Also the we use zo to validate the data from the API.
- `src/pages/` - Contains the pages of the project
- `server/` - Contains the server code

## How to run the project

1. Clone the repository
2. Run `npm install` in the root directory
3. Run `npm start-all` in the root directory
4. Open `http://localhost:5173` in your browser

Alternatively, you can run the server and the client separately:

1. Run `npm run dev` in the root directory
2. Run `npm run start:server` in the root directory

client will run on `http://localhost:5173` and the server will run on `http://localhost:8000`

## Engine Versions

This project requires the following engine versions:

- Node.js: 21.5.0 or later
- npm: 10.2.5 or later

## How to run the tests

1. Run `npm test` in the root directory

## Technologies used

### Backend

- Express

### Frontend

- Vite
- React/Typescript
- Tailwind CSS
- Tanstack/react-query
- Zod
- React Router
- React Testing Library
- Vitest

## Description

We have 3 main pages in the project:

- Home page: `/`
- Devices page: `/devices` and Vulnerabilities page: `/vulnerabilities`
  Has a table where user can select the entries and export them as CSV and sort them by clicking on the headers, the sorting is maintained after a page reload by adding the sorting state to the URL.
  For the Devices page, the user can click on the device row to navigate to the device page.
- Device page: `/devices/:id` shows the details of a device and the vulnerabilities associated with it.

I added some basic tests and styling for the components, just to show how I would test/style the project.
Visually it could be improved for example adding chips for the Severity/Exploit Present with different color or snackbar for the export actions instead of the alert.
Also accessibility could be improved by adding aria-labels to the tables and buttons, just focused on semantic HTML for now.

At least from the doc it was a bit unclear how the BE should implement the endpoint `/devices/:id/vulnerabilities`
since the data structure seem not to have a direct relationship between devices and vulnerabilities,
so I just created a new list `deviceVulnerabilities`.
