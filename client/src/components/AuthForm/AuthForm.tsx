import React, { useState, useRef, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
}

const AuthForm: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);
    
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (!enteredEmail || !enteredPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (!isLogin) {
      const enteredFirstName = firstNameInputRef.current?.value;
      const enteredLastName = lastNameInputRef.current?.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

      if (!enteredFirstName || !enteredLastName) {
        setError("Please provide your first and last name.");
        return;
      }

      if (!enteredConfirmPassword || enteredPassword !== enteredConfirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      const url = isLogin ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          ...(isLogin
            ? {}
            : {
                firstName: firstNameInputRef.current?.value,
                lastName: lastNameInputRef.current?.value,
              }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = data as ErrorResponse;
        const errorMessage = Array.isArray(errorData.message) 
          ? errorData.message[0] 
          : errorData.message || "Authentication failed";
        throw new Error(errorMessage);
      }

      const authData = data as AuthResponse;
      
      if (isLogin) {
        // Store the token and user data only for login
        localStorage.setItem('token', authData.access_token);
        localStorage.setItem('user', JSON.stringify(authData.user));
        // Redirect to main page after login
        window.location.href = '/';
      } else {
        // For registration, just switch to login mode
        setIsLogin(true);
        setError(null);
        setSuccessMessage("Registration successful! You can now log in with your credentials.");
        // Clear the form fields
        if (emailInputRef.current) emailInputRef.current.value = '';
        if (passwordInputRef.current) passwordInputRef.current.value = '';
        if (firstNameInputRef.current) firstNameInputRef.current.value = '';
        if (lastNameInputRef.current) lastNameInputRef.current.value = '';
      }
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPasswords((prevState) => !prevState);
  };

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <section className="mx-auto my-12 w-11/12 max-w-md rounded-lg bg-white shadow-lg p-6 text-center">
      <h1 className="text-2xl font-bold text-blue-800 mb-6">
        {isLogin ? "Login" : "Create Account"}
      </h1>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded border border-green-400">
          {successMessage}
        </div>
      )}

      <form onSubmit={submitHandler}>
        {/* Email Input */}
        <div className="relative mb-4">
          <label
            htmlFor="email"
            className="block text-left text-blue-800 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            ref={emailInputRef}
            className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
          />
        </div>

        {/* First Name and Last Name (Only for Register) */}
        {!isLogin && (
          <>
            <div className="relative mb-4">
              <label
                htmlFor="firstName"
                className="block text-left text-blue-800 font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                required
                ref={firstNameInputRef}
                className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="lastName"
                className="block text-left text-blue-800 font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                required
                ref={lastNameInputRef}
                className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>
          </>
        )}

        {/* Password Input */}
        <div className="relative mb-4">
          <label
            htmlFor="password"
            className="block text-left text-blue-800 font-bold mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPasswords ? "text" : "password"}
              id="password"
              required
              ref={passwordInputRef}
              className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        {/* Confirm Password (Only for Register) */}
        {!isLogin && (
          <div className="relative mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-left text-blue-800 font-bold mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPasswords ? "text" : "password"}
                id="confirmPassword"
                required
                ref={confirmPasswordInputRef}
                className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-900 transition-colors"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </div>
      </form>

      {/* Toggle Auth Mode Button */}
      <div className="mt-4">
        <button
          type="button"
          className="text-blue-800 hover:underline"
          onClick={toggleAuthMode}
        >
          {isLogin
            ? "Create new account"
            : "Login with existing account"}
        </button>
      </div>
    </section>
  );
};

export default AuthForm;
