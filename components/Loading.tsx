"use client";

import { Skeleton } from "antd";
import React from "react";

function Loading() {
  return (
    <div className="wrap max-w-5xl mx-auto min-h-[calc(100vh-120px)] mt-10">
      <Skeleton loading />
    </div>
  );
}

export default Loading;
