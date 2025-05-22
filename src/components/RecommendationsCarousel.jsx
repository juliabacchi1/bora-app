import React, { useState, useMemo } from "react";
import { PlusCircleSolid } from "iconoir-react";

const RecommendationsCarousel = ({ lists, listas, setListas }) => {
  // Sorteia um índice inicial aleatório a cada montagem
  const [startIndex] = useState(() => {
    const maxStart = Math.max(0, lists.length - 3);
    return Math.floor(Math.random() * (maxStart + 1));
  });

  // Garante que só pega 3 recomendações a partir do índice sorteado
  const visibleLists = useMemo(() => {
    return lists.slice(startIndex, startIndex + 3);
  }, [lists, startIndex]);

  const handleAddRecommended = (item) => {
    const novaLista = {
      id: Date.now().toString(),
      title: item.title,
      image: item.image,
      items: item.items,
      itensCount: item.items.length,
    };

    setListas((prev) => {
      const atualizadas = [...prev, novaLista];
      localStorage.setItem("listas", JSON.stringify(atualizadas));
      return atualizadas;
    });
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {visibleLists.map((item) => (
        <div
          key={item.id}
          className="relative rounded-xl overflow-hidden h-40 group"
        >
          <img
            src={item.image}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-3">
            <p className="text-white text-md font-semibold">{item.title}</p>
            <button
              onClick={() => handleAddRecommended(item)}
              className="self-center bg-opacity-80 p-1 rounded-full hover:bg-opacity-100 transition"
              title="Adicionar lista"
            >
              <PlusCircleSolid
                width={40}
                height={40}
                className="text-[white] text-center"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsCarousel;
