/**
 * @file src/components/global/EmojiPicker.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Supabase queries
 * @version 1.0
 * @date 
 *
 */

import dynamic from "next/dynamic"
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "../../ui/popover"

interface EmojiPickerProps {
    children: React.ReactNode,
    getValue?: (emoji: string) => void
}

/**
 * @brief EmojiPicker component
 * 
 * @param { children, getValue }
 * 
 * @returns JSX.Element
 */
const EmojiPicker: React.FC<EmojiPickerProps> = ({ children, getValue }) => {

    const Picker = dynamic(() => import('emoji-picker-react'))

    const onClick = (selectedEmoji: any) => {
        if (getValue) getValue(selectedEmoji.emoji)
    }

    return (
        <div className="flex items-center">
            <Popover>
                <PopoverTrigger className="cursor-pointer">
                    {children}
                </PopoverTrigger>
                <PopoverContent className="p-0 border-none">
                    <Picker onEmojiClick={onClick} />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default EmojiPicker