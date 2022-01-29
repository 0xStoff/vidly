import httpService from "./httpService";
const apiEndpoint = `/users`;

export async function register(user) {
  return await httpService.post(apiEndpoint, user);
}
