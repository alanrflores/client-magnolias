import React, { use, useEffect, useState } from "react";
// import QRCode from "react-qr-code";
import QRCode from "react-qr-code";
import useLocalStorage from "../services/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getUserById } from "@/services/queries/Queries";

const code = () => {
  const router = useRouter();
  const [userId, setUserId] = useLocalStorage("token", null);
  // const value = "http://localhost:3000/v1/schedules";
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL}/v1/schedules`;
  const value = "https://client-magnolias.vercel.app/register";

  const {
    data: userById,
    refetch: refetchUser,
    isLoading,
    isError,
  } = useQuery(["user", userId], getUserById);

  const isNotAdmin =
    userById && userById.data && userById.data.role === "ADMIN";

  useEffect(() => {
    if (!userId) {
      router.push("/register");
    }
  }, [userId]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <span className="text-white font-semibold">Cargando...</span>
      </div>
    );

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <span className="text-white font-semibold">Error...</span>
      </div>
    );
  }

  const isValue = (base: string, val: string) => {
    if (userById) {
      return base;
    } else {
      return val;
    }
  };

  const urlToDisplay = isValue(baseUrl, value);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      {!isNotAdmin ? (
        <div>
          <h1 className="text-xl text-center font-bold text-white">
            Solo el administrador puede ver este contenido
          </h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-md rounded-md bg-white text-red-600 font-semibold p-2">
            Escanea el QR para registrar tu asistencia (USUARIOS REGISTRADOS)
          </h1>

          <div className="mt-28">
            <QRCode size={230} value={urlToDisplay} />
          </div>
        </div>
      )}
    </div>
  );
};

export default code;
