import React, { useState, useRef, FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AuthForm: React.FC = () => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    if (!enteredEmail || !enteredPassword) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: enteredEmail,
          password: enteredPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      alert("Login successful!");
    } catch (error: any) {
      alert(error.message || "An unexpected error occurred.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPasswordFields(!showPasswordFields);
  };

  return (
    <section className="mx-auto my-12 w-11/12 max-w-md rounded-lg bg-white shadow-lg p-6 text-center">
      <h1 className="text-xl font-bold text-blue-500 mb-4">Login</h1>
      <form onSubmit={submitHandler}>
        {/* Email Input */}
        <div className="relative mb-4">
          <label
            htmlFor="email"
            className="block text-left text-blue-500 font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="username"
            required
            ref={emailInputRef}
            className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password Input */}
        <div className="relative mb-4">
          <label
            htmlFor="password"
            className="block text-left text-blue-500 font-bold mb-2"
          >
            Password
          </label>
          <div className="flex items-center">
            <input
              type={showPasswordFields ? "text" : "password"}
              id="password"
              name="password"
              required
              ref={passwordInputRef}
              className="w-full bg-blue-50 text-black rounded-lg p-2 pl-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div
              className="absolute right-4 cursor-pointer text-blue-500"
              onClick={togglePasswordVisibility}
            >
              <FontAwesomeIcon icon={showPasswordFields ? faEyeSlash : faEye} />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
