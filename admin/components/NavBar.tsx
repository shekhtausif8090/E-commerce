import React from "react";
import MainNav from "./MainNav";
import StoreSwitcher from "./store-switcher";
import prisma from "@/lib/prismadb";
import { auth } from "@/auth";

async function NavBar() {
  const session = await auth();

  const stores = await prisma.store.findMany({
    where: {
      userId: session?.user?.id,
    },
  });
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">Hi</div>
      </div>
    </div>
  );
}

export default NavBar;
