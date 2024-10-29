import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routers from "./Routes/Routes.tsx";

// css file
import "./index.css";
createRoot(document.getElementById("root")!).render(
    <RouterProvider router={Routers} />
);
