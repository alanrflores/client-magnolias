import React, { Dispatch, SetStateAction, use, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import {
  getAllUser,
  getCreateUser,
  getUserById,
  login,
} from "../../../services/queries/Queries";
import { useMutation, useQuery } from "react-query";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import useLocalStorage, {
  LocalStorageState,
} from "../../../services/hooks/useLocalStorage";

interface ModalRegisterProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  userId: LocalStorageState;
  setUserId: Dispatch<SetStateAction<LocalStorageState>>;
}

export default function ModalRegister({
  isOpen,
  onOpenChange,
  onClose,
  userId,
  setUserId,
}: ModalRegisterProps) {
  const roles = ["EMPLEADO"];
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isRegistrationMode, setIsRegistrationMode] = useState<boolean>(true);

  const [values, setValues] = useState<User>({
    name: "",
    email: "",
    username: "",
    password: "",
    role: "",
  });
  const [touched, setTouched] = useState(false);
  const isValid = values.role == "";

  const mutation = useMutation(getCreateUser);
  const {
    data: usersFetch,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery("users", getAllUser);

  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = values.name;
    const email = values.email;
    const username = values.username;
    const password = values.password;
    const role = values.role;

    const userData = { name, email, username, password, role };

    try {
      const promise = toast.promise(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(mutation.mutateAsync(userData));
          }, 3000);
        }),
        {
          loading: "Guardando...",
          success: <b> 'Usuario creado, sera redirigido!'</b>,
          error: <b>Lo siento, intente nuevamente.</b>,
        }
      );

      const result: any = await promise;

      setUserId(result.data._id);

      setValues({
        name: "",
        email: "",
        username: "",
        password: "",
        role: "",
      });

      refetch();

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      // Manejar errores si es necesario
      console.error("Error mientras se intento guardar el usuario:", error);
      toast.error("Error mientras se intento guardar el usuario");
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const isEqualEmail =
    usersFetch &&
    usersFetch?.data?.map((user: User) => user.email === values.email);

  const isEqualUsername =
    usersFetch &&
    usersFetch?.data?.map((user: User) => user.username === values.username);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="sm"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-between">
                {" "}
                Registrate{" "}
                <div className="px-6">
                  <FaUser />
                </div>
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  endContent={
                    <MdDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Nombre"
                  placeholder="Escriba su nombre"
                  value={values.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                  className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                />
                <Input
                  isRequired
                  isInvalid={isEqualUsername}
                  autoFocus
                  endContent={
                    <MdDriveFileRenameOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Nombre de usuario"
                  placeholder="Escriba su nombre de usuario"
                  value={values.username}
                  onChange={(e) =>
                    setValues({ ...values, username: e.target.value })
                  }
                  className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                />
                <Input
                  isRequired
                  isInvalid={isEqualEmail}
                  autoFocus
                  endContent={
                    <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Esribe tu email"
                  value={values.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                  className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                />

                <Input
                  isRequired
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
                  placeholder="Escriba su contraseña"
                  type={isVisible ? "text" : "password"}
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                />
                <div className="w-full flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                     <div className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
                      <Select
                        isInvalid={touched && isValid}
                        className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                        label="Selecciona un rol"
                        onChange={(e) =>
                          setValues({ ...values, role: e.target.value })
                        }
                      >
                        {roles?.map((rol) => (
                          <SelectItem
                            key={rol}
                            value={rol}
                            className="text-black border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
                    
                          >
                            <span className="text-black">{rol}</span>
                          </SelectItem>
                        ))}
                      </Select>
                    </div> 
                  </div>
                </div>

                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Recordar usuario
                  </Checkbox>

                  <Link color="primary" href={"/request"} size="sm">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  className="mt-3 inline-flex h-12 font-sans text-sm
            animate-background-shine items-center 
            justify-center 
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] 
            px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 hover:shadow-xl hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] hover:bg-[length:200%_100%]"
                  onClick={onClose}
                >
                  Cerrar
                </button>
                <button
                  className="mt-3 inline-flex h-12 font-sans
            animate-background-shine items-center 
            justify-center 
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] 
            px-6 font-medium text-slate-200 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 hover:shadow-xl hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] hover:bg-[length:200%_100%]"
                  onClick={(e) => {
                    handleSubmit(e), refetch(), onClose();
                  }}
                >
                  Registrar
                </button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}
