const ItemCard = ({ item, toggleItem }) => {
  return (
    <div
      onClick={() => toggleItem(item.id)}
      className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none ${
        item.checked
          ? "bg-[#e85252] border-red-600 text-white"
          : "bg-[#aac8fa] border-blue-200 text-black"
      }`}
    >
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-10 h-10 object-contain"
        />
      )}
      <span className="text-base">{item.name}</span>
    </div>
  );
};

export default ItemCard;
