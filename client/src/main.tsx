import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import EnsemblePage from "./pages/EnsemblesPage.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import MusiciansPage from "./pages/MusiciansPage.tsx";
import EnsembleDetailPage from "./pages/EnsembleDetailPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import Header from "./components/Header.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/ensembles" element={<EnsemblePage />} />
        <Route path="/ensemble/:ensembleId" element={<EnsembleDetailPage />} />
        <Route path="/musicians" element={<MusiciansPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
