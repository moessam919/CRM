import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Customers from "../Pages/Customers";
import Contacts from "../Pages/Contacts";
import Leads from "../Pages/Leads";
import Dashboard from "../Pages/Dashboard";
import CustomerInfo from "../Pages/CustomerInfo";
import Messages from "../Pages/Messages";
import MessageDetails from "../Components/MessageDetails";

const Routers = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/customers",
                element: <Customers />,
            },
            {
                path: "/contacts",
                element: <Contacts />,
            },
            {
                path: "/messages",
                element: <Messages />,
            },
            {
                path: "/message/:id",
                element: <MessageDetails />,
            },
            {
                path: "/leads",
                element: <Leads />,
            },
            {
                path: "/customer/:id",
                element: <CustomerInfo />,
            },
        ],
    },
]);

export default Routers;
