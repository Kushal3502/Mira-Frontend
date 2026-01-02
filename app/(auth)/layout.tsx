import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" ">
      <Navbar />

      <main className="grid grid-cols-14 pt-14">
        <section className=" col-span-1 py-3" />
        <section className=" col-span-12 border-x border-zinc-700 min-h-screen">
          {children}
        </section>
        <section className="col-span-1 py-3" />
      </main>
    </div>
  );
}
