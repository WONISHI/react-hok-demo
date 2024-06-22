import { createBrowserRouter } from "react-router-dom";
import Login from '../pages/Login';
import Main from "../pages/Main";
import Home from "../pages/Home";
import Mail from "../pages/mail";
import User from "../pages/user";
import OtherPage1 from "../pages/other/otherPage1";
import OtherPage2 from "../pages/other/otherPage2";

const routes = [
  {
    path:'/login',
    Component:Login
  },
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "home",
        Component: Home,
      },
      {
        path: "mail",
        Component: Mail,
      },
      {
        path: "user",
        Component: User,
      },
      {
        path: "other",
        Children: [
          {
            path: "otherPage1",
            Component: OtherPage1,
          },
          {
            path: "otherPage2",
            Component: OtherPage2,
          },
        ],
      }
    ],
  },
];
export default createBrowserRouter(routes);
