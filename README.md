EcoDonate (English)
EcoDonate is a web application designed to connect individuals who wish to donate items with a company that collects and redistributes these items. The application is built using React.js, Firebase, and Ant Design.

Features
User registration and login
Users can submit donations
Users can view and delete their donations
Admin panel for the company to view and delete all donations
Setup
Clone the repository
Install dependencies with npm install
Start the development server with npm start
Visit http://localhost:3000 in your browser

How to configure backend firebase.js file:

Go to the Firebase Console (https://console.firebase.google.com/) and create a new project.

In the Firebase project dashboard, click on the "Web" option (</>) to add a web app to your project.

Provide a name for your app and register it.

Firebase will generate a configuration object for your app. Copy the configuration object.

Create a new file named firebase.js in your project's source code directory.

Inside the firebase.js file, paste the Firebase configuration object and export it.

javascript
Copy code
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  // Paste your Firebase configuration object here
};

const app = initializeApp(firebaseConfig);

export default app;
Save the firebase.js file.

With these steps, the user will be able to create their own Firebase credentials and configure the project to connect to their Firebase project.

                    
