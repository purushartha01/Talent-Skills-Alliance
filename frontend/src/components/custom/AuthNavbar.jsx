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
import { Bell, Folder, LogOut, MenuIcon, MessageSquare, Settings, SidebarCloseIcon, UnfoldVerticalIcon, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { AuthContext } from "@/context/AuthContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";



const AuthNavbar = () => {


    const { logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const isLargeScreen = useMediaQuery('(min-width: 768px)');
    const [isOpen, setIsOpen] = useState(false);
    const closeDrawer = () => setIsOpen(false);
    const user = useContext(AuthContext).getCurrAuth();

    const links = [
        {
            to: "/",
            text: "Home",
        },
        {
            to: "/explore",
            text: "Explore",
        }
    ];

    const handleLogout = () => {
        logOut();
        if (!isLargeScreen) {
            closeDrawer();
        }
        navigate("/login", { replace: true });
    }

    return (
        isLargeScreen ?
            <div className="h-[10vh] w-full flex flex-row items-center justify-evenly shadow-lg sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
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



                <div className="flex items-center gap-2 md:gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={user?.avatar || "https://cdn.vectorstock.com/i/2000v/28/66/profile-placeholder-image-gray-silhouette-vector-21542866.avif"} alt={user.username} />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user.username}</p>
                                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link to="/user/profile">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/user/teams">
                                        <Folder className="mr-2 h-4 w-4" />
                                        <span>My Teams</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link to="/user/settings">
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Settings</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive/100" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>





            </div>
            :
            <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
                <DrawerHeader className={"h-[10vh] flex flex-row items-center"}>
                    <DrawerTrigger className={"h-full w-1/10 flex items-center justify-center"}>
                        <MenuIcon />
                    </DrawerTrigger>
                    <span className="hidden xs:block  text-xl font-bold text-center w-9/10 font-[Lobster]">
                        Talent & Skills Alliance
                    </span>
                    <span className="block xs:hidden text-xl font-bold text-center w-9/10 font-[Lobster]">
                        TSA
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
                    <DrawerDescription></DrawerDescription>
                    <div className={"flex flex-col items-center h-[80vh]"}>
                        <ul className="w-full flex flex-col justify-center">
                            {links.map((link, index) => {
                                return (
                                    <li key={index} className="w-full h-1/4 mb-2">
                                        <Link to={link.to} className="w-full flex items-center p-2 hover:bg-gray-200 rounded-md text-xl" onClick={closeDrawer}>
                                            {link.text}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <DrawerFooter className={"flex flex-row items-center"}>
                        <div className="w-full h-full flex items-center">
                            <Accordion className="w-full" type="single" collapsible>
                                <AccordionItem value="user-menu">
                                    <AccordionTrigger className="w-full flex flex-row items-center justify-evenly">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user?.avatar || "https://cdn.vectorstock.com/i/2000v/28/66/profile-placeholder-image-gray-silhouette-vector-21542866.avif"} alt={user.username} />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col space-y-1 w-full overflow-hidden">
                                            <p className="text-sm font-medium leading-none">{user.username}</p>
                                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className={"mb-4 pl-8 font-semibold"}>
                                        <Link to="/user/profile" className="flex flex-row items-center mb-2 hover:bg-gray-300" onClick={closeDrawer}>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link to="/user/teams" className="flex flex-row items-center mb-2 hover:bg-gray-300" onClick={closeDrawer}>
                                            <Folder className="mr-2 h-4 w-4" />
                                            <span>My Teams</span>
                                        </Link>
                                        <Link to="/user/settings" className="flex flex-row items-center mb-2 hover:bg-gray-300" onClick={closeDrawer}>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </Link>
                                        {/* TODO: Add user logout functionality */}
                                        <Link to="#" className="flex flex-row items-center mb-2 text-destructive/100 hover:bg-gray-300" onClick={e => { closeDrawer(); handleLogout(); }}>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </Link>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
    )
}

export default AuthNavbar