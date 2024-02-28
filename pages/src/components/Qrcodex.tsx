import React, { Dispatch, SetStateAction, useState } from "react";
import { LocalStorageState } from "../../../services/hooks/useLocalStorage";
import QrReader from "react-qr-scanner";
import { mutationFn } from "../../../services/queries/Queries";
import { useMutation } from "react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { user } from "@nextui-org/react";

interface QrcodexProps {
  userId: LocalStorageState;
  toggleScanner: () => void;
  setIsChangeText: Dispatch<SetStateAction<boolean>>;
  isChangeText: boolean;
}

const handleResponse = (response: any) => {
  const { existingSchedule, newSchedule } = response.data.user;
  if (existingSchedule) {
    // Usuario ya tiene una entrada para el día actual
    // console.log("Detalles del usuario:", user);
    // console.log("Detalles del horario existente:", existingSchedule);
    // Mostrar detalles en tu interfaz de usuario
  } else {
    // // Nuevo horario creado
    // console.log("Detalles del usuario:", user);
    // console.log("Detalles del nuevo horario:", newSchedule);
    // Mostrar detalles en tu interfaz de usuario
  }
};

const Qrcodex = ({
  userId,
  toggleScanner,
  isChangeText,
  setIsChangeText,
}: QrcodexProps) => {
  const [scanResult, setScanResult] = useState(null);
  const [loadToaster, setLoadToaster] = useState(false);

 
  
  const handleScan = async (data: any) => {
    if (data) {
      axios
        .post(data.text, { userId })
        .then((response) => {
          if (
            response.data &&
            (response.data.existingSchedule || response.data.newSchedule)
          ) {
            handleResponse(response);
            toast.success("¡Registro exitoso!", {
              id: "success",
              duration: 2000,
            });
          }
        })
        .catch((error) => toast.error(error.response.data));

      setScanResult(data);
      setIsChangeText(true);
      toggleScanner();
    }
  };

  const handleError = (err: any) => {
    console.error(err);
  };

  // Verificar si userId es null antes de renderizar el componente
  if (userId === null) {
    return null;
  }

  return (
    <>
      {typeof window !== 'undefined' && (
        <QrReader
          delay={100}
          onError={handleError}
          onScan={handleScan}
          constraints={{
            audio: false,
            video: { facingMode: "environment" },
          }}
          key="environment"
        />
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

export default Qrcodex;