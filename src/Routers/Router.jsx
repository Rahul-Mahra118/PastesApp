import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Components/Home";
import { SinglePaste } from "../Components/SinglePaste";
import { AllPaste } from "../Components/AllPaste";
import { Navbar } from "../Components/Navbar";
import { RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
// Define a layout component with an Outlet for nested routes
const MainLayout = () => (
    <div>
      <Navbar />
      <Outlet /> {/* This will render child routes */}
    </div>
  );
  
  // Configure the routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,  // Parent layout with Navbar
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/paste",
          element: <AllPaste />,
        },
        {
          path: "/pastes/:id",
          element: <SinglePaste />,
        },
      ],
    },
  ]);
  
  const AppRouter = () => <RouterProvider router={router}  future={{
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
}}/>;

  export default AppRouter;