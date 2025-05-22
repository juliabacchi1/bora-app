import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListaById } from "../hooks/useListaById";
import RecentlyUsed from "../components/RecentlyUsed";
import CategorySection from "../components/CategorySection";
import { mockItems } from "../data/mockItems";

import {
  ArrowLeftCircle,
  BellNotificationSolid,
  MoreHorizCircle,
  FilterListCircleSolid,
  HeartSolid,
} from "iconoir-react";

const ListDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { list, listId, listName } = useListaById(id);

  const [selectedItems, setSelectedItems] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);
  const [openUsedRecently, setOpenUsedRecently] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRecommend, setShowRecommend] = useState(false);
  const [copied, setCopied] = useState(false);

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
    const updatedSelectedItems = selectedItems.includes(itemId)
      ? selectedItems.filter((id) => id !== itemId)
      : [...selectedItems, itemId];

    setSelectedItems(updatedSelectedItems);

    // Atualiza a lista no localStorage
    const listasSalvas = JSON.parse(localStorage.getItem("listas")) || [];

    const novaLista = {
      ...list,
      items: mockItems.map((item) => ({
        ...item,
        selected: updatedSelectedItems.includes(item.id),
      })),
      itensCount: updatedSelectedItems.length, // Aqui atualiza a contagem de itens
    };

    const listasAtualizadas = listasSalvas.map((l) =>
      l.id === list.id ? novaLista : l
    );

    localStorage.setItem("listas", JSON.stringify(listasAtualizadas));
  };

  return (
    <main className="p-4">
      <div className="flex relative justify-between items-center my-3">
        <button
          onClick={() => navigate("/")}
          className="bg-white text-[#415582] font-semibold rounded-full py-2 px-4 flex items-center justify-center gap-2"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Listas
        </button>
        <div className="flex relative items-center gap-2">
          <button onClick={() => setShowNotifications((prev) => !prev)}>
            <BellNotificationSolid width={20} height={20} />
          </button>
          <button onClick={() => setShowRecommend((prev) => !prev)}>
            <MoreHorizCircle width={20} height={20} />
          </button>
        </div>

        {showNotifications && (
          <div className="absolute right-6 mt-24 py-3 px-7 bg-white rounded-xl shadow-md opacity-80 text-sm z-10">
            Sem notificações
          </div>
        )}

        {showRecommend && (
          <button
            onClick={() => {
              navigator.clipboard.writeText("https://bora-app-jet.vercel.app/");
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="absolute right-0 top-10 py-3 px-5 bg-white rounded-xl shadow-md opacity-90 text-sm z-10 flex items-center gap-2 hover:bg-pink-50 active:scale-95 transition"
          >
            <HeartSolid className="w-4 h-auto text-pink-500" />
            Recomendar a um amigo
          </button>
        )}

        {copied && (
          <div className="absolute right-0 top-28 bg-white text-xs rounded-md px-4 py-2 z-20 shadow-md animate-fadeIn">
            Link copiado!
          </div>
        )}
      </div>

      {/* Nome da lista */}
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">{listName}</h1>
        <div className="flex">
          <img
            className="w-6 h-6 rounded-full"
            src="/images/profile.png"
            alt="Perfil"
          />
        </div>
      </div>

      {list ? (
        <>
          {/* Itens para levar */}
          <section className="mb-1">
            <div className="flex items-center justify-end gap-2 mb-2">
              <h2 className="text-lg font-semibold">Itens para levar</h2>
              <FilterListCircleSolid width={20} height={20} />
            </div>
            {itemsToTake.length === 0 ? (
              <p className="italic text-gray-500 py-2">
                Selecione um item abaixo
              </p>
            ) : (
              <div className="py-1 grid grid-cols-3 gap-1">
                {itemsToTake.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleItemSelection(item.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer bg-[#e85252] text-white border border-red-600 select-none"
                  >
                    {item.icon && (
                      <span className="w-10 h-10 flex items-center justify-center text-2xl">
                        {item.icon}
                      </span>
                    )}
                    <span className="text-base text-center">{item.name}</span>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Usados recentemente */}
          <RecentlyUsed
            items={usedRecently}
            isOpen={openUsedRecently}
            toggleOpen={() => setOpenUsedRecently((o) => !o)}
            toggleItem={toggleItemSelection}
          />

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
