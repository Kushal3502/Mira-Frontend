import { ComponentExample } from '@/components/component-example';
import Navbar from '@/components/Navbar';

export default function Page() {
  return (
    <div className="h-full">
      <Navbar />

      <main className="grid grid-cols-14 pt-14">
        <section className=" col-span-1 py-3" />
        <section className=" col-span-12 border-x border-zinc-700 min-h-screen">
          <ComponentExample />
        </section>
        <section className="col-span-1 py-3" />
      </main>
    </div>
  );
}
