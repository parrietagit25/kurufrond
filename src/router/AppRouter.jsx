import { Route, Routes } from "react-router-dom";
import AuthRoutes from "../auth/routes/AuthRoutes";
import { useCheckAuth } from "../hooks";
import KurumaRoutes from "../kuruma/routes/KurumaRoutes";
import CheckingAuth from "../ui/components/CheckingAuth";

const AppRouter = () => {

  const status = useCheckAuth()

  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>
      { (status === "authenticated") ? 
          <Route path="/*" element={<KurumaRoutes />} />
          : <Route path="/auth/*" element={<AuthRoutes />} />
      }
      
      <Route path="/*" element={<AuthRoutes />} />
    </Routes>
  );
};

export default AppRouter;
