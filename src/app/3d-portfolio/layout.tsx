import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manideep Grandhe | 3D Portfolio",
  description:
    "Interactive 3D portfolio — healthcare IT, React, TypeScript, Java, and Ruby on Rails.",
};

export default function ThreeDPortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
