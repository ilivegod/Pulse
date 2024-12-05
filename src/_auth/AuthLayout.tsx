import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10 bg-gray-950 text-gray-50">
            <Outlet />
          </section>
          <div className="hidden xl:block h-screen w-1/2 bg-purple-800"></div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
