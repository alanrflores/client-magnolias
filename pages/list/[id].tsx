import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteScheduleUser,
  getUserById,
  updateScheduleUser,
} from "../../services/queries/Queries";
import {
  Button,
  Tooltip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Moment from "react-moment";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Toaster } from "react-hot-toast";
import FormUpdate from "../src/components/FormUpdate";


const listId = () => {
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenUpdate,
    onOpen: onOpenChangeUpdate,
    onClose: onCloseUpdate,
  } = useDisclosure();
  const router = useRouter();
  const userId = router.query.id;
  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [selectedScheduleUpdateId, setSelectedScheduleUpdateId] = useState("");

  const queryClient = useQueryClient(); // eslint-disable-line
  const { data: userDetails, refetch } = useQuery(
    ["user", userId],
    getUserById
  );
   
  const deleteMutation = useMutation(deleteScheduleUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      refetch();
    },
  });

  const handleOpenDelete = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId);
    onOpenDelete();
  };

  const handleSendDelete = async () => {
    try {
      if (!userId) return console.error("No user id");
      if (!selectedScheduleId) return console.error("No schedule id");

      deleteMutation.mutate({ userId, scheduleId: selectedScheduleId });
      onCloseDelete();
    } catch (error) {
      console.error("Error deleting schedule", error);
    }
  };

  const handleOpenUpdate = (scheduleId: string) => {
    setSelectedScheduleUpdateId(scheduleId);
    onOpenChangeUpdate();
  };


  return (
    <>
      <div className="flex w-full flex-col px-2 py-2 bg-gray-800 h-lvh">
        <div className="flex flex row justify-between px-2 mb-2">
          <h1 className="text-sm font-semibold mb-4 text-white">
            Detalles del usuario
          </h1>
          <button
            className="inline-flex h-7 w-auto px-1.5 py-0.5 font-sans text-xs
            animate-background-shine items-center 
            justify-center 
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] 
            font-medium text-slate-200 transition-colors focus:outline-none focus:ring-2 
            focus:ring-slate-400 
            focus:ring-offset-2 focus:ring-offset-slate-50 hover:scale-105
             hover:shadow-xl hover:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
             hover:bg-[length:200%_100%]"
            onClick={() => router.push("/")}
          >
            Volver
          </button>
        </div>
        <h1 className="text-sm px-2 py-2 font-semibold text-white">
          Nombre: {userDetails?.data?.name}
        </h1>
        <h1 className="text-sm px-2 py-2 font-semibold text-white">
          Email: {userDetails?.data?.email}
        </h1>
       
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gridTemplateRows: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "10px",
          overflowY: "auto",
        }}
         
        >
          {userDetails?.data?.schedule
            ?.sort(
              (a: any, b: any) =>
                new Date(b.entryTime).getTime() -
                new Date(a.entryTime).getTime()
            )
            .map((schedule: any, index: number) => (
              <div
                key={index}
                style={{
                  width: "320px",
                  height: "150px",
                  background: "linear-gradient(to right, rgb(20, 30, 48)",
                  borderRadius: "15px",
                  boxShadow: " 0 0 10px 0 rgb(0 0 0 / 20%)",
                  display: "flex",
                  color: "white",
                  justifyContent: "center",
                  position: "relative",
                  flexDirection: "column",
                  backgroundColor: "linear-gradient(to right, rgb(20, 30, 48)",
                  cursor: "pointer",
                  transition: "all 0.3s ease-in-out",
                  overflow: "hidden",
                  margin: "5px",
                }}
              >
                <div className="flex flex-col mx-auto">
                  <p className="text-sm font-semibold text-white">
                    Entrada:{" "}
                    <span
                      style={{
                        fontSize: "16px",
                        marginTop: "0px",
                        marginLeft: "15px",
                        fontWeight: 600,
                        fontFamily: "Gill Sans",
                      }}
                    >
                      <Moment format="DD/MM/YYYY HH:mm:ss" locale="es">
                        {schedule.entryTime}
                      </Moment>{" "}
                    </span>
                  </p>
                  <p className="text-sm font-semibold text-white py-2">
                    Salida:{" "}
                    {schedule.exitTime ? (
                      <span
                        style={{
                          fontSize: "16px",
                          marginTop: "0px",
                          marginLeft: "25px",
                          fontWeight: 600,
                          fontFamily: "Gill Sans",
                        }}
                      >
                        <Moment format="DD/MM/YYYY HH:mm:ss" locale="es">
                          {schedule.exitTime}
                        </Moment>
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: "16px",
                          marginTop: "0px",
                          marginLeft: "25px",
                          fontWeight: 600,
                          fontFamily: "Gill Sans",
                          color: "red",
                        }}
                      >
                        No hay horario
                      </span>
                    )}
                  </p>
                  <div className="flex justify-between w-full mt-4" key={index}>
                    <Tooltip content="Editar horarios">
                      <span className="text-sm text-default-400 cursor-pointer active:opacity-50">
                        <FaRegEdit
                          size={20}
                          onClick={() => handleOpenUpdate(schedule._id)}
                        />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar horarios">
                      <span className="text-sm text-danger cursor-pointer active:opacity-50">
                        <RiDeleteBin6Line
                          size={20}
                          onClick={() => handleOpenDelete(schedule._id)}
                        />
                      </span>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Modal
        placement="center"
        backdrop="opaque"
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      >
        <ModalContent>
          <ModalHeader>
            <h2 className=" font-semibold">Eliminar horario</h2>
          </ModalHeader>

          <ModalBody>
            <p className="text-red-500 font-semibold">
              Estas seguro que deseas eliminar el horario registrado?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              color="default"
              className="font-semibold"
              onPress={onCloseDelete}
            >
              Cancelar
            </Button>
            <Button
              className="bg-red-500 text-white font-semibold"
              onPress={handleSendDelete}
            >
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />

      <FormUpdate
        user={userDetails?.data}
        isOpen={isOpenUpdate}
        onOpenChange={onOpenChangeUpdate}
        onClose={onCloseUpdate}
        refetch={refetch}
        userId={userId as string}
        selectedScheduleUpdateId={selectedScheduleUpdateId}
      />
    </>
  );
};

export default listId;
