// app/(private routes)/layout.tsx
import { getMe } from "@/lib/api/serverApi";
import { redirect } from "next/navigation";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await getMe();
  } catch (e) {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
