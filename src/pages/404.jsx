import { useEffect } from "react";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to homepage after a short delay (for better user experience)
    router.replace("/"); // replace() is used to avoid adding the redirect to the browser history
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br bg-gray-900">
      <div className="bg-gray-700 px-10 py-6 rounded-lg shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">
          Page Not Found
        </h2>
        <p className="text-white">Redirecting to the homepage...</p>
      </div>
    </div>
  );
};

export default Custom404;
