import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockItems } from "../data/mockItems";
import { mockLists } from "../data/mockLists";

const ListDetails = () => {
  const { id } = useParams(); // recebe da URL
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [openCategories, setOpenCategories] = useState({});

  const list = mockLists.find((l) => l.id === id);
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
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Voltar para Home
      </button>

      <h1 className="text-2xl font-bold mb-6">{listName}</h1>

      {list ? (
        <>
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              Itens destacados por:
            </h2>
            <p className="italic text-gray-600">Usados recentemente</p>
          </section>

          {categories.map((category) => (
            <section key={category} className="mb-4 border rounded-lg">
              <header
                onClick={() => toggleCategory(category)}
                className="cursor-pointer bg-[#415582] text-white px-4 py-2 rounded-t-lg flex justify-between items-center select-none"
              >
                <span>{category}</span>
                <span>{openCategories[category] ? "−" : "+"}</span>
              </header>

              {openCategories[category] && (
                <div className="p-4 bg-white">
                  {mockItems
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <label
                        key={item.id}
                        className="flex items-center gap-3 mb-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItemSelection(item.id)}
                          className="cursor-pointer"
                        />
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 object-contain"
                        />
                        <span>{item.name}</span>
                      </label>
                    ))}
                </div>
              )}
            </section>
          ))}
        </>
      ) : (
        <p className="text-red-600">Lista não encontrada.</p>
      )}
    </main>
  );
};

export default ListDetails;