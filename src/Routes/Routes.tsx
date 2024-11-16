import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Customers from "../Pages/Customers";
import Contacts from "../Pages/Contacts";
import Leads from "../Pages/Leads";
import Dashboard from "../Pages/Dashboard";
import CustomerInfo from "../Pages/CustomerInfo";

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
                path: "/leads",
                element: <Leads />,
            },
            {
                path: "/customer",
                element: <CustomerInfo />,
            },
        ],
    },
]);

export default Routers;
