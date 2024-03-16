import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteScheduleUser,
  getUserById,
  updateScheduleUser,
} from "../../services/queries/Queries";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Divider,
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

  const isNotAdmin =
    userDetails && userDetails.data && userDetails.data.role === "ADMIN";

  useEffect(() => {
    if (!userId) {
      router.push("/register");
    }
  }, [userId]);

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

  // console.log(userDetails);
  return (
    <>
      <div className="flex w-full flex-col px-2 py-2 bg-gray-800 h-screen">
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
        <Table removeWrapper aria-label="collection table">
          <TableHeader>
            <TableColumn>EMAIL</TableColumn>
            <TableColumn>HORARIOS</TableColumn>
            <TableColumn>ACCION</TableColumn>
          </TableHeader>
          <TableBody className="flex justify-center items-center">
            <TableRow key="1">
              <TableCell className="align-top text-white font-semibold text-sm">
                {userDetails?.data?.email}
              </TableCell>
              <TableCell className="">
                {userDetails?.data?.schedule
                  ?.sort(
                    (a: any, b: any) =>
                      new Date(b.entryTime).getTime() -
                      new Date(a.entryTime).getTime()
                  )
                  .map((schedule: any, index: number) => (
                    <div key={index} className="w-22">
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-white">
                          Entrada:{" "}
                          <Moment format="DD/MM/YYYY HH:mm:ss" locale="es">
                            {schedule.entryTime}
                          </Moment>{" "}
                        </p>
                        <p className="text-sm font-semibold text-white">
                          Salida:{" "}
                          {schedule.exitTime ? (
                            <Moment format="DD/MM/YYYY HH:mm:ss" locale="es">
                              {schedule.exitTime}
                            </Moment>
                          ) : (
                            <span className="text-red-400">No hay horario</span>
                          )}
                        </p>
                      </div>
                      <Divider className="w-32" />
                    </div>
                  ))}
              </TableCell>

              <TableCell className="align-top">
                {userDetails?.data?.schedule?.map(
                  (schedule: any, index: number) => (
                    <>
                      <div className="relative mt-4 flex" key={index}>
                        <Tooltip content="Editar horarios">
                          <span className="text-sm text-default-400 cursor-pointer active:opacity-50 ml-4">
                            <FaRegEdit
                              size={16}
                              onClick={() => handleOpenUpdate(schedule._id)}
                            />
                          </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Eliminar horarios">
                          <span className="text-sm text-danger cursor-pointer active:opacity-50 mr-10">
                            <RiDeleteBin6Line
                              size={16}
                              onClick={() => handleOpenDelete(schedule._id)}
                            />
                          </span>
                        </Tooltip>
                      </div>
                      <Divider className="w-10" />
                    </>
                  )
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
