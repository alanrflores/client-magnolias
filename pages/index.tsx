// import { Inter } from "next/font/google";
import FullNavbar from "./src/components/FullNabvar";
import { getAllUser, getUserById } from "../services/queries/Queries";
import { useQuery } from "react-query";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../services/hooks/useLocalStorage";
import Qrcodex from "./src/components/Qrcodex";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoMdQrScanner } from "react-icons/io";
import { MdQrCodeScanner } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  ScrollShadow,
  Tooltip,
} from "@nextui-org/react";
import { Calendar, momentLocalizer, dayjsLocalizer } from "react-big-calendar";
import moment from "moment";
import { CiCalendarDate } from "react-icons/ci";
import "react-big-calendar/lib/css/react-big-calendar.css";
import FullCard from "./src/components/FullCard";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  const [userId, setUserId] = useLocalStorage("token", null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const { data: fetchUser } = useQuery("users", getAllUser);
  const [isChangeText, setIsChangeText] = useState(false);
  const {
    data: userById,
    refetch: refetchUser,
    isLoading,
    isError,
  } = useQuery(["user", userId], getUserById);

  const isNotAdmin = fetchUser?.data?.map((user: any) => user);
  const localizer = momentLocalizer(moment);
  const eventsMap =
    fetchUser && fetchUser?.data?.map((user: any) => user.schedule);

  const userRoleIsNotAdmin = isNotAdmin?.find(
    (user: any) => user.role !== "ADMIN"
  );
  const events = [
    {
      title:
        fetchUser && fetchUser?.data?.length > 0 && userRoleIsNotAdmin
          ? "Horarios registrados"
          : "No hay horarios registrados",
      start: moment(eventsMap?.[0]?.entryTime).toDate(),
      end: moment(eventsMap?.[0]?.exitTime).toDate(),
    },
  ];

  const components = {
    event: (props: any) => {
      return (
        <Tooltip
          key={"primary"}
          color={
            fetchUser && fetchUser?.data?.length > 0 && userRoleIsNotAdmin
              ? "success"
              : "warning"
          }
          content={props.event.title}
          className=""
        >
          <button onClick={onOpen} className="flex flex-col">
            <CiCalendarDate size="14px" />
            <span className="text-xs">{props.event.title}</span>
          </button>
        </Tooltip>
      );
    },
  };
  useEffect(() => {
    if (!userId) {
      router.replace("/register");
    }
  }, [userId, router]);

  const toggleScanner = () => {
    setIsScannerVisible(!isScannerVisible);
  };

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
    <>
      {userId && (
        <>
          <FullNavbar
            userById={userById}
            refetchUser={refetchUser}
            userId={userId}
            setUserId={setUserId}
          />
          {userById && userById.data && userById.data.role !== "ADMIN" ? (
            <main>
              <div className="flex flex-col justify-center items-center bg-gray-800 px-1 py-1 h-screen">
                <div className="mt-10 flex justify-center flex-col">
                  <strong
                    className="text-sm flex flex-row text-black font-sans bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 p-4"
                    role="alert"
                  >
                    {!isChangeText ? (
                      <>
                        Ingresar horario
                        <span className="ml-1">
                          <IoMdQrScanner color="red" size="20px" />
                        </span>
                      </>
                    ) : (
                      <>
                        Se registro su horario, no te olvides de cerrar sesión
                        <span className="ml-1">
                          <IoCheckmarkDoneSharp color="green" size="20px" />
                        </span>
                      </>
                    )}
                  </strong>
                  <br />
                  <br />
                  {!isChangeText && (
                    <div className="text-center">
                      {" "}
                      <button
                        className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-200 w-18"
                        onClick={toggleScanner}
                      >
                        <p className="text-bold text-black font-sans flex flex-row">
                          Escanear{" "}
                          <span className="ml-2">
                            <MdQrCodeScanner size="24px" />
                          </span>
                        </p>
                      </button>
                    </div>
                  )}
                </div>

                {isScannerVisible && !isChangeText && (
                  <div className="mt-20">
                    <Qrcodex
                      userId={userId}
                      toggleScanner={toggleScanner}
                      isChangeText={isChangeText}
                      setIsChangeText={setIsChangeText}
                    />
                  </div>
                )}
              </div>
            </main>
          ) : (
            <>
              <div className="flex flex justify-center items-center bg-gray-800 flex-col h-screen">
                <h1 className="mt-10 font-semibold text-white">
                  Lista de usuarios con sus horarios
                </h1>
                <div>
                  <button
                    className="mt-3 inline-flex h-12 font-sans
              animate-background-shine items-center
              justify-center
              rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%]
              px-6 font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105 hover:shadow-xl hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] hover:bg-[length:200%_100%]"
                    onClick={() => router.push("/code")}
                  >
                    Obtener QR
                  </button>
                </div>
                <div className="mt-1 text-black">
                  <Calendar
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    events={events}
                    style={{
                      width: 350,
                      height: 420,
                      margin: "auto",
                      marginTop: 50,
                      marginBottom: 50,
                      border: "1px solid #ccc",
                      borderRadius: 10,
                      padding: 6,
                      backgroundColor: "white",
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
                    }}
                    views={["month", "week", "day"]}
                    view="month"
                    components={components}
                    className="text-black"
                  />
                </div>
              </div>

              <Modal
                size="sm"
                backdrop={"blur"}
                isOpen={isOpen}
                placement="center"
                scrollBehavior="inside"
                onClose={onClose}
                className="bg-gray-800"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ScrollShadow>
                        <ModalHeader className="flex flex-col gap-1">
                          <h2 className="text-semibold text-white">Lista</h2>
                        </ModalHeader>
                        <ModalBody>
                          {userRoleIsNotAdmin ? (
                            <FullCard users={isNotAdmin} />
                          ) : (
                            <h1 className="text-white">
                              No hay usuarios registrados
                            </h1>
                          )}
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            className="bg-red-500"
                            size="sm"
                            variant="light"
                            onPress={onClose}
                          >
                            <span className="text-white font-semibpñd">
                              Cerrar
                            </span>
                          </Button>
                        </ModalFooter>
                      </ScrollShadow>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </>
          )}
        </>
      )}
    </>
  );
}
