import React from "react";
import ResetPasswordForm from "../src/components/ResetPasswordForm";
import { useRouter } from "next/router";


const resetPassword = () => {
  const router = useRouter();
  const { token } = router.query;
  
  return (
    <div className="flex flex-col justify-center items-center h-dvh w-full">
      <div>
        <h1 className="text-3xl font-semibold">Nueva contraseña</h1>
        <p className="text-sm text-gray-500 mb-6">
          Ingresa tu nueva contraseña.
        </p>

        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default resetPassword;
