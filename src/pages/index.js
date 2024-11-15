import Link from 'next/link';
import { useRouter } from "next/router";
import { useUser } from '@/context/UserContext';

export default function HomePage() {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Header Section with Login and Register */}
      <header className="bg-gradient-to-r from-blue-500 to-indigo-600 py-4 text-white">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">CarInventory</h1>
          <div className="absolute top-4 right-4">
            {isAuthenticated ? (
              <button
                onClick={() => router.push("/dashboard")}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Welcome to CarInventory</h2>
          <p className="text-lg mb-8">
            Find the best deals on cars, view detailed information, and manage your car inventory all in one place.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Easy Car Search</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Quickly find cars based on your preferences such as make, model, price, and year.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Detailed Car Listings</h3>
              <p className="text-gray-700 dark:text-gray-300">
                View detailed specifications, images, and pricing information for each car.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Seller Dashboard</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Manage and list your cars easily with our seller-friendly dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">1</div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Create an Account</h3>
              <p className="text-gray-700 dark:text-gray-300">Create a profile to list cars for sale or browse available cars in your area.</p>
            </div>
            <div className="p-6">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">2</div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Browse Car Listings</h3>
              <p className="text-gray-700 dark:text-gray-300">Explore car listings by filtering for make, model, price, and more.</p>
            </div>
            <div className="p-6">
              <div className="bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">3</div>
              <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-white">Buy or Sell a Car</h3>
              <p className="text-gray-700 dark:text-gray-300">Connect with sellers or buyers and complete the transaction seamlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-2">CarInventory</h4>
              <p className="text-gray-400">Your ultimate car buying and selling platform.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul>
                <li>
                  <Link href="/about">
                    <p className="text-gray-400 hover:text-white cursor-pointer">About Us</p>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <p className="text-gray-400 hover:text-white cursor-pointer">Contact</p>
                  </Link>
                </li>
                <li>
                  <Link href="/cars">
                    <p className="text-gray-400 hover:text-white cursor-pointer">Cars</p>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Follow Us</h4>
              <ul className="flex space-x-4">
                <li><p className="text-gray-400 hover:text-white cursor-pointer">Twitter</p></li>
                <li><p className="text-gray-400 hover:text-white cursor-pointer">LinkedIn</p></li>
                <li><p className="text-gray-400 hover:text-white cursor-pointer">Facebook</p></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
