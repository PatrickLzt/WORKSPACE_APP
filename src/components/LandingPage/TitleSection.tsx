/**
 * @file src/components/LandingPage/TitleSection.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
 * @brief Title Section Component
 * @version 1.0
 * @date 
 *
 */

interface TitleSectionProps {
    title: string;
    subtitle?: string;
    pill: string;
}

/**
 * @brief Title Section Component
 * 
 * @param title The Title
 * @param subtitle The Subtitle
 * @param pill The Pill
 * 
 * @returns The JSX Component for the Title Section
 */
export const TitleSection: React.FC<TitleSectionProps> = ({ title, subtitle, pill }) => {
    return (
        <>
            <section className="flex flex-col gap-4 justify-center items-start md:items-center">

                <article className="rounded-full p-[1px] text-sm dark:bg-gradient-to-r dark:from-brand-primaryBlue dark:to-brand-primaryPurple">
                    <div className="rounded-full px-3 py-1 dark:bg-black">
                        {pill}
                    </div>
                </article>
                {subtitle ? (
                    <>
                        <h2 className="text-left text-3xl sm:text-5xl sm: max-w-[750px] md:text-center font-semibold">
                            {title}
                        </h2>
                        <p className="dark:text-washed-purple-700 sm:max-w-[450px]">
                            {subtitle}
                        </p>
                    </>
                ) : (
                    <h1 className="text-left text-4xl sm:text-6xl sm:max-w-[850px] md:text-center font-semibold">
                        {title}
                    </h1>
                )
                }
            </section>
        </>
    )
}