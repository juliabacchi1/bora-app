export const useListaById = (id) => {
  const listas = JSON.parse(localStorage.getItem("listas")) || [];

  const list = listas.find((lista) => lista.id.toString() === id.toString());

  return {
    list,
    listId: id,
    listName: list?.title || "Lista sem nome",
  };
};
