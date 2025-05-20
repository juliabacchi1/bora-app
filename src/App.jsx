import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListDetails from "./pages/ListDetails";

function App() {
  return (
    <div className="min-h-screen bg-[#e4e0df] flex justify-center">
      <div className="w-[390px] bg-[#e4e0df] min-h-screen shadow-xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista/:id" element={<ListDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
