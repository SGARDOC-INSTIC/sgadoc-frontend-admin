import { useCookies } from "@react-smart/react-cookie-service";

export const IsAuthenticated = () =>
  useCookies().getCookie("sgardoc-instic") !== null;
