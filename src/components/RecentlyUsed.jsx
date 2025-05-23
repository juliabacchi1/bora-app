import { Eye, EyeClosed } from "iconoir-react";

const RecentlyUsed = ({ items, isOpen, toggleOpen, toggleItem }) => {
  return (
    <section className="mb-1 rounded-lg overflow-hidden">
      <header
        className="flex items-center justify-between bg-[#f8f8f8] px-4 py-3 cursor-pointer select-none"
        onClick={toggleOpen}
      >
        <h2 className="font-medium">Usados recentemente</h2>
        {isOpen ? (
          <Eye className="w-5 h-5" />
        ) : (
          <EyeClosed className="w-5 h-5" />
        )}
      </header>
      {isOpen && (
        <div className="py-1 grid grid-cols-3 gap-1">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex flex-col items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none ${
                item.checked
                  ? "bg-[#e85252] border-red-600 text-white"
                  : "bg-[#aac8fa] border-transparent text-black"
              }`}
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-10 h-10 object-contain"
                />
              )}

              <span className="text-base text-center">{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default RecentlyUsed;
