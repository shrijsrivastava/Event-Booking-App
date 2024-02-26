import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./pages/Login/Login";
// import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import HomePage from "./pages/HomePage/HomePage";
import PaymentPage from "./pages/Payment/Payment";
import EventDetailPage from "./pages/EventDetailPage/EventDetailPage";
import Events from "./pages/Events/Events";
import BookedEvent from "./pages/BookedEvent/BookedEvent";
import NotFound from "./pages/404Page/NotFound";
// import { DataContext } from "./context/dataContext";

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginScreen />}></Route>
            {/* <Route path="/SignIn" element={<SignIn />}></Route> */}
            <Route path="/SignUp" element={<SignUp />}></Route>
            <Route path="/HomePage" element={<HomePage />}></Route>
            <Route path="/Payment/:eventId" element={<PaymentPage />}></Route>
            <Route path="/EventsDetailPage/:eventId" element={<EventDetailPage />} />
            <Route path="/Events" element={<Events />}></Route>
            <Route path="/BookedEvent" element={<BookedEvent />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
