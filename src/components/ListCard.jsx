import React from "react";
import { PlusCircle, Trash } from "iconoir-react";

const ListCard = ({
  title,
  itensCount,
  onClick,
  isEditing,
  onDelete,
  image,
  isFirst,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-4 rounded-xl shadow-sm mb-4 cursor-pointer transition-opacity duration-300 group ${
        isEditing ? "opacity-60" : "opacity-100"
      } ${isFirst && "border-2 border-[white]"}`}
      style={{
        backgroundColor: image ? "transparent" : "#fff",
        backgroundImage: image ? `url(${image})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Camada preta com opacidade */}
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-80 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>

      {/* Conteúdo do card fica acima da camada preta */}
      <div className="relative z-10">
        {isEditing && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="absolute top-2 right-2 text-red-500 hover:text-red-700"
          >
            <Trash strokeWidth={2.5} />
          </button>
        )}

        <p className="text-xl font-bold text-white">› {title}</p>
        <span className="inline-block bg-[#e85252] text-white text-sm px-3 py-1 rounded-full my-2">
          {itensCount} itens
        </span>
        <div className="flex gap-2 mt-2">
          <img
            className="w-6 h-6 rounded-full"
            src="/images/profile.png"
            alt="Perfil"
          />
          <div className="w-6 h-6 flex items-center justify-center text-white">
            <PlusCircle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
