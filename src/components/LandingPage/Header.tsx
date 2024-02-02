/**
 * @file src/components/LandingPage/Header.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Header Component
 * @version 1.0
 * @date 
 *
 */

/* Use client side render  */
'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "../ui/navigation-menu";
import { cn } from "@/src/lib/utils";
import { Button } from "../ui/button";

const routes = [
    { title: 'Features', path: "#features" },
    { title: 'Resources', path: "#resources" },
    { title: 'Pricing', path: "#pricing" },
    { title: 'Testimonials', path: "#testimonial" },
]

const components: { title: string; href: string; description: string }[] = [
    {
        title: 'Alert Dialog',
        href: '#',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '#',
        description:
            'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '#',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '#',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '#',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '#',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
];

/**
 * @brief Header Component
 * 
 * @returns The JSX Component for the Header
 */
const Header = () => {

    const [path, setPath] = useState<string>('#products')

    return (
        <header className="p-4 flex justify-center items-center ">
            <Link href={'/'} className="w-full justify-left items-center flex gap-2">
                <Image src="./cypresslogo.svg" alt="Cypress Logo" width={25} height={25} />
                <span className="font-semibold dark:text-white text-2xl first-letter:ml-2">worksp4ce.</span>
            </Link>
            <NavigationMenu className="hidden md:block ">
                <NavigationMenuList className="gap-6">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger onClick={() => { setPath("#resources") }} className={cn({
                            'dark: text-white': path === "#resources",
                            'dark:text-white/40': path !== "#resources",
                            'font-normal': true,
                            'text-xl': true,
                        })}>
                            Resources
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] ld:w-[500px] lg:grid-cols-[.75rf_1fr]">
                                <li className="row-span-3">
                                    <span className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                                        Welcome
                                    </span>
                                </li>
                                <ListItem href="#" title="Introduction">
                                    Re-usable Components built with Tailwind CSS
                                </ListItem>
                                <ListItem href="#" title="Installation">
                                    How to install dependencies and run the project
                                </ListItem>
                                <ListItem href="#" title="Typhography">
                                    Styles for the text elements
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger onClick={() => { setPath('#pricing') }} className={cn({
                            'dark: text-white': path === "#pricing",
                            'dark:text-white/40': path !== "#pricing",
                            'font-normal': true,
                            'text-xl': true,
                        })}>
                            Pricing
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:grid-fow-2">
                                <ListItem title="Pro Plan" href={'#'}>
                                    Unlock all features
                                </ListItem>
                                <ListItem title="Free Plan" href={'#'}>
                                    Great for beginners
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2 md:w-[500px] lg:w-[600px]">
                                {components.map((component) => (
                                    <ListItem key={component.title} title={component.title} href={component.href}>
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href={'#'}>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), {
                                'dark: text-white': path === "#testimonial",
                                'dark:text-white/40': path !== "#testimonial",
                                'font-normal': true,
                                'text-xl': true,
                            })}>
                                Testimonial
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <aside className=" flex w-full gap-2 justify-end">
                <Link href={'/login'}>
                    <Button variant='secondary' className="p-1 hidden sm:block">Login</Button>
                </Link>
                <Link href="/signup">
                    <Button className="p-1 hidden sm:block">Sign up</Button>
                </Link>
            </aside>
        </header >
    )
}

export default Header

/**
 * @brief List Item Component
 * 
 * @param {React.ComponentPropsWithoutRef<'a'>} props
 * @returns The JSX Component for the List Item
 */
const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<'a'>>(({ className, title, children, ...props }, ref) => {

    return <li>
        <NavigationMenuLink asChild>
            <a ref={ref} className={cn('group block select-none space-y-1 font-medium leading-none')} {...props}>
                <div className="text-white text-sm font-medium leading-none">
                    {title}
                </div>
                <p className="group-hover:text-white/70 line-clamp-2 text-sm leading-snug text-white/40">
                    {children}
                </p>
            </a>
        </NavigationMenuLink>
    </li>
})

ListItem.displayName = "ListItem"