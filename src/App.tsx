import AuthLayout from "./_auth/AuthLayout";
import { Home } from "./_root/pages";
import RootLayout from "./_root/RootLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import "./globals.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        {/* private Routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
