import SideBar from "@/components/Shared/SideBar";
import { Spinner } from "@/components/ui/spinner";
import { useGetAuthStatus } from "@/lib/query";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";

const RootLayout = () => {
  const { data, isLoading, isError } = useGetAuthStatus();
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <Spinner/>
    )
  }

  if (!isLoading && !data){
    navigate('/sign-up')
  }

  if (isError) {
    toast('error')
  }

  return (
    <div className="flex flex-row w-full min-h-screen">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
