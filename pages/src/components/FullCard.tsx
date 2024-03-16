import React from "react";
import { Card, CardHeader, CardBody, Divider, User } from "@nextui-org/react";
import Moment from "react-moment";
import { useRouter } from "next/router";
import Link from "next/link";

interface Props {
  users: any;
}

export default function FullCard({ users }: Props) {
  const localeEs = useRouter().locale === "en";

  return (
    <>
      {users &&
        users.slice(1)?.map(
          (user: any) =>
            user.schedule.length > 0 ? (
              <Card className="text-sm">
                <CardHeader className="flex gap-3">
                  <User name className="w-10 h-8" />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-sm text-default-500">{user.email}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>
                    {user?.schedule
                      ?.sort(
                        (a: any, b: any) =>
                          new Date(b.entryTime).getTime() -
                          new Date(a.entryTime).getTime()
                      )
                      .slice(0, 1)
                      .map((schedule: any , index: number) => (
                        <div key={index} className="flex flex-col">
                          <p className="text-sm font-semibold">
                            Entrada:{" "}
                            <Moment format="DD/MM/YYYY HH:mm:ss" locale="es">
                              {schedule.entryTime}
                            </Moment>{" "}
                          </p>
                          <p className="text-sm font-semibold">
                            Salida:{" "}
                            {schedule.exitTime ? (
                              <Moment format="DD/MM/YYYY HH:mm:ss" locale="es">
                                {schedule.exitTime}
                              </Moment>
                            ) : (
                              <span className="text-red-500">
                                No hay horario de salida registrado
                              </span>
                            )}
                          </p>
                        </div>
                      ))}
                    {user.schedule.length >= 1 && (
                      <div className="flex justify-center bg-black w-20 p-0.5 rounded-md items-center mt-2">
                      <Link href={`/list/${user._id}`}>
                        <p className="text-xs font-semibold text-white">
                          Ver más
                        </p>
                      </Link>
                      </div>
                    )}
                  </p>
                </CardBody>
                <Divider />
              </Card>
            ) : (
              <Card className="">
                <CardHeader className="flex gap-3">
                  <User name className="w-10 h-8" />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-sm text-default-500">{user.email}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p className="text-red-500 text-sm font-semibold">
                    No hay horarios registrados
                  </p>
                </CardBody>
                <Divider />
              </Card>
            )
        )}
    </>
  );
}
