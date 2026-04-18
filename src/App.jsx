import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Import your pages

import Ethos from "./pages/Ethos";
// import FounderStatement from "./pages/FounderStatement";
//import BerryStandard from "./pages/BerryStandard";
//import ISMS from "./pages/ISMS";
//import Governance from "./pages/Governance";
//import Transparency from "./pages/Transparency";
//import Architecture from "./pages/Architecture";
//import SubsystemExplorer from "./pages/SubsystemExplorer";
//import NFTForensics from "./pages/NFTForensics";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <Routes>
  <Route path="/" element={<Ethos />} />
</Routes>
        </div>

      </div>
    </Router>
  );
}