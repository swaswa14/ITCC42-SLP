import axios from "axios";

export const axiosApi = axios.create({
  baseURL: process.env.base_url,
});

export const getAllProjects = async () => {
  try {
    const res = await axiosApi.get("projects/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
