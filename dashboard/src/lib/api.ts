import Axios from "axios"

export const api = Axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  withXSRFToken: true,
})

export const getCsrfToken = () => {
  return api.get("/sanctum/csrf-cookie")
}
