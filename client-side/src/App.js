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
import ProfilePatient from "./views/patientPages/ProfilePatient";
import NotificationPatient from "./views/patientPages/NotificationPatient";
import ViewTherapist from "./views/patientPages/ViewTherapist";
import Message from "./views/commonPages/Message";
import Dashboard from "./views/therapistPages/Dashboard";
import Footer from "./component/Footer";
import Appointments from "./views/therapistPages/Appointments";
import NotificationTherapist from "./views/therapistPages/NotificationTherapist";
import Reports from "./views/therapistPages/Reports";
import Settings from "./views/therapistPages/Settings";
import BookAppointment from "./views/patientPages/BookAppointment";
import VideoChat from "./views/therapistPages/VideoChatTherapist";
import VideoChatPatient from "./views/patientPages/VideoChatPatient";

function App() {

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <div className="content">
            <Switch>
              <Route component={Home} path="/" exact />
              <Route component={LoginPatient} path="/login-p" exact />
              <Route component={RegisterPatient} path="/register-p" exact />
              <PrivateRoute component={LandingPage} path="/home-p" exact />
              <Route component={LoginTherapist} path="/login-t" exact />
              <Route component={RegisterTherapist} path="/register-t" exact />
              <PrivateRoute
                component={CommunitySpace}
                path="/community-space"
                exact
              />
              <PrivateRoute component={ProfilePatient} path="/profile-p" exact />
              <PrivateRoute
                component={NotificationPatient}
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
                path="/bookappointment/:id"
                exact
              />
              <Route component={Dashboard} path="/dashboard-t" exact />
              <Route
                component={Appointments}
                path="/appointments-t"
                exact
              />
              <Route
                component={NotificationTherapist}
                path="/notification-t"
                exact
              />
              <Route component={Reports} path="/reports-t" exact />
              <Route component={Settings} path="/settings-t" exact />
              <PrivateRoute component={Message} path="/message/:id" exact />
              <PrivateRoute component={VideoChat} path="/videochat-t/:id" exact/>
              <PrivateRoute component={VideoChatPatient} path="/videochat-p/:id" exact/>
            </Switch>
          </div>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
