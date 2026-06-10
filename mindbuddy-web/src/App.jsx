import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Explore from "./components/Explore";
import Chat from "./components/Chat";
import Mood from "./components/Mood";
import Wellness from "./components/Wellness";

import Exercises from "./components/Excercises";
import Travel from "./components/Travel";
import Journal from "./components/Journal"

import Activities from "./components/Activites"

import Goals from "./components/Goal"

import Health from "./components/Health"


import Sleep from "./components/Sleep"




function Progress() {
  return <h2>📊 Your Progress</h2>;
}

export default function App() {
  return (
    <BrowserRouter>

      <div className="app-container">

        <Navbar />

        <div className="content">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/Explore"
              element={<Explore />}
            />

            <Route
              path="/Chat"
              element={<Chat />}
            />

            <Route
              path="/Mood"
              element={<Mood />}
            />

            <Route
              path="/Exercises"
              element={<Exercises />}
            />

            <Route
              path="/Journal"
              element={<Journal/>}
            />

            <Route
              path="/Goals"
              element={<Goals />}
            />

            <Route
              path="/Sleep"
              element={<Sleep />}
            />

            <Route
              path="/Activities"
              element={<Activities />}
            />

            <Route
              path="/Travel"
              element={<Travel />}
            />

            <Route
              path="/Health"
              element={<Health />}
            />


            <Route
              path="/Progress"
              element={<Progress />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}