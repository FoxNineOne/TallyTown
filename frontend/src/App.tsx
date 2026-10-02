import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Progress from "./pages/ProgressPage.tsx";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
