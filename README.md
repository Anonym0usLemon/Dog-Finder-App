# Project Name: Dog Finder App

## Project Description:
A responsive web application that helps dog lovers find shelter dogs and potentially give them a loving home. The application includes various features to make this process enjoyable and user-friendly.

Here are the key functionalities I've implemented:

## Features 

### User Authentication 
- Users are required to log in by providing their name and email.
- Authentication is achieved by sending this information to the login endpoint, which sets an HttpOnly cookie for the user.
- The authentication cookie expires after one hour.

### Dog Search 
- After logging in, users can access the dog search page.
- Users can filter dogs based on breed, age, and location (ZIP code).
- Pagination is implemented to display results.
- Dogs can be sorted alphabetically by breed in ascending or descending order.

### Selecting Favorite Dogs
- Users can select their favorite dogs from the search results.
- The selected dogs can be saved in a list to be used for generating matches.

### Generating Matches
- Users can generate matches based on the dogs they have favorited.
- This match is created by sending the IDs of the favorited dogs to the /dogs/match endpoint.

### Filter Reset and Asc/Desc Order 
- Users can reset filters and selected dogs with a "Reset" button.
- The order of search results can be changed to ascending or descending.

### Fully Responsive Layout
- This app will work on mobile and desktop devices (350px - 2000px). 


## Usage 

1. Log in by providing your name and email.
2. Start searching for dogs using the filters.
3. Select your favorite dogs by clicking on the heart near the top right corner of their card. 
4. Generate matches with selected dogs by clicking the "match" button in the header (it's got a heart above it). 
5. Change sorting order or reset filters as needed. 


## Project Structure

- `src`: Contains the source code for the frontend.
- `components`: Reusable UI components.
- `assets`: Houses all svg icons used in the project.
- `context`: Context and login state management for user authentication.
- `utils`: Stores the PivateRoutes component which prevents users from being able to bypass the login page.
- `public`: Static files and assets (modified index.html and added 404.html to fix problems with hosting on GitHub pages). 
- `README.md`: Project documentation. 


## Technologies Used

- React for building the frontend.
- React Router for handling routes and navigation.
- Axios for making HTTP requests to the backend.
- GitHub Pages for hosting the project online.
- SCSS for responsive styling. 


## How to Run Locally

1. Clone the repository from GitHub.
2. Navigate to the project directory using your terminal.
3. Run `npm install` to install the project dependencies. 
4. Run `npm start` to start the development server and open the app in your web browser. 




