import { Button, useDisclosure } from "@nextui-org/react";
import React from "react";
import ModalRegister from "./src/components/ModalRegister";
import useLocalStorage from "../services/hooks/useLocalStorage";
import { useRouter } from "next/router";
import ModalLogin from "./src/components/ModalLogin";
import { IoLogInOutline } from "react-icons/io5";
import { RiRegisteredLine } from "react-icons/ri";

const register = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
    onOpenChange: onOpenChangeLogin,
  } = useDisclosure();

  const [userId, setUserId] = useLocalStorage("token", null);


  return (<>
    <div className="flex justify-center items-center h-screen bg-gray-800 px-2">
     
      <div className="relative  w-96 h-96 overflow-hidden rounded-xl border border-slate-800 p-[1px] backdrop-blur-3xl">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <div className="inline-flex h-full w-full items-center flex-col justify-center bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 p-10 text-sm font-medium text-white font-montserrat backdrop-blur-3xl">
          <strong className="text-lg text-slate-400 font-semibold mb-8"> Administración Magnolias</strong>

          <button className="mt-3 inline-flex h-12 font-sans
            animate-background-shine items-center 
            justify-center 
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] 
            px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 hover:shadow-xl hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] hover:bg-[length:200%_100%]"
            onClick={onOpen}
            >
            Registrarse <span className="ml-2"><RiRegisteredLine size="18px" /></span>
          </button>
          <span className="border-1 border-slate-200 border-b-slate-200 w-full mt-6"></span>
          <strong className='mt-2 text-sm text-rose-700 font-semibold'>
          * Ingresar, si ya tienes una cuenta *
          </strong>
          <button className="mt-3 inline-flex h-12 
            animate-background-shine items-center 
            justify-center 
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] 
            px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 hover:shadow-xl hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] hover:bg-[length:200%_100%]"
            onClick={onOpenLogin}
            >
            Ingresar <span className="ml-2"> <IoLogInOutline size="20px" /></span>
          </button>
        </div>
      </div>
      <ModalRegister
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        userId={userId}
        setUserId={setUserId}
      />
      <ModalLogin
        isOpen={isOpenLogin}
        onOpenChange={onOpenChangeLogin}
        onClose={onCloseLogin}
        userId={userId}
        setUserId={setUserId}
      />
    </div>
    </>
  );
};

export default register;
