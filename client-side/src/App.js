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
import CommunitySpace from "./views/commonPages/CommunitySpace";
import Profile from "./views/patientPages/PatientProfile";
import Notification from "./views/patientPages/PatientNotification";
import ViewTherapist from "./views/patientPages/ViewTherapist";
import Message from "./views/commonPages/Message";
import Dashboard from "./views/therapistPages/Dashboard";
import Footer from "./component/Footer";
import Appointments from "./views/therapistPages/Appointments";
import NotificationTherapist from "./views/therapistPages/NotificationTherapist";
import Reports from "./views/therapistPages/Reports";
import Settings from "./views/therapistPages/Settings";
import BookAppointment from "./views/patientPages/BookAppointment";

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
              <PrivateRoute
                component={CommunitySpace}
                path="/community-space"
                exact
              />
              <PrivateRoute component={Profile} path="/profile-p" exact />
              <PrivateRoute
                component={Notification}
                path="/notification-p"
                exact
              />
              <PrivateRoute
                component={ViewTherapist}
                path="/viewtherapist/:id"
                exact
              />
              <PrivateRoute
                component={BookAppointment}
                path="/book-appointment/:id"
                exact
              />
              <Route component={Dashboard} path="/therapist-dashboard" exact />
              <Route
                component={Appointments}
                path="/therapist-appointments"
                exact
              />
              <Route
                component={NotificationTherapist}
                path="/therapist-notification"
                exact
              />
              <Route component={Reports} path="/therapist-reports" exact />
              <Route component={Settings} path="/therapist-settings" exact />
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
