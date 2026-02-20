import SideBar from "@/components/Shared/SideBar";
import { Spinner } from "@/components/ui/spinner";
import { useGetAuthStatus } from "@/lib/query";
import { Outlet, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useEffect } from "react";

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
    return <Spinner />;
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
