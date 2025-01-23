import React from "react";

function Input({ icon: Icon, ...props }) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon className="size-5 text-white" />
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-700 bg-gray-800 bg-opacity-50 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default Input;
