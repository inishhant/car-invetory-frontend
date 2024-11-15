// pages/jobs/[id].js
import { fetchCars } from "@/services/cars";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Carousel from "@/components/Carousel"; // Import Carousel

export default function CarDetails() {
  const router = useRouter();
  const { id: encodedId } = router.query;
  const [car, setCar] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("cars_token");
    if (!token) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (!encodedId) return;
    (async () => {
      const decodedId = Buffer.from(encodedId, "base64").toString("ascii");
      const data = await fetchCars(decodedId);
      setCar(data.data);
    })();
  }, [encodedId]);

  useEffect(() => {
    console.log(car);
  }, [car]);

  if (!car) return <p className="text-white">Loading...</p>;

  return (
    <div className="min-h-screen min-w-full flex bg-gray-900 text-white">
      <div className="max-w-2xl w-full p-8 rounded-lg shadow-lg">
        {/* Carousel for car images */}
        <div className="flex">
        
        <h1 className="text-3xl font-bold mt-4">{car?.username}</h1>
        <div className="mb-4">
          <p>
            <strong>Car Name:</strong> {car?.title}
          </p>
          <p>
            <strong>Car Company:</strong> {car?.company}
          </p>
          <p>
            <strong>Car Type:</strong> {car?.car_type}
          </p>
          <p>
            <strong>Dealer:</strong> {car?.dealer}
          </p>
          <p>
            <strong>Price:</strong> {car?.price}
          </p>
        </div>
        <div className="fixed right-10">
        {car.images && car.images.length > 0 && (
          <Carousel images={car.images} />
        )}
        </div>
        </div>
        <button
          className="bg-blue-600 text-white px-1 py-2 rounded w-1/5 mb-5 hover:bg-blue-700"
          onClick={() => router.push(`/dashboard`)}
        >
          Go Back
        </button>
        <p className="text-lg text-gray-300 mb-4">
          About: {car?.description}
        </p>
      </div>
    </div>
  );
}
