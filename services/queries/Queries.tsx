import axios from "axios";
import { LocalStorageState } from "../hooks/useLocalStorage";
import { QueryClient } from "react-query";

const queryClient = new QueryClient();

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL_LOCAL;

export async function getAllUser() {
  const response = await axios.get(`${baseURL}/v1/users`);
  if (!response.data) {
    throw new Error("Error getting all users");
  }
  return response.data;
}

export async function getUserById({ queryKey }: any) {
  const [_key, id] = queryKey;
  const response = await axios.get(`${baseURL}/v1/users/${id}`);
  if (!response.data) {
    throw new Error("Error getting user by id");
  }
  return response.data;
}

export async function getCreateUser(userData: User) {
  const response = await axios.post(`${baseURL}/v1/users`, userData);
  if (!response.data) {
    throw new Error("Error creating user");
  }
  return response.data;
}

export async function getDeleteUser({ queryKey }: any) {
  const [_key, id] = queryKey;
  const response = await axios.delete(`${baseURL}/v1/users/${id}`);
  if (!response.data) {
    throw new Error("Error deleting user");
  }
  return response.data;
}

export async function getUpdateUser({ queryKey }: any) {
  const [_key, id, userData] = queryKey;
  const response = await axios.put(`${baseURL}/v1/users/${id}`, userData);
  if (!response.data) {
    throw new Error("Error updating user");
  }
  return response.data;
}

export async function login({ email, password }: UserResume) {
  const response = await axios.post(`${baseURL}/v1/auth/login`, {
    email,
    password,
  });
  if (!response.data) {
    throw new Error("Error logging in");
  }
  // console.log(response.data);
  return response.data;
}

export const mutationFn = async (userId: LocalStorageState) => {
  const response = await axios.post(`${baseURL}/v1/schedules`, {
    user: userId,
  });
  if (!response.data) {
    throw new Error("Error creating schedule");
  }
  return response.data;
};

export const fetchQRCodeUrl = async (scheduleId: string) => {
  const url = `${baseURL}/v1/schedules/${scheduleId}`;
  const response = await axios.get(url);
  if (!response.data) {
    throw new Error("Network response was not ok");
  }
  return response.data;
};

export async function getAllSchedules() {
  const response = await axios.get(`${baseURL}/v1/schedules`);
  if (!response.data) {
    throw new Error("Error getting all users");
  }
  return response.data;
}

export const deleteScheduleUser = async ({
  userId,
  scheduleId,
}: {
  userId: any;
  scheduleId: any;
}) => {
  try {
    const response = await axios.delete(
      `${baseURL}/v1/schedules/${userId}/${scheduleId}`
    );
    if (!response.data) {
      throw new Error("Error deleting schedule");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error deleting schedule");
  }
};

export const updateScheduleUser = async ({
  userId,
  scheduleId,
  scheduleData,
}: {
  userId: any;
  scheduleId: any;
  scheduleData: any;
}) => {
  // console.log(userId, scheduleId, scheduleData);
  try {
    const response = await axios.put(
      `${baseURL}/v1/schedules/${userId}/${scheduleId}`,
      scheduleData
    );

    if (!response.data) {
      throw new Error("Error updating schedule");
    }
    return response.data;
  } catch (error) {
    throw new Error("Error updating schedule");
  }
};
