import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background grid grid-cols-14">
      <div className="border-b border-dashed border-zinc-700 col-span-1 py-3" />

      <nav
        className=" border-b border-x border-zinc-700 p-3 flex items-center justify-between col-span-12"
        aria-label="Primary Navigation"
      >
        {/* <div className="flex items-center gap-6"> */}
        <Link href="/" className="text-xl font-semibold">
          Logo
        </Link>

        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
        {/* </div> */}

        <div>
          <Button variant={"secondary"} className={"mr-2"}>Dashboard</Button>
          <Button>Sign In</Button>
        </div>
      </nav>

      <div className="border-b border-dashed border-zinc-700 col-span-1 py-3" />
    </header>
  );
}

export default Navbar;
