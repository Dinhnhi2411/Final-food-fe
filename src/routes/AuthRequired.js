
import { Navigate, useLocation } from "react-router-dom";
import LoadingScreen from "../components/loadingScreen/LoadingScreen";
import useAuth from "../hooks/useAuth";

function AuthRequire({ children }) {
  const { isAuthenticated, isInitialized } = useAuth();
  
  const location = useLocation();
  if (!isInitialized) {
    return <LoadingScreen />;
  }


  if (!isAuthenticated ) {
   return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
}

export default AuthRequire;
