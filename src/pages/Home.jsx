import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ListCard from "../components/ListCard";
import { recommendedLists } from "../data/recommendedLists";
import RecommendationsCarousel from "../components/RecommendationsCarousel";

import { PlusCircleSolid } from "iconoir-react";

const Home = () => {
  const navigate = useNavigate();

  const urubici = recommendedLists.find((item) => item.id === "urubici");

  const [listas, setListas] = useState(() => {
    const saved = localStorage.getItem("listas");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "urubici",
            title: urubici.title,
            image: urubici.image,
            itensCount: urubici.items.length,
            items: urubici.items,
          },
        ];
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteLista = (id) => {
    const updatedListas = listas.filter((lista) => lista.id !== id);
    setListas(updatedListas);
    localStorage.setItem("listas", JSON.stringify(updatedListas));
  };

  // Recarrega do localStorage ao montar o componente
  useEffect(() => {
    const saved = localStorage.getItem("listas");
    if (saved) {
      setListas(JSON.parse(saved));
    }
  }, []);

  // Salva sempre que mudar
  useEffect(() => {
    localStorage.setItem("listas", JSON.stringify(listas));
  }, [listas]);

  return (
    <main className="p-4">
      <div className="flex justify-between items-center my-3">
        <img
          src="/logo.png"
          alt="Logo Bora!"
          className="h-12 px-4 scale-150 -translate-y-1 object-contain"
        />
        <button onClick={() => setIsEditing((prev) => !prev)} className="p-2">
          {isEditing ? "Ok" : "Editar"}
        </button>
      </div>
      <h2 className="text-lg text-center font-semibold mb-3">Minhas listas</h2>

      {/* renderiza as listas dinâmicas */}
      {listas.map((lista, index) => (
        <ListCard
          key={lista.id}
          title={lista.title}
          image={lista.image}
          // calcula na hora quantos itens estão selecionados
          itensCount={
            lista.itensCount ??
            lista.items?.filter((item) => item.selected).length ??
            0
          }
          onClick={() => !isEditing && navigate(`/lista/${lista.id}`)}
          isEditing={isEditing}
          onDelete={() => handleDeleteLista(lista.id)}
          isFirst={index === 0}
        />
      ))}

      {/* cria nova lista */}
      <button
        onClick={() => {
          const novaLista = {
            id: Date.now().toString(),
            title: "Nova Lista",
            image: "/images/padrao.png",
            itensCount: 0,
            items: [],
          };
          const novasListas = [...listas, novaLista];
          localStorage.setItem("listas", JSON.stringify(novasListas)); // salva todas
          localStorage.setItem("selectedList", JSON.stringify(novaLista));
          setListas(novasListas);
        }}
        className="w-full bg-white text-[#415582] font-semibold py-2 px-4 rounded-xl border mt-4 flex items-center justify-center gap-2"
      >
        <span className="text-xl">
          <PlusCircleSolid width={20} height={20} />
        </span>{" "}
        Nova lista
      </button>

      {/* recomendação de listas */}
      <h2 className="text-lg font-semibold px-1 mt-6 mb-2">
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
