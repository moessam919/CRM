import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Customers from "../Pages/Customers";
import Contacts from "../Pages/Contacts";
import Leads from "../Pages/Leads";
import Dashboard from "../Pages/Dashboard";
import CustomerInfo from "../Pages/CustomerInfo";
import Messages from "../Pages/Messages";
import MessageDetails from "../Components/MessageDetails";
import Campain from "../Pages/Campain";
import CreateCampaignModal from "../Components/Campain Com/CreateCampaignModal";
import CampaignInfo from "../Components/Campain Com/CampaignInfo";

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
                path: "/customer/:id",
                element: <CustomerInfo />,
            },
            {
                path: "/contacts",
                element: <Contacts />,
            },
            {
                path: "/campaign",
                element: <Campain />,
            },
            {
                path: "/campaign/:id/",
                element: <CampaignInfo />,
            },
            {
                path: "/create-campaign",
                element: <CreateCampaignModal />,
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
        ],
    },
]);

export default Routers;
