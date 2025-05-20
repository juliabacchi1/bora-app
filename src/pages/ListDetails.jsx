import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

          {categories.map((category) => (
            <section key={category} className="mb-4 border rounded-lg">
              <header
                onClick={() => toggleCategory(category)}
                className="cursor-pointer bg-[#415582] text-white px-4 py-2 rounded-t-lg flex justify-between items-center select-none"
              >
                <span>{category}</span>
                <span>
                  {openCategories[category] ? (
                    <Eye className="w-5 h-5" />
                  ) : (
                    <EyeClosed className="w-5 h-5" />
                  )}
                </span>
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
