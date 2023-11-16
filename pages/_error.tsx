import Image from "next/image";
import React from "react";

import ErrorImage from "@assets/error.png";

function ErrorPage() {
  return (
    <div className="error-container">
      <Image
        className="max-w-full animate-bounce h-auto"
        src={ErrorImage}
        alt="not found"
      />
    </div>
  );
}

export default ErrorPage;
