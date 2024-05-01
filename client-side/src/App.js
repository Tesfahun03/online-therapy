import './App.css';
import NavBar from './component/NavBar';
import Home from './views/commonPages/Home';
import { AuthProvider } from './context/AuthContext';
import LoginPatient from './views/patientPages/LoginPatient';
import RegisterPatient from './views/patientPages/RegisterPatient';
import LandingPage from './views/patientPages/LandingPage';
import {BrowserRouter as Router, Route,Switch} from "react-router-dom";
import LoginTherapist from './views/therapistPages/LoginTherapist';
import RegisterTherapist from './views/therapistPages/RegisterTherapist';
import TherapistHome from './views/therapistPages/TherapistHome';
import Footer from './component/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar/>
          <Switch>
            <Route component={Home} path="/" exact/>
            <Route component={LoginPatient} path="/login-p" exact/>
            <Route component={RegisterPatient} path="/register-p" exact/>
            <Route component={LandingPage} path="/home-p" exact/>
            <Route component={LoginTherapist} path="/login-d" exact/>            
            <Route component={RegisterTherapist} path="/register-d" exact/>                        
            <Route component={TherapistHome} path="/therapist-home" exact/>                        
          </Switch>
          <Footer/>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
