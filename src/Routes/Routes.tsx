import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Customers from "../Pages/Customers";
import Contacts from "../Pages/Contacts";
import Leads from "../Pages/Leads";
import Dashboard from "../Pages/Dashboard";

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
        ],
    },
]);

export default Routers;
