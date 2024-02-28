import React, { use, useEffect, useState } from "react";
// import QRCode from "react-qr-code";
import QRCode from "react-qr-code";
import useLocalStorage from "../services/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getUserById } from "@/services/queries/Queries";
import { is } from "date-fns/locale";

const code = () => {
  const router = useRouter();
  const [userId, setUserId] = useLocalStorage("token", null);
  const value = "http://localhost:3000/v1/schedules";
  const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL}/v1/schedules`;

  const { data: userById, refetch: refetchUser ,isLoading, isError } = useQuery(
    ["user", userId],
    getUserById
  );

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

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      {!isNotAdmin ? (
        <div>
          <h1 className="text-xl text-center font-bold text-white">Solo el administrador puede ver este contenido</h1>
        </div>
      ) : (
        <div>
          <h1 className="text-xl text-center font-bold text-white">
            Código QR ADMIN
          </h1>
          <p className="text-md text-white text-center">
            Escanea este código para marcar tu asistencia
          </p>
          <div className="mt-8 ml-16">
            <QRCode size={180} value={baseUrl} />
          </div>
        </div>
      )}
    </div>
  );
};

export default code;
