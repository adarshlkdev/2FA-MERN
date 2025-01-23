import React from "react";
import { formatDate } from "../utils/date";
import { useAuthStore } from "../store/authStore";

function HomePage() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Dashboard
        </h2>

        <div className="space-y-6">
          <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-500 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-300 ">
              <span className="font-bold">Name</span>: {user.name}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Email</span>: {user.email}
            </p>
          </div>
          <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
            <h3 className="text-xl font-semibold text-blue-500 mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>

              {formatDate(user.lastLogin)}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            className="py-4 px-6 bg-blue-500 text-white rounded-lg w-full"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
