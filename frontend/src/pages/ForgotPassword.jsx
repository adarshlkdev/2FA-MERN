import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { ArrowLeft, Mail, Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              className="w-full bg-blue-500 text-white rounded-lg py-2 mt-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 font-bold animate-spin text-center mx-auto" />
              ) : (
                <span>Send Reset Link</span>
              )}
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-500 text-white rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-300 mb-6">
              If an account exists for {email} , you will recieve an email with
              a link to reset your password.
            </p>
          </div>
        )}
      </div>
      <div className="px-8 py-4 bg-gray-800 bg-opacity-50 text-center">
        <Link
          to="/login"
          className="text-blue-500 hover:underline flex items-center justify-center"
        >
          <ArrowLeft className="mr-2" /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
