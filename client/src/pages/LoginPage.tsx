import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const LoginPage: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <AuthForm />
    </main>
  );
};

export default LoginPage;
