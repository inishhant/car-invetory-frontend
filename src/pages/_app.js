import SidebarLayout from "@/components/Layout/SidebarLayout";
import { UserProvider } from "@/context/UserContext";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <UserProvider>
      <SidebarLayout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}>
      <Component {...pageProps} />
      </SidebarLayout>
    </UserProvider>
  );
}
