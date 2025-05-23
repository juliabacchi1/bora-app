import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ListDetails from "./pages/ListDetails";
import { recommendedLists } from "./data/recommendedLists";

function App() {
  useEffect(() => {
    const listasSalvas = JSON.parse(localStorage.getItem("listas"));
    if (!listasSalvas || listasSalvas.length === 0) {
      const urubici = recommendedLists.find((item) => item.id === "urubici");
      const listaDefault = [
        {
          id: "urubici",
          title: urubici.title,
          image: urubici.image,
          itensCount: urubici.items.length,
          items: urubici.items,
        },
      ];
      localStorage.setItem("listas", JSON.stringify(listaDefault));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#ffffff] flex justify-center">
      <div className="w-full max-w-[600px] bg-[#e8e6e5] min-h-screen shadow-xl px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lista/:id" element={<ListDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
