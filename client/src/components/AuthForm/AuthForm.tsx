import React, { useState, useRef, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AuthForm: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const confirmPasswordInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const lastNameInputRef = useRef<HTMLInputElement>(null);
  const [showPasswords, setShowPasswords] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (!enteredEmail || !enteredPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (!isLogin) {
      const enteredFirstName = firstNameInputRef.current?.value;
      const enteredLastName = lastNameInputRef.current?.value;
      const enteredConfirmPassword = confirmPasswordInputRef.current?.value;

      if (!enteredFirstName || !enteredLastName) {
        alert("Please provide your first and last name.");
        return;
      }

      if (!enteredConfirmPassword || enteredPassword !== enteredConfirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    }

    try {
      const url = isLogin ? "/api/users/login" : "/api/users/register";
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
        throw new Error(data.message || (isLogin ? "Login failed." : "Registration failed."));
      }

      alert(isLogin ? "Login successful!" : "Registration successful!");
    } catch (error: any) {
      alert(error.message || "An unexpected error occurred.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPasswords((prevState) => !prevState);
  };

  const toggleAuthMode = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  return (
    <section className="mx-auto my-12 w-11/12 max-w-md rounded-lg bg-white shadow-lg p-6 text-center">
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
            name="username"
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
                ref={firstNameInputRef}
                className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
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
                ref={lastNameInputRef}
                className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
                required
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
          <div className="flex items-center">
            <input
              type={showPasswords ? "text" : "password"}
              id="password"
              name="password"
              required
              ref={passwordInputRef}
              className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            <div
              className="absolute right-4 cursor-pointer text-blue-800"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
            </div>
          </div>
        </div>

        {/* Confirm Password Input (Only for Register) */}
        {!isLogin && (
          <div className="relative mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-left text-blue-800 font-bold mb-2"
            >
              Confirm Password
            </label>
            <div className="flex items-center">
              <input
                type={showPasswords ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                required
                ref={confirmPasswordInputRef}
                className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              <div
                className="absolute right-4 cursor-pointer text-blue-800"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPasswords ? faEyeSlash : faEye} />
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>

      {/* Toggle Button */}
      <div className="mt-4">
        <button
          type="button"
          className="text-blue-800 underline hover:text-blue-700 transition duration-200"
          onClick={toggleAuthMode}
        >
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}
        </button>
      </div>
    </section>
  );
};

export default AuthForm;
