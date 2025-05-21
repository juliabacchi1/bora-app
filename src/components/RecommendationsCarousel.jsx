import React, { useState } from "react";
import { PlusCircleSolid } from "iconoir-react";

const RecommendationsCarousel = ({ lists, listas, setListas }) => {
  const [startIndex] = useState(0); // mantém fixo, não precisamos mais rotacionar
  const visibleLists = lists.slice(startIndex, startIndex + 3);

  const handleAddRecommended = (item) => {
    const novaLista = {
      id: Date.now().toString(),
      title: item.title,
      itensCount: item.items.length,
      items: item.items,
    };
    setListas([...listas, novaLista]);
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
            <p className="text-white text-sm font-semibold">{item.title}</p>
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
