const ItemCard = ({ item, toggleItem }) => {
  return (
    <div
      onClick={() => toggleItem(item.id)}
      className={`flex flex-col items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none ${
        item.checked
          ? "bg-[#e85252] border-red-600 text-white"
          : "bg-[#aac8fa] border-blue-200 text-black"
      }`}
    >
      {item.icon && (
        <span className="w-10 h-10 flex items-center justify-center text-2xl">
          {item.icon}
        </span>
      )}

      <span className="text-base text-center">{item.name}</span>
    </div>
  );
};

export default ItemCard;
