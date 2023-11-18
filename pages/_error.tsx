import Image from "next/image";
import React from "react";

import ErrorImage from "@assets/error.png";
import InfoLayout from "@comp/info/InfoLayout";

function ErrorPage() {
  return (
    <InfoLayout>
      <div className="error-container min-h-screen grid place-items-center">
        <Image
          className="max-w-full animate-bounce h-auto"
          src={ErrorImage}
          alt="not found"
        />
      </div>
    </InfoLayout>
  );
}

export default ErrorPage;
