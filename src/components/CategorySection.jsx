// src/components/CategorySection.jsx
import { Eye, EyeClosed } from "iconoir-react";
import ItemCard from "./ItemCard";

const CategorySection = ({
  category,
  items,
  isOpen,
  toggleCategory,
  toggleItem,
}) => {
  return (
    <section className="mb-4 border border-[#cfd8e3] rounded-lg overflow-hidden">
      <header
        onClick={() => toggleCategory(category)}
        className="cursor-pointer bg-[#415582] text-white px-4 py-2 rounded-t-lg flex justify-between items-center select-none"
      >
        <span className="font-medium">{category}</span>
        {isOpen ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeClosed className="w-5 h-5" />
        )}
      </header>

      {isOpen && (
        <div className="bg-white p-4 flex flex-col gap-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} toggleItem={toggleItem} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
