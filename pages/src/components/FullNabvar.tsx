import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import React, { Dispatch, SetStateAction, use, useEffect } from "react";
import { RiRestaurantFill } from "react-icons/ri";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQueryClient,
} from "react-query";
import { LocalStorageState } from "../../../services/hooks/useLocalStorage";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";

interface FullNavbarProps {
  userById: any;
  userId: LocalStorageState;
  setUserId: Dispatch<SetStateAction<LocalStorageState>>;
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}
const FullNavbar = ({
  userById,
  userId,
  setUserId,
  refetchUser,
}: FullNavbarProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const resetConfirmation = async () => {
    refetchUser();
    localStorage.removeItem("token");
  };

  return (
    <Navbar className="bg-white border-gray-100 rounded-md shadow-lg">
      <NavbarBrand>
        <RiRestaurantFill size="14px" color="black"/>
        <strong className="inline-flex capitalize animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-md text-transparent">
          MAGNOLIAS
        </strong>
      </NavbarBrand>
      {userById?.data?.role === "ADMIN" ? (
        <NavbarContent justify="center">
          <NavbarItem>
            <Link href="/" className="text-sm flex flex-row">
              <span className="mr-1">
                <GrUserAdmin size="20px" />
              </span>
              Admin
            </Link>
          </NavbarItem>
        </NavbarContent>
      ) : null}

      {!userById?.data ? null : (
        <NavbarContent justify="end">
          <>
           
            <NavbarItem className="">
              <button
                className="inline-flex h-7 w-auto px-2 py-0.5 font-sans
            animate-background-shine items-center 
            justify-center 
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] 
             text-sm font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 
            focus:ring-slate-400 
            focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105
             hover:shadow-xl hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
             hover:bg-[length:200%_100%]"
                onClick={() => {
                  resetConfirmation();
                  router.replace("/register");
                }}
              >
                Cerrar sesión{" "}
                <span className="ml-1">
                  <IoIosLogOut size="14px" />
                </span>
              </button>
            </NavbarItem>
          </>
        </NavbarContent>
      )}
    </Navbar>
  );
};

export default FullNavbar;
