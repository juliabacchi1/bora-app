import React from "react";

const ListCard = ({ title, itensCount, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-4 rounded-xl shadow-sm border-2 border-[#415582] mb-4 cursor-pointer"
    >
      <p className="text-xl font-bold">› {title}</p>
      <span className="inline-block bg-[#e85252] text-white text-sm px-3 py-1 rounded-full my-2">
        {itensCount} itens
      </span>
      <div className="flex gap-2 mt-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-200 to-green-200" />
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-200 to-green-200" />
        <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
          +
        </div>
      </div>
    </div>
  );
};

export default ListCard;
