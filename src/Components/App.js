import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './Auth/Auth';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Register from './Auth/Register';
import UserDonation from './User/UserDonation';
import MyDonations from './User/MyDonations';
import CompanyView from './Company/CompanyView';
import Home from './Home';
import SignIn from "./Auth/SignIn";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={SignIn} /> 
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/donations" component={UserDonation} />
            <PrivateRoute exact path="/mydonations" component={MyDonations} />
            <PrivateRoute exact path="/companyView" component={CompanyView} admin={true} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
