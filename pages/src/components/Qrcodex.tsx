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
    toast.success("¡Registro de salida exitoso!", {
      id: "success",
      duration: 2000,
    });
  } else {
    toast.success("¡Registro de entrada exitoso!", {
      id: "success",
      duration: 2000,
    });
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
    console.log("Data:", data && data);
    if (data) {
      axios
        .post(data.text, { userId })
        .then((response) => {
          if (
            response.data &&
            (response.data.existingSchedule || response.data.newSchedule)
          ) {
            handleResponse(response);
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

  if (userId === null) {
    return null;
  }

  return (
    <>
      {typeof window !== "undefined" && (
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
