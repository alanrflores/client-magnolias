import React from "react";
import RequestPasswordResetForm from "./src/components/RequestPasswordResetForm";

const request = () => {
  return (
    <div className="flex flex-col justify-center items-center h-dvh w-full">
      <div>
        <h1 className="text-3xl font-semibold">Restablecer Contraseña</h1>
        <p className="text-sm text-gray-500 mb-6">
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
        </p>

        <RequestPasswordResetForm />
      </div>
    </div>
  );
};

export default request;
