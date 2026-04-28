"use client";

import dynamic from "next/dynamic";

const ThreePortfolioApp = dynamic(
  () => import("@/three-portfolio/ThreePortfolioApp"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          minHeight: "100vh",
          background: "#050810",
          color: "#eae5ec",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        Loading 3D experience…
      </div>
    ),
  }
);

export default function ThreeDPortfolioClient() {
  return <ThreePortfolioApp />;
}
