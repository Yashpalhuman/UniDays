import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Travel.com",
  description: "All upcoming plans",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
