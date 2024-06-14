/**
 * @file src/components/Sidebar/UserCard.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief UserCard component
 * @version 1.0
 * @date 
 *
 */

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { LogOut } from 'lucide-react';
import { Subscription } from '@/src/lib/supabase/supabase.types';
import db from '@/src/lib/supabase/db';
import Worksp4ceProfileIcon from '../../thirdParty/CustomIcons/ProfileIcon';
import LogoutButton from '../global/LogoutButton';
import ModeToggle from '../global/ModeToggle';

interface UserCardProps {
    subscription: Subscription | null;
}

/**
 * @brief UserCard component
 * 
 * @param subscription 
 * 
 * @returns JSX.Element
 */
export default async function UserCard({ subscription }: UserCardProps) {

    const supabase = createServerComponentClient({ cookies });
    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) return;

    const response = await db.query.users.findFirst({ where: (u, { eq }) => eq(u.id, user.id), });

    let avatarPath;

    if (!response) return;

    if (!response.avatarUrl) {
        avatarPath = '';
    }
    else {
        avatarPath = supabase.storage.from('avatars').getPublicUrl(response.avatarUrl)?.data.publicUrl;
    }

    const profile = { ...response, avatarUrl: avatarPath };

    return (
        <article className="hidden sm:flex  justify-between  items-center  px-4  py-2  dark:bg-Neutrals/neutrals-12 rounded-3xl">
            <aside className="flex justify-center items-center gap-2">
                <Avatar>
                    <AvatarImage src={profile.avatarUrl} />
                    <AvatarFallback>
                        <Worksp4ceProfileIcon />
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="text-muted-foreground">
                        {subscription?.status === 'active' ? 'Pro Plan' : 'Free Plan'}
                    </span>
                    <small className="w-[100px] overflow-hidden overflow-ellipsis">
                        {profile.email}
                    </small>
                </div>
            </aside>
            <div className="flex items-center justify-center">
                <LogoutButton>
                    <LogOut />
                </LogoutButton>
                <ModeToggle />
            </div>
        </article>
    );
}