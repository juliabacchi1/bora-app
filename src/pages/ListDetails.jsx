import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CategorySection from "../components/CategorySection";
import ItemCard from "../components/ItemCard";
import { mockItems } from "../data/mockItems";
import { mockLists } from "../data/mockLists";
import {
  Eye,
  EyeClosed,
  ArrowLeftCircle,
  BellNotificationSolid,
  MoreHorizCircle,
} from "iconoir-react";

const ListDetails = () => {
  const { id } = useParams(); // recebe da URL
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [openCategories, setOpenCategories] = useState({});
  const [openUsedRecently, setOpenUsedRecently] = useState(true);

  const list = mockLists.find((l) => l.id === Number(id));
  const listName = list ? list.title : "Lista não encontrada";

  // Todas categorias únicas
  const categories = [...new Set(mockItems.map((item) => item.category))];

  // Itens selecionados para levar
  const itemsToTake = mockItems.filter((item) =>
    selectedItems.includes(item.id)
  );

  // Itens usados recentemente (aqui só peguei os primeiros 6, pode mudar a lógica)
  const usedRecently = mockItems.slice(0, 6).map((item) => ({
    ...item,
    checked: selectedItems.includes(item.id),
  }));

  // Funções toggles
  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const toggleItemSelection = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <main className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center my-4">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-[#415582] font-semibold rounded-full py-2 px-4 flex items-center justify-center gap-2"
        >
          <span className="text-xl">
            <ArrowLeftCircle className="w-5 h-5" />
          </span>{" "}
          Listas
        </button>
        <div className="flex items-center gap-2">
          <BellNotificationSolid width={20} height={20} />
          <MoreHorizCircle width={20} height={20} />
        </div>
      </div>

      {/* Nome da lista */}
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">{listName}</h1>
        <div className="flex gap-2 mt-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-200 to-green-200" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-200 to-green-200" />
        </div>
      </div>

      {list ? (
        <>
          {/* Itens para levar */}
          <section className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">Itens para levar</h2>
              <MoreHorizCircle width={20} height={20} />
            </div>
            {itemsToTake.length === 0 ? (
              <p className="italic text-gray-500">Nenhum item selecionado.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {itemsToTake.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2 p-3 rounded-lg cursor-pointer bg-[#e85252] text-white border border-red-600"
                  >
                    <input
                      type="checkbox"
                      checked={true}
                      onChange={() => toggleItemSelection(item.id)}
                      className="accent-white w-5 h-5"
                    />
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 object-contain"
                      />
                    )}
                    <span className="text-base line-through">{item.name}</span>
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* Usados recentemente */}
          <section className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
            <header
              className="flex items-center justify-between bg-[#aac8fa] px-4 py-2 cursor-pointer select-none"
              onClick={() => setOpenUsedRecently((o) => !o)}
            >
              <h2 className="text-lg font-semibold">Usados recentemente</h2>
              {openUsedRecently ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeClosed className="w-5 h-5" />
              )}
            </header>
            {openUsedRecently && (
              <div className="p-4 flex flex-col gap-2 bg-[#aac8fa] max-h-[300px] overflow-auto">
                {usedRecently.map((item) => (
                  <label
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      item.checked
                        ? "bg-[#e85252] border-red-600 text-white line-through"
                        : "bg-[#aac8fa] border-transparent text-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItemSelection(item.id)}
                      className={`accent-${
                        item.checked ? "white" : "green-600"
                      } w-5 h-5`}
                    />
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 object-contain"
                      />
                    )}
                    <span>{item.name}</span>
                  </label>
                ))}
              </div>
            )}
          </section>

          {/* Categorias */}
          {categories.map((category) => {
            const items = mockItems
              .filter((item) => item.category === category)
              .map((item) => ({
                ...item,
                checked: selectedItems.includes(item.id),
              }));

            return (
              <CategorySection
                key={category}
                category={category}
                items={items}
                isOpen={openCategories[category]}
                toggleCategory={toggleCategory}
                toggleItem={toggleItemSelection}
              />
            );
          })}
        </>
      ) : (
        <p className="text-red-600">Lista não encontrada.</p>
      )}
    </main>
  );
};

export default ListDetails;
