// pages/dashboard.js
import CarCard from "@/components/CarCard";
import { useEffect, useState, useCallback } from "react";
import api from "@/utils/api";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";
import debounce from "lodash.debounce"; // Import debounce

export default function Dashboard() {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newCar, setNewCar] = useState({
    id: null, // Added ID to track if it's a new or existing car
    title: "",
    description: "",
    car_type: "",
    company: "",
    dealer: "",
    price: "",
    images: [],
  });
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("cars_token")) {
      router.push("/");
      return;
    }

    const fetchCars = async () => {
      try {
        const response = await api.get("/cars/");
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      try {
        const response = await api.get(`/cars/?search=${query}`);
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    }, 500), // 500ms delay after the user stops typing
    []
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value); // Call the debounced function
  };

  const handleViewCar = (car) => {
    // Handle car details view
    const encodedId = Buffer.from(car.id.toString()).toString("base64");
    router.push(`/cars/${encodedId}/`);
  };

  const handleEditCar = (car) => {
    // Prefill the form with car details for editing
    console.log("Editing car:", car);
    setNewCar({
      id: car.id,
      title: car.title,
      description: car.description,
      car_type: car.car_type,
      company: car.company,
      dealer: car.dealer,
      price: car.price,
      images: [], // We keep images null for now, but you can handle image updates if needed
    });
    setIsModalOpen(true); // Open the modal to edit
  };

  const handleDeleteCar = async (carId) => {
    try {
      await api.delete(`/cars/${carId}/`);
      setCars(cars.filter((car) => car.id !== carId));
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleSaveCar = () => {
    const saveCarData = async () => {
      const formData = new FormData();
      formData.append("title", newCar.title);
      formData.append("description", newCar.description);
      formData.append("car_type", newCar.car_type);
      formData.append("company", newCar.company);
      formData.append("dealer", newCar.dealer);
      formData.append("price", newCar.price);
      if (newCar.images.length > 0) {
        newCar.images.forEach((image) => {
          formData.append("images", image); // Append each image file to FormData
        });
      }

      try {
        if (newCar.id) {
          // If an id exists, it's an edit
          const response = await api.put(`/cars/${newCar.id}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setCars(
            cars.map((car) =>
              car.id === response.data.id ? response.data : car
            )
          );
        } else {
          // If no id exists, it's an add
          const response = await api.post("/cars/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setCars([...cars, response.data]);
        }
        setIsModalOpen(false);
        setNewCar({
          id: null,
          title: "",
          description: "",
          car_type: "",
          company: "",
          dealer: "",
          price: "",
          images: [],
        });
      } catch (error) {
        console.error("Error saving car:", error);
      }
    };

    saveCarData();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewCar((prevCar) => ({
      ...prevCar,
      images: files,
    }));
  };

  return (
    <div
      className="flex bg-gray-300"
      //   onClick={() => setIsModalOpen(false)}
    >
      <main className="flex-grow p-6 ml-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">
          Your Car Inventory
        </h1>
        <div className="flex space-x-2">
          <div className="flex">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className=" flex mb-4 bg-blue-500 text-white py-2 px-4 rounded "
            >
              Add New Car
            </button>
          </div>
          <div className="mb-4 min-w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Cars"
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              onView={handleViewCar}
              onEdit={handleEditCar}
              onDelete={handleDeleteCar}
            />
          ))}
        </div>
      </main>

      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-white">
            <h2 className="text-2xl font-bold my-4">
              {newCar.id ? "Edit Car" : "Add New Car"}
            </h2>
            <div className="mb-2">
              <label className="block text-sm font-medium text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={newCar.title}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                placeholder="Car Title"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-white">
                Description
              </label>
              <textarea
                name="description"
                value={newCar.description}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                placeholder="Car Description"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-white">
                Car Type
              </label>
              <input
                type="text"
                name="car_type"
                value={newCar.car_type}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                placeholder="Car Type"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-white">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={newCar.company}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                placeholder="Car Company"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-white">
                Dealer
              </label>
              <input
                type="text"
                name="dealer"
                value={newCar.dealer}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                placeholder="Car Dealer"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-white">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={newCar.price}
                onChange={handleInputChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full text-black"
                placeholder="Price"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium text-white">
                Images
              </label>
              <input
                type="file"
                name="images"
                onChange={handleFileChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                multiple
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSaveCar}
                className="bg-green-500 text-white py-2 px-4 rounded mr-2"
              >
                {newCar.id ? "Save Changes" : "Add Car"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
