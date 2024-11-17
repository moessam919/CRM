import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Routers from "./Routes/Routes.tsx";

// store
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

// css file
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <RouterProvider router={Routers} />
    </Provider>
);
