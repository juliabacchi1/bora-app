import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ListCard from "../components/ListCard";
import { recommendedLists } from "../data/recommendedLists";
import RecommendationsCarousel from "../components/RecommendationsCarousel";

import {
  PlusCircleSolid,
  MoreHorizCircle,
  BellNotificationSolid,
} from "iconoir-react";

const Home = () => {
  const navigate = useNavigate();

  // Pegando Urubici da recomendação
  const urubici = recommendedLists.find((item) => item.id === "urubici");

  // Estado inicial com Urubici
const [listas, setListas] = useState(() => {
  const saved = localStorage.getItem("listas");
  return saved
    ? JSON.parse(saved)
    : [
        {
          id: "urubici",
          title: urubici.title,
          itensCount: urubici.items.length,
          items: urubici.items,
        },
      ];
});


  useEffect(() => {
    localStorage.setItem("listas", JSON.stringify(listas));
  }, [listas]);


  return (
    <main className="p-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Bora!</h1>
        <div className="flex items-center gap-2">
          <BellNotificationSolid width={20} height={20} />
          <MoreHorizCircle width={20} height={20} />
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Minhas listas</h2>

      {/* renderiza as listas dinâmicas */}
      {listas.map((lista) => (
        <ListCard
          key={lista.id}
          id={lista.id}
          title={lista.title}
          itensCount={lista.itensCount}
          onClick={() => navigate(`/lista/${lista.id}`)}
        />
      ))}

      {/* criar nova lista */}
      <button
        onClick={() => {
          const novaLista = {
            id: Date.now().toString(),
            title: "Nova Lista",
            itensCount: 0,
            items: [],
          };
          const novasListas = [...listas, novaLista];
          localStorage.setItem("listas", JSON.stringify(novasListas)); // 🔴 salva todas
          localStorage.setItem("selectedList", JSON.stringify(novaLista)); // opcional
          setListas(novasListas);
          navigate(`/lista/${novaLista.id}`);
        }}
        className="w-full bg-white text-[#415582] font-semibold py-2 px-4 rounded-xl border mt-4 flex items-center justify-center gap-2"
      >
        <span className="text-xl">
          <PlusCircleSolid width={20} height={20} />
        </span>{" "}
        Nova lista
      </button>

      {/* recomendação de listas */}
      <h2 className="text-lg font-semibold mt-6 mb-2">
        Recomendações de listas
      </h2>
      <RecommendationsCarousel
        lists={recommendedLists}
        listas={listas}
        setListas={setListas}
      />
    </main>
  );
};

export default Home;
