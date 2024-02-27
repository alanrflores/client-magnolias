import React, { useEffect, useState } from "react";
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
} from "@nextui-org/react";
import { FaRegClock } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { updateScheduleUser } from "../../../services/queries/Queries";

interface formUpdateProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  user: any;
  refetch: () => void;
  userId: string;
  selectedScheduleUpdateId: string;
}

const FormUpdate = ({
  isOpen,
  onOpenChange,
  onClose,
  user,
  refetch,
  userId,
  selectedScheduleUpdateId,
}: formUpdateProps) => {
  const entryTimeLoad = user?.schedule
    .map((schedule: any) =>
      schedule.entryTime ? new Date(schedule.entryTime).toLocaleString() : ""
    )
    .toString();
  const exitTimeLoad = user?.schedule
    .map((schedule: any) =>
      schedule.exitTime ? new Date(schedule.exitTime).toLocaleString() : ""
    )
    .toString();

  const [values, setValues] = useState({
    entryTime: entryTimeLoad,
    exitTime: exitTimeLoad,
  });

  const queryClient = useQueryClient(); // eslint-disable-line
  const updateMutation = useMutation(updateScheduleUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      refetch();
    },
  });

  const handleSendUpdate = async () => {
    try {
      if (!userId) return console.error("No user id");
      if (!selectedScheduleUpdateId) return console.error("No schedule id");
      updateMutation.mutate({
        userId,
        scheduleId: selectedScheduleUpdateId,
        scheduleData: values,
      });
      onClose();
    } catch (error) {
      console.error("Error updating schedule", error);
    }
  };

  useEffect(() => {
    setValues({
      entryTime: entryTimeLoad,
      exitTime: exitTimeLoad,
    });
  }, [user]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="opaque"
      onClose={onClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar horarios
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                endContent={
                  <FaRegClock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Horario de entrada"
                placeholder="Ingrese su nuevo horario de entrada"
                onChange={(e) =>
                  setValues({ ...values, entryTime: e.target.value })
                }
                value={values.entryTime}
                className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
              />
              <Input
                endContent={
                  <FaRegClock className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Horario de salida "
                placeholder="Ingrese su nuevo horario de salida"
                onChange={(e) =>
                  setValues({ ...values, exitTime: e.target.value })
                }
                value={values.exitTime}
                className="text-black bg-white border border-gray-100 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="flat"
                className="font-semibold"
                onPress={onClose}
              >
                Cerrar
              </Button>
              <Button
                color="success"
                className="text-white font-semibold"
                onPress={handleSendUpdate}
              >
                Actualizar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default FormUpdate;
