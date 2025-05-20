import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import ListCard from "../components/ListCard";
import { mockLists } from "../data/mockLists";

import {
  PlusCircleSolid,
  MoreHorizCircle,
  BellNotificationSolid,
} from "iconoir-react";

const Home = () => {
  const navigate = useNavigate();

  // estado que guarda as listas
  const [listas, setListas] = useState([
    { id: 1, title: "Urubici", itensCount: 3 },
    // começa com uma lista inicial ou vazio []
  ]);

  return (
    <main className="p-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold">Bora!</h1>
        <div className="flex items-center gap-2">
          <BellNotificationSolid width={20} height={20} />
          <MoreHorizCircle width={20} height={20} />
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-2">Minhas listas</h2>

      {/* renderiza as listas dinâmicas */}
      {listas.map((lista) => (
        <ListCard
          key={lista.id}
          id={lista.id}
          title={lista.title}
          itensCount={lista.itensCount}
          onClick={() => navigate(`/lista/${lista.id}`)}
        />
      ))}

      {/* criar nova lista */}
      <button
        onClick={() => {
          // lógica para criar uma nova lista
          const novaLista = {
            id: listas.length + 1,
            title: `Lista ${listas.length + 1}`,
            itensCount: 0,
          };
          setListas([...listas, novaLista]);
        }}
        className="w-full bg-white text-[#415582] font-semibold py-2 px-4 rounded-xl border mt-4 flex items-center justify-center gap-2"
      >
        <span className="text-xl">
          <PlusCircleSolid width={20} height={20} />
        </span>{" "}
        Nova lista
      </button>

      {/* Recomendação de listas (pode deixar fixo ou dinâmico) */}
      <h2 className="text-lg font-semibold mt-6 mb-2">
        Recomendações de listas
      </h2>

      <div className="grid grid-cols-3 gap-2">
        {["Feriado", "Bate-volta", "Floripa"].map((item) => (
          <div
            key={item}
            className="bg-white p-4 rounded-xl flex flex-col items-center"
          >
            <p className="text-sm font-semibold">{item}</p>
            <div className="text-2xl text-[#415582] mt-14">
              <PlusCircleSolid width={20} height={20} />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
