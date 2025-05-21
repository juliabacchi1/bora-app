import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecommendationsCarousel = ({ lists }) => {
  const navigate = useNavigate();
  const [startIndex, setStartIndex] = useState(0);

  const visibleLists = lists.slice(startIndex, startIndex + 3);

  const handleNext = () => {
    setStartIndex((prev) => (prev + 3) % lists.length);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {visibleLists.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/lista/${item.id}`)}
            className="relative rounded-xl overflow-hidden h-32 cursor-pointer group"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex pt-2">
              <p className="text-white text-md font-semibold px-2">
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      {lists.length > 3 && (
        <button
          onClick={handleNext}
          className="mt-2 text-sm text-[#415582] underline"
        >
          Ver mais recomendações →
        </button>
      )}
    </div>
  );
};

export default RecommendationsCarousel;
