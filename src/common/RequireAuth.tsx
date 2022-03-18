import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export const RequireAuth = ({ children, redirectTo }: { children: JSX.Element; redirectTo: string }) => {
  
  const isLoggedIn = useAppSelector(state => state.user.status === "logged");

  console.log("RequireAuth: isLoggedIn:", isLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}