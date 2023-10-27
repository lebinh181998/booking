import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import DashBoard from "./components/main/DashBoard";
import Login from "./components/account/Login";
import { Provider } from "react-redux";
import store from "./store/index";
import Hotels from "./components/lists/Hotels/Hotels";
import NewHotel, {
  loader as HotelLoader,
} from "./components/new/NewHotel/NewHotel";
import Rooms from "./components/lists/Rooms/Rooms";
import NewRoom, {
  loader as RoomLoader,
} from "./components/new/NewRoom/NewRoom";
import Transactions from "./components/lists/Transactions/Transactions";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <DashBoard />,
        },
        {
          path: "hotels",
          element: <Hotels />,
        },
        {
          path: "new-hotel",
          element: <NewHotel />,
        },
        {
          path: "edit-hotel/:hotelID",
          id: "editHotel",
          element: <NewHotel edit={true} />,
          loader: HotelLoader,
        },
        {
          path: "rooms",
          element: <Rooms />,
        },
        {
          path: "new-room",
          element: <NewRoom />,
        },
        {
          path: "edit-room/:roomID",
          id: "editRoom",
          element: <NewRoom edit={true} />,
          loader: RoomLoader,
        },
        {
          path: "transactions",
          element: <Transactions />,
        },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/admin" />,
    },
    {
      path: "/admin/login",
      element: <Login />,
    },
  ]);
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
