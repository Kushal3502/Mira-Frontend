import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" mt-14 border-t border-dashed">
      <Navbar />

      <main className="grid grid-cols-14">
        <section className=" col-span-1 py-3" />
        <section className=" col-span-12 border-x-2">{children}</section>
        <section className="col-span-1 py-3" />
      </main>
    </div>
  );
}
