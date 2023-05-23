import { ProjectType, ProjectTypePost } from "@/types/project";
import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.backend_base_url,
});

export const getAllProjects = async () => {
  try {
    const res = await axiosApi.get("projects/");
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addNewProject = async (data: ProjectTypePost) => {
  try {
    const res = await axiosApi.post("projects/", data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteProject = async (id: number) => {
  try {
    const res = await axiosApi.delete(`projects/${id}/`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateProject = async (data: ProjectType) => {
  try {
    const res = await axiosApi.patch(`projects/${data.id}/`, data);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
