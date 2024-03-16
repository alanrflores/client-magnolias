import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaEyeSlash, FaUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { useMutation, useQuery } from "react-query";
import { getAllUser, login } from "../../../services/queries/Queries";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import useLocalStorage, {
  LocalStorageState,
} from "../../../services/hooks/useLocalStorage";
interface ModalLoginProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  userId: LocalStorageState;
  setUserId: Dispatch<SetStateAction<LocalStorageState>>;
}

const ModalLogin = ({
  isOpen,
  onOpenChange,
  onClose,
  userId,
  setUserId,
}: ModalLoginProps) => {
  const {
    data: usersFetch,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery("users", getAllUser);

  const router = useRouter();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [values, setValues] = useState<UserResume>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState(false);
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const mutation = useMutation(login);
  const isEmailExist = usersFetch?.data?.find(
    (item: any) => item.email === values.email
  );
  const isPasswordExist = usersFetch?.data?.find(
    (item: any) => item.password !== values.password
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = values.email;
    const password = values.password;

    try {
      if (isEmailExist) {
        const result = await mutation.mutateAsync({ email, password });
        setUserId(result.data._id);
        setValues({
          email: "",
          password: "",
        });

        router.push("/");
      } else {
        toast.error("Usuario no registrado");
      }
    } catch (error) {
      console.error("Error no se encontro el usuario", error);
      toast.error("Error no se encontro el usuario");
    }
  };

 
  if (isError) return <div>Error..</div>;

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
                refetch();
                onClose();
              }}
            >
              <>
                <ModalHeader className="flex justify-between">
                  {" "}
                  Ingresar{" "}
                  <div className="px-6 mt-1">
                    <FaUser />
                  </div>
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    autoFocus
                    endContent={
                      <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Email"
                    placeholder="Escribe tu email"
                    value={values.email}
                    onChange={(e) =>
                      setValues({ ...values, email: e.target.value })
                    }
                    className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                  />

                  <Input
                    isRequired
                    autoComplete="current-password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <IoEyeSharp className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        ) : (
                          <FaEyeSlash className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        )}
                      </button>
                    }
                    label="Contraseña"
                    placeholder="Escribe tu contraseña"
                    type={isVisible ? "text" : "password"}
                    value={values.password}
                    onChange={(e) =>
                      setValues({ ...values, password: e.target.value })
                    }
                    className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                  />
                </ModalBody>
                <ModalFooter>
                  <button
                    className="mt-3 inline-flex h-12 font-sans text-sm
            animate-background-shine items-center 
            justify-center 
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] 
            px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 hover:shadow-xl hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] hover:bg-[length:200%_100%]"
                    type="submit"
                  >
                    Ingresar
                  </button>
                </ModalFooter>
              </>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalLogin;
