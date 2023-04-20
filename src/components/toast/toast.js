import React from "react";
import { Toaster } from "react-hot-toast";

const Toast = () => {
  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#fde68a",
          },

          duration: 3000,
        }}
      />
    </>
  );
};

export { Toast };
