import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import Ethos from "./pages/Ethos";
import FounderStatement from "./pages/FounderStatement";
import BerryStandard from "./pages/BerryStandard";
import ISMS from "./pages/ISMS";
import Governance from "./pages/Governance";
import Transparency from "./pages/Transparency";
import Architecture from "./pages/Architecture";
import SubsystemExplorer from "./pages/SubsystemExplorer";
import NFTForensics from "./pages/NFTForensics";

// Import your layout components
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/ethos" element={<Ethos />} />
            <Route path="/founder" element={<FounderStatement />} />
            <Route path="/berry-standard" element={<BerryStandard />} />
            <Route path="/isms" element={<ISMS />} />
            <Route path="/governance" element={<Governance />} />
            <Route path="/transparency" element={<Transparency />} />
            <Route path="/architecture" element={<Architecture />} />
            <Route path="/explorer" element={<SubsystemExplorer />} />
            <Route path="/nft-forensics" element={<NFTForensics />} />

            {/* Default route */}
            <Route path="/" element={<Ethos />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}