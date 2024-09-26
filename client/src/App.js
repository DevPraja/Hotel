import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Switch instead of Routes
import Homescreen from './screen/Homescreen';
import Bookingscrren from './screen/Bookingscrren';
import Registerscreen from './screen/Registerscreen';
import Loginscreen from './screen/Loginscreen';
import PaymentSuccess from './screen/PaymentSuccess';
import Profilescreen from './screen/Profilescreen';
import AdminScreen from './screen/Adminscreen';
import LandingScreen from './screen/LandingScreen';
import MyBookingScreen from "./screen/MyBookingScreen";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Router>
        <Switch> {/* Use Switch instead of Routes */}
          <Route path="/home" component={Homescreen} />
          <Route path="/book/:roomid/:fromdate/:todate" component={Bookingscrren} />
          <Route path="/register" component={Registerscreen} />
          <Route path="/login" component={Loginscreen} />
          <Route path="/paymentsuccess"  exact component={PaymentSuccess} />
          <Route path="/profile"  exact component={Profilescreen} />
          <Route path="/admin"  exact component={AdminScreen} />
          <Route path="/bookingscreen"  exact component={MyBookingScreen} />
          <Route path="/"  exact component={LandingScreen} />




        </Switch>
      </Router>
    </div>
  );
}

export default App;
