import Gate from "@components/gate";
import Login from "@views/login";
import Register from "@views/register";
import Profile from "@views/profile";
import PasswordReset from "@views/password/reset";

export default [
  {
    path: "/",
    element: <Gate view={<Login />} restricted={0} />,
  },
  {
    path: "/register",
    element: <Gate view={<Register />} restricted={0} />,
  },
  {
    path: "/password-reset",
    element: <Gate view={<PasswordReset />} restricted={0} />,
  },
  {
    path: "/profile",
    element: <Gate view={<Profile />} restricted={1} />,
  },
];
