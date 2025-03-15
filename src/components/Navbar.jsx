"use client";
import Link from "next/link";
import Image from "next/image";
import { User, Vote, Moon, Sun } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [darkTheme, setDarkTheme] = useState("false");

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
    window.localStorage.setItem("darkTheme", darkTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="bg-white dark:bg-slate-800 dark:text-frost-white dark:shadow-slate-500 flex flex-row justify-between items-center py-4 md:py-8 px-6 md:px-12 shadow-slate-200  shadow-md">
      <Link href="/">
        <Image src="/ethereum.png" alt="logo" width={50} height={50} />
      </Link>
      <div className="">
        <ul className="flex flex-row justify-evenly gap-6">
          <li className="cursor-pointer dark:hover:text-gray-300 hover:text-zinc-700">
            <Link href="/elections" className="inline-flex ">
              <Vote />
              Elections
            </Link>
          </li>
          <li className="cursor-pointer dark:hover:text-gray-300 hover:text-zinc-700">
            <Link href="/accounts" className="inline-flex">
              <User />
              Account
            </Link>
          </li>
          <li className="cursor-pointer dark:hover:text-gray-300 hover:text-zinc-700">
            <button onClick={toggleTheme}>
              {darkTheme ? <Moon /> : <Sun />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
