import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListaById } from "../hooks/useListaById";
import RecentlyUsed from "../components/RecentlyUsed";
import CategorySection from "../components/CategorySection";

import {
  ArrowLeftCircle,
  BellNotificationSolid,
  MoreHorizCircle,
  FilterListCircleSolid,
} from "iconoir-react";

const ListDetails = () => {
  const { id } = useParams(); // recebe da URL
  const navigate = useNavigate();
  const { list, listId, listName } = useListaById(id);
  const [localList, setLocalList] = useState(list);


  const [openCategories, setOpenCategories] = useState(false);
  const [openUsedRecently, setOpenUsedRecently] = useState(false);

  // Todas categorias únicas
  const categoriasDaLista = localList?.items
    ? [...new Set(localList.items.map((item) => item.category))]
    : [];

  const itemsToTake = localList?.items?.filter((item) => item.selected) || [];

  const usedRecently =
    localList?.items
      ?.slice(0, 6)
      .map((item) => ({ ...item, checked: item.selected })) || [];


  // Funções toggles
  const toggleCategory = (category) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    if (list) {
      setLocalList(list);
    }
  }, [list]);


const toggleItemSelection = (itemId) => {
  const listasSalvas = JSON.parse(localStorage.getItem("listas")) || [];

  const listaAtual = listasSalvas.find((l) => l.id === list.id);

  if (!listaAtual) return;

  // Atualiza o estado do item selecionado
  const itemsAtualizados = listaAtual.items.map((item) =>
    item.id === itemId ? { ...item, selected: !item.selected } : item
  );

  const selecionados = itemsAtualizados.filter((item) => item.selected);

  const novaLista = {
    ...listaAtual,
    items: itemsAtualizados,
    itensCount: selecionados.length,
  };

  // Atualiza localStorage
  const listasAtualizadas = listasSalvas.map((l) =>
    l.id === listaAtual.id ? novaLista : l
  );
  localStorage.setItem("listas", JSON.stringify(listasAtualizadas));

  // Atualiza o estado local da lista no componente
  setLocalList(novaLista);
};

  return (
    <main className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center my-3">
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
          {categoriasDaLista.map((category) => {
            const items =
              list?.items
                ?.filter((item) => item.category === category)
                .map((item) => ({
                  ...item,
                  checked: item.selected,
                })) || [];

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
