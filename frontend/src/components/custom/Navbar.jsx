import { useMediaQuery } from "@/hooks/useMediaQuery"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MenuIcon, SidebarCloseIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";



const Navbar = () => {



  const isLargeScreen = useMediaQuery('(min-width: 768px)');
  const [isOpen, setIsOpen] = useState(false);
  const closeDrawer = () => setIsOpen(false);

  const links = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/explore",
      text: "Explore",
    },
    {
      to: "/contact",
      text: "Contact",
    }
  ];


  return (
    isLargeScreen ?
      <div className="h-[10vh] w-full flex flex-row items-center justify-evenly shadow-lg sticky top-0 z-50">
        <div className="h-full w-1/10 flex items-center justify-center">
          <a className="btn btn-ghost normal-case text-xl font-[Lobster]">TSA</a>
        </div>
        <div className="h-full w-8/10 flex items-center justify-center">
          <ul className="w-1/2   flex flex-row justify-between p-0">
            {links.map((link, index) => {
              return (
                <li key={index} className="w-1/3 ">
                  <Link to={link.to} className="w-full flex items-center justify-center p-2 hover:bg-gray-200 rounded-md text-xl">
                    {link.text}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="h-full w-1/10 flex items-center justify-center px-2">
          <Link to="/login" className="w-full flex items-center justify-center p-2 hover:bg-gray-200 rounded-md text-xl">Login</Link>
        </div>
      </div>
      :
      <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
        <DrawerHeader className={"h-[10vh] flex flex-row items-center"}>
          <DrawerTrigger className={"h-full w-1/10 flex items-center justify-center"}>
            <MenuIcon />
          </DrawerTrigger>
          <span className="text-xl font-bold text-center w-9/10 font-[Lobster]">
            Talent&Skills Alliance
          </span>
        </DrawerHeader>
        <DrawerContent className={"h-screen px-4 py-2 w-1/4"}>
          <DrawerHeader className={" h-[10vh]"}>
            <DrawerTitle className={"flex flex-row items-center justify-between"}>
              <span className={"text-2xl w-9/10"}>Menu</span>
              <DrawerClose className={"w-1/10"}>
                <SidebarCloseIcon size={25} />
              </DrawerClose>
            </DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className={"flex flex-col items-center h-[80vh]"}>
            <ul className="w-full flex flex-col justify-center">
              {links.map((link, index) => {
                return (
                  <li key={index} className="w-full h-1/4">
                    <Link to={link.to} className="w-full flex items-center p-2 hover:bg-gray-200 rounded-md text-xl" onClick={closeDrawer}>
                      {link.text}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </DrawerDescription>
          <DrawerFooter className={"flex flex-row items-center h-[10vh]"}>
            <Link to="/login" onClick={closeDrawer}>
              Login
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  )
}

export default Navbar