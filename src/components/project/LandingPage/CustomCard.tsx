/**
 * @file src/components/LandingPage/customCard.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief  Custom Card Component
 * @version 1.0
 * @date 
 *
 */
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card"
import { cn } from "@/src/lib/utils"

type CardProps = React.ComponentProps<typeof Card>
type CustomCardProps = CardProps & {
    cardHeader?: React.ReactNode
    cardContent?: React.ReactNode
    cardFooter?: React.ReactNode
}

/**
 * @brief Custom Card Component
 * 
 * @param cardHeader The Card Header
 * @param cardContent The Card Content
 * @param cardFooter The Card Footer
 * 
 * @returns The JSX Component for the Custom Card
 */
export default function CustomCard({ cardHeader, cardContent, cardFooter, ...props }: CustomCardProps) {

    return (
        <Card className={cn('w-[380px]')} {...props}>
            <CardHeader>{cardHeader}</CardHeader>
            <CardContent>{cardContent}</CardContent>
            <CardFooter>{cardFooter}</CardFooter>
        </Card >
    )
}

