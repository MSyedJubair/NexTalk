import { useGetAuthStatus } from "@/lib/query";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAuthStatus();

  if (data) {
    navigate('/')
  }
  
  return <Outlet />;
};

export default AuthLayout;
