import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

type dataType = {
  children? : JSX.Element
}

export function ProtectedRoute(data : dataType) {
  const user = useAppSelector((state) => state.userState.userData)
  if (!user.token) {
    return <Navigate to={"/login"}/>
  }

  return data.children ? data.children : <Outlet/>
}
