import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ResetPasswordForm = () => {
  const router = useRouter();
  const { token } = router.query;
  console.log(token);
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://api-magnolias.vercel.app/v1/users/password-reset/${token}`,
        {
          password,
        }
      );
    //   console.log(response);
      if (response.data) {
        toast.success("Se ha restablecido tu contraseña");
      }
      setTimeout(() => {
        if (response.data) {
          router.push("/register");
        }
      }, 3000);
    } catch (error) {
      console.error(error);
      toast.error("Hubo un error al restablecer la contraseña");
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Nueva Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 text-black block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Restablecer Contraseña
      </button>
    </form>
    <Toaster />
    </>
  );
};

export default ResetPasswordForm;
