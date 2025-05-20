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
    <section className="mb-1 rounded-lg overflow-hidden">
      <header
        onClick={() => toggleCategory(category)}
        className="cursor-pointer bg-[white] px-4 py-3 rounded-t-lg flex justify-between items-center select-none"
      >
        <span className="font-medium">{category}</span>
        {isOpen ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeClosed className="w-5 h-5" />
        )}
      </header>

      {isOpen && (
        <div className="py-1 grid grid-cols-3 gap-1">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} toggleItem={toggleItem} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategorySection;
