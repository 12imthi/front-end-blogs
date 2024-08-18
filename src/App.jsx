import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./components/Footer";

function App() {
    const location = useLocation(); // Hook to get the current location

  
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    return (
        <>
            <div className="bg-bgPrimary min-h-screen flex flex-col">
                {!isAuthPage && <Navbar />} {/* Render Navbar only if not on auth pages */}

                <ToastContainer /> {/* Add ToastContainer here */}

                <div className="flex-grow">
                    <Outlet />
                </div>

                {!isAuthPage && <Footer className="mt-auto" />} {/* Render Footer only if not on auth pages */}
            </div>
        </>
    );
}

export default App;
