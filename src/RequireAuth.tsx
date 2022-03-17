import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

export const RequireAuth = ({ children, redirectTo }: { children: JSX.Element; redirectTo: string }) => {
  
  const isLoggedIn = useSelector((state: RootState) => state.user.status === "logged");

  console.log("RequireAuth: isLoggedIn:", isLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}