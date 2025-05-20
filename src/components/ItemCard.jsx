const ItemCard = ({ item, toggleItem }) => {
  return (
    <label
      className={`flex items-center gap-3 p-3 mb-3 rounded-lg border cursor-pointer transition-all ${
        item.checked
          ? "bg-[#e6f4ea] border-green-400"
          : "bg-white border-gray-300"
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
      <span
        className={`text-base ${
          item.checked ? "line-through text-gray-500" : ""
        }`}
      >
        {item.name}
      </span>
    </label>
  );
};

export default ItemCard;
