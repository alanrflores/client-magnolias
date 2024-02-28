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
     console.log("¡Registro de salida exitoso!");
  } else {
      console.log("¡Registro de entrada exitoso!");
  }
};

const Qrcodex = ({
  userId,
  toggleScanner,
  isChangeText,
  setIsChangeText,
}: QrcodexProps) => {
  const [scanResult, setScanResult] = useState({
    delay: 300,
    result: "No result",
  });
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
            
          }
        })
        .catch((error) => toast.error(error.response.data));

      setScanResult({result: data.text, delay: 300});
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

  console.log(scanResult)
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
