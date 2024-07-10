import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ActivityPage from "./pages/ActivityPage";
import ArchivePage from "./pages/ArchivePage";
import NotfoundPage from "./pages/NotfoundPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ActivityPage />} />
        <Route path="/archive" element={<ArchivePage />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
