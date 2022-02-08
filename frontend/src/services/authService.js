import httpService from "./httpService";
const apiEndpoint = `/auth/local`;

export async function login(data) {
  console.log(data);
  const {
    data: { jwt, user },
  } = await httpService.post(apiEndpoint, data);

  localStorage.setItem("token", jwt);
  localStorage.setItem("user", JSON.stringify(user));
}

export async function logout() {
  localStorage.clear();
}

export function getCurrentUser() {
  // const response = await httpService.get("/users?populate=*");
  // console.log(response);
  try {
    const getUser = localStorage.getItem("user");
    const user = JSON.parse(getUser);
    return user;
  } catch (error) {
    return null;
  }
}
