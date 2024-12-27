import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Profile from "./Components/Profile";
import Password from "./Components/Password";
import PageNotFound from "./Components/PageNotFound";
import Recovery from "./Components/Recovery";
import Reset from "./Components/Reset";
import UserName from "./Components/UserName";
import Register from "./Components/Register";

// In other words, when you use the AuthorizedUser component in your code, any elements or components that you place between the opening and closing tags of AuthorizedUser will be passed as the children prop to the component.
// <AuthorizedUser>
//   <h1>Hello, world!</h1>
// </AuthorizedUser>
// The h1 element will be passed as the children prop to the AuthorizedUser component.

const AuthorizedUser = ({ children }) => {
  const tokens = localStorage.getItem("token");

  if (!tokens) {
    return (
      <Navigate to={"/"} replace={true}>
        {children}
      </Navigate>
    );
  }
  return children;
};

const UsernameAuthorization = ({ children }) => {
  const userName = localStorage.getItem("username");

  if (!userName) {
    // Corrected here: We need to `return` the Navigate component
    return <Navigate to={"/"} replace={true} />;
  }
  return children;
};

// THIS IS BROWSER ROUTER DEFAULT WORKING BEHAVIOUR SO YOU CAN USE PREVIOUS METHODS ALSO I LIKE THIS METHODS WHY BECAUSE SO EASY TO ORGANIZE THE ROUTERS BUDDY THAT'S WHY.
const router = createBrowserRouter([
  {
    path: "/",
    element: <UserName />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset",
    element: (
      <UsernameAuthorization>
        <Reset />
      </UsernameAuthorization>
    ),
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/profile",
    element: (
      <AuthorizedUser>
        <Profile />
      </AuthorizedUser>
    ),
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
