import NavBar from "./component/NavBar";
import Home from "./views/commonPages/Home";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import LoginPatient from "./views/patientPages/LoginPatient";
import RegisterPatient from "./views/patientPages/RegisterPatient";
import LandingPage from "./views/patientPages/LandingPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginTherapist from "./views/therapistPages/LoginTherapist";
import RegisterTherapist from "./views/therapistPages/RegisterTherapist";
import TherapistHome from "./views/therapistPages/TherapistHome";
import CommunitySpace from "./views/commonPages/CommunitySpace";
import Profile from "./views/commonPages/Profile";
import Notification from "./views/commonPages/Notification";
import ViewTherapist from "./views/patientPages/ViewTherapist";
import Message from "./views/commonPages/Message";
import Footer from "./component/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <div className="content">
            <Switch>
              <PrivateRoute
                component={Notification}
                path="/notification"
                exact
              />
              <Route component={Home} path="/" exact />
              <Route component={LoginPatient} path="/login-p" exact />
              <Route component={RegisterPatient} path="/register-p" exact />
              <PrivateRoute component={LandingPage} path="/home-p" exact />
              <Route component={LoginTherapist} path="/login-d" exact />
              <Route component={RegisterTherapist} path="/register-d" exact />
              <Route component={TherapistHome} path="/therapist-home" exact />
              <PrivateRoute
                component={CommunitySpace}
                path="/community-space"
                exact
              />
              <PrivateRoute component={Profile} path="/profile" exact />
              <PrivateRoute
                component={Notification}
                path="/notification"
                exact
              />
              <PrivateRoute
                component={ViewTherapist}
                path="/viewtherapist/:id"
                exact
              />
              <PrivateRoute component={Message} path="/message/:id" exact />
            </Switch>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
