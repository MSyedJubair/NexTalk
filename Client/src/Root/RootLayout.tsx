import SideBar from "@/components/Shared/SideBar";
import { useGetAuthStatus } from "@/lib/query";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";
import Loader from "@/components/Shared/Loader";

const RootLayout = () => {
  const { data, isLoading, isError } = useGetAuthStatus();
  const navigate = useNavigate();

  if (isError) {
    toast("error");
  }

  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/sign-up");
    }
  }, [isLoading, data, navigate]);

  if (isLoading) {
    return <Loader text="Loading Home Screen..." />;
  }

  return (
    <div className="flex flex-row " >
      <SideBar/>
      <Outlet/>
    </div>
  );
};

export default RootLayout;
