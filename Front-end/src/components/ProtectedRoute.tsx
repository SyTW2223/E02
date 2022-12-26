import { Navigate } from 'react-router-dom'
export const ProtectedRoute = ({children}) => {
  const user = JSON.parse(localStorage.getItem('usuario')|| '{}')
  if (!user.token) {
    return <Navigate to="/" />
  }
  return children
}
