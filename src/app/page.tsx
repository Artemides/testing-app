"use client";

import Image from "next/image";
import { User, UserMessage } from "../../mocks/types";
import { useEffect, useState } from "react";
import { response } from "msw";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<UserMessage | null>(null);
  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) {
        throw new Error("error getting users");
      }
      const users_ = await response.json();
      setUsers(users_);
    };
    getUsers();
  }, []);

  const handleSelectUser = async (userId: number) => {
    const response = await fetch(
      `http://localhost:3000/api/users/${userId}/messages`
    );
    if (!response.ok) {
      throw new Error("error getting user messages");
    }
    const userMessages = await response.json();
    setMessages(userMessages);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <section id="User Messages" className="grid grid-cols-2 gap-2 mt-4">
        <div className="flex gap-4 flex-wrap ">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col gap-2 items-center p-4 ring-[1px] ring-sky-900/50 rounded-md hover:ring-orange-500 hover:bg-orange-500/10"
              onClick={() => handleSelectUser(user.id)}
            >
              <span>
                {user.first_name} {user.last_name}
              </span>
              <small className="text-orange-500">{user.email}</small>

              <Image
                width={48}
                height={48}
                src={user.avatar}
                alt={`${user.first_name}-${user.last_name}`}
                className=" rounded-full ring-[1px] ring-sky-900"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-2">
          {!messages && (
            <p className="text-center text-yellow-300 font-bold">
              This users has not sent any messages yet
            </p>
          )}
          {messages &&
            messages.messages.map((msg) => (
              <div
                key={msg.sentAt}
                className="p-2 rounded-lg ring-[1px] ring-sky-500 "
              >
                <p>{msg.message}</p>
                <small className="text-center">{msg.sentAt}</small>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
