/**
 * @file src/components/global/CollaboratorSearch.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief CollaboratorSearch component
 * @version 1.0
 * @date 
 *
 */

/* Use Client side rendering */
'use client';

import { useEffect, useRef, useState } from 'react';

import { User } from '@/src/lib/supabase/supabase.types';
import { useSupabaseUser } from '@/src/lib/providers/supabaseUserProvider';
import { Search } from 'lucide-react';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Button } from '../../ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../../ui/sheet';

interface CollaboratorSearchProps {
    existingCollaborators: User[] | [];
    getCollaborator: (collaborator: User) => void;
    children: React.ReactNode;
}

/**
 * @brief CollaboratorSearch component
 * 
 * @param existingCollaborators 
 * @param getCollaborator 
 * @param children 
 * 
 * @returns JSX.Element
 */
export default function CollaboratorSearch({ children, existingCollaborators, getCollaborator, }: CollaboratorSearchProps) {

    const { user } = useSupabaseUser();
    const [searchResults] = useState<User[] | []>([]);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const onChangeHandler = () => {
        if (timerRef) clearTimeout(timerRef.current);
    };

    const addCollaborator = (user: User) => {
        getCollaborator(user);
    };

    return (
        <Sheet>
            <SheetTrigger className="w-full">{children}</SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Search Collaborator</SheetTitle>
                    <SheetDescription>
                        <p className="text-sm text-muted-foreground">
                            You can also remove collaborators after adding them from the
                            settings tab.
                        </p>
                    </SheetDescription>
                </SheetHeader>
                <div className="flex justify-center items-center gap-2 mt-2">
                    <Search />
                    <Input name="name" className="dark:bg-background" placeholder="Email" onChange={onChangeHandler} />
                </div>
                <ScrollArea className="mt-6 overflow-y-scroll w-full rounded-md">
                    {searchResults.filter(
                        (result) =>
                            !existingCollaborators.some(
                                (existing) => existing.id === result.id)).filter((result) => result.id !== user?.id).map((user) => (
                                    <div key={user.id} className=" p-4 flex justify-between items-center">
                                        <div className="flex gap-4 items-center">
                                            <Avatar className="w-8 h-8">
                                                <AvatarImage src="/avatars/7.png" />
                                                <AvatarFallback>CP</AvatarFallback>
                                            </Avatar>
                                            <div className="text-sm gap-2 overflow-hidden overflow-ellipsis w-[180px] text-muted-foreground">
                                                {user.email}
                                            </div>
                                        </div>
                                        <Button variant="secondary" onClick={() => addCollaborator(user)}>
                                            Add
                                        </Button>
                                    </div>
                                ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
