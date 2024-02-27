import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const RequestPasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api-magnolias.vercel.app/v1/users/password-reset",
        {
          email,
        }
      );
    //   console.log(response);
      if (response.data) {
        toast.success(
          "Se ha enviado un correo con las instrucciones para restablecer tu contraseña, volverás a la página de inicio de sesión."
        );
        setEmail("");
      }
      setTimeout(() => {
        if (response.data) {
          router.push("/register");
        }
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al enviar el correo");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="ejemplo@gmail.com"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Solicitar Restablecimiento de Contraseña
        </button>
      </form>
      <Toaster />
    </>
  );
};

export default RequestPasswordResetForm;
