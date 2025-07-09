import { Outlet } from "react-router";
// __ __ Components/Helpers __ __ //
import Header from "./Header/header";
import Footer from "./Footer/footer";

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
