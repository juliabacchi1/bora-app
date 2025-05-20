import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CategorySection from "../components/CategorySection";
import { mockItems } from "../data/mockItems";
import { mockLists } from "../data/mockLists";
import {
  ArrowLeftCircle,
  BellNotificationSolid,
  MoreHorizCircle,
} from "iconoir-react";

const ListDetails = () => {
  const { id } = useParams(); // recebe da URL
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [openCategories, setOpenCategories] = useState({});

  const list = mockLists.find((l) => l.id === Number(id));
  const listName = list ? list.title : "Lista não encontrada";

  const categories = [...new Set(mockItems.map((item) => item.category))];

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

      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">{listName}</h1>
        <div className="flex gap-2 mt-2">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-200 to-green-200" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-200 to-green-200" />
        </div>
      </div>

      {list ? (
        <>
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Itens destacados por:
            </h2>
            <p className="italic text-gray-600">Usados recentemente</p>
          </section>

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
