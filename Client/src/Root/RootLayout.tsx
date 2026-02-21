import SideBar from "@/components/Shared/SideBar";
import { useGetAuthStatus } from "@/lib/query";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
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
    <ResizablePanelGroup orientation="horizontal" className="w-full h-screen">
      <ResizablePanel
        defaultSize={35}
        maxSize={'50%'}
        minSize={'8%'}
      >
        <div className="h-full">
          <SideBar />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={65}>
        <div className="h-full">
          <Outlet />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default RootLayout;
