import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center text-5xl justify-center text-white">
      <h1>404 NOT found</h1>
      <h3>Please Go to Home Page</h3>
      <Link
        to="/"
        className="bg-black text-white text-bold text-xl m-4 py-2 px-6 rounded-md"
      >
        Back
      </Link>
    </div>
  );
}

export default NotFound;
