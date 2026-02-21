import Loader from "@/components/Shared/Loader";
import { useGetAuthStatus } from "@/lib/query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetAuthStatus();

  useEffect(() => {
    if (!data && !isLoading) {
      navigate("/");
    }
  }, [isLoading, data, navigate]);

  if (isLoading) {
    return <Loader text="Loading Home Screen..." />;
  }

  return <Outlet />;
};

export default AuthLayout;
