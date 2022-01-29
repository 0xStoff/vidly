import config from "../config.json";
import httpService from "./httpService";
import { toast } from "react-toastify";
const { apiUrl } = config;
const apiEndpoint = `${apiUrl}/users`;

export async function register(user) {
  return await httpService.post(apiEndpoint, user);
}
