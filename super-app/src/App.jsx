import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Genre from "./pages/Genre";
import { Toaster } from "react-hot-toast";
import Widget from "./pages/Widget";
import Movies from "./pages/Movies";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Genre" element={<Genre />}></Route>
          <Route path="/Widget" element={<Widget />}></Route>
          <Route path="/Movies" element={<Movies />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
