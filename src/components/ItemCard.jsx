const ItemCard = ({ item, toggleItem }) => {
  return (
    <label
      className={`flex items-center gap-3 p-3 mb-3 rounded-lg border cursor-pointer transition-all ${
        item.checked
          ? "bg-[#e85252] border-red-600 text-white line-through"
          : "bg-[#aac8fa] border-blue-200 text-black"
      }`}
    >
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => toggleItem(item.id)}
        className="accent-green-600 w-5 h-5"
      />
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-10 h-10 object-contain"
        />
      )}
      <span className="text-base">{item.name}</span>
    </label>
  );
};

export default ItemCard;
