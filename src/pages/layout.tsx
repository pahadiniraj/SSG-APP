import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <ToastContainer />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Provider>
    </>
  );
};

export default Layout;
