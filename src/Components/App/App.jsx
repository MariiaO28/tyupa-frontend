import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute.jsx";
const PetPage = lazy(() => import("../../Pages/PetPage/PetPage.jsx"));
const PetSignUpPage = lazy(() =>
  import("../../Pages/PetSignUpPage/PetSignUpPage.jsx")
);
const SignUpPage = lazy(() =>
  import("../../Pages/PetSignUpPage/PetSignUpPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../Pages/NotFoundPage/NotFoundPage.jsx")
);
function App() {
  return (
    <Suspense fallback="Page loading...">
      <Routes>
        <Route
          path="/user-registration"
          element={
            <RestrictedRoute
              component={<SignUpPage />}
              redirectTo={"/petInfo/:petId"}
            />
          }
        />
        <Route
          path="/pet-registration"
          element={
            <RestrictedRoute
              component={<PetSignUpPage />}
              redirectTo={"/petInfo/:petId"}
            />
          }
        />
        <Route
          path="/petInfo/:petId"
          element={
            <PrivateRoute
              component={<PetPage />}
              redirectTo={"/pet-registration"}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
