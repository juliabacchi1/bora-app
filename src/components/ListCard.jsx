import React from "react";
import { PlusCircle, Trash } from "iconoir-react";

const ListCard = ({ title, itensCount, onClick, isEditing, onDelete }) => {
  return (
    <div
      onClick={onClick}
      className={`relative bg-white p-4 rounded-xl shadow-sm border-2 border-[#415582] mb-4 cursor-pointer transition-opacity duration-300 ${
        isEditing ? "opacity-60" : "opacity-100"
      }`}
    >
      {/* Ícone de excluir (só aparece se estiver em modo de edição) */}
      {isEditing && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // evita clicar e navegar
            onDelete();
          }}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          <Trash />
        </button>
      )}

      <p className="text-xl font-bold">› {title}</p>
      <span className="inline-block bg-[#e85252] text-white text-sm px-3 py-1 rounded-full my-2">
        {itensCount} itens
      </span>
      <div className="flex gap-2 mt-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-200 to-green-200" />
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-200 to-green-200" />
        <div className="w-6 h-6 flex items-center justify-center">
          <PlusCircle />
        </div>
      </div>
    </div>
  );
};

export default ListCard;
