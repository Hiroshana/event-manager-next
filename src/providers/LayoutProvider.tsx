"use client";
import { UserButton } from "@clerk/nextjs";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const menusForAdmin = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Events",
      path: "/admin/events",
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
    },
    {
      title: "Users",
      path: "/admin/users",
    },
    {
      title: "Reports",
      path: "/admin/reports",
    },
  ];

  const menusForUsers = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Bookings",
      path: "/admin/bookings",
    },
  ];
  const pathname = usePathname();
  const router = useRouter();
  const [menusToShow, setMenusToShow] = React.useState<any[]>([]);
  const isPrivateRoute = !["/sign-in", "/sign-up"].includes(pathname);
  const getUserData = async () => {
    try {
      const response = await axios.get("/api/current-user");
      if (response.data.user.isAdmin) {
        setMenusToShow(menusForAdmin);
      } else {
        setMenusToShow(menusForUsers);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="bg-gray-200 h-screen lg:px-20 px-5">
      {isPrivateRoute && (
        <div className="bg-white flex justify-between items-center shadow p-3">
          <h1 className="text-gray-600 font-semibold text-2xl">
            Event Manager
          </h1>

          <div className="flex gap-5 items-center">
            <Dropdown size="sm">
              <DropdownTrigger>
                <Button variant="bordered">Profile</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {menusToShow.map((menu) => (
                  <DropdownItem
                    key={menu.title}
                    onClick={() => {
                      router.push(menu.path);
                    }}
                  >
                    {menu.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      )}

      <div className="p-3">{children}</div>
    </div>
  );
}

export default LayoutProvider;
