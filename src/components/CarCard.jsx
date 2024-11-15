import { FiEdit, FiTrash2, FiEye } from "react-icons/fi";

export default function CarCard({ car, onView, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 shadow rounded p-4 mb-4 w-full text-white flex flex-col">
      {car && car.images && car.images.length > 0 && (
        <img
          src={car.images[0].image}
          alt={car.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-lg font-bold">{car.title}</h3>
      <p className="text-gray-500 mb-2">{car.company}</p>

      {/* Pushes the buttons to the bottom of the card */}
      <div className="flex space-x-2 mt-auto pt-4">
        <button
          onClick={() => onView(car)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FiEye />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(car);
          }}
          className="text-green-500 hover:text-green-700"
        >
          <FiEdit />
        </button>
        <button
          onClick={() => onDelete(car.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}
