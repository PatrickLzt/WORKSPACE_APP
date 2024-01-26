/**
 * @file src/app/(site)/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@mobitec.com.br>
 * @brief Home Page
 * @version 1.0
 * @date 
 *
 */

/* Use client side render  */
'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormSchema } from "@/src/lib/types"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/src/components/ui/form"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import Loader from "@/src/components/Loader"
import { actionLoginUser } from "@/src/lib/serverActions/authActions"

/**
 * @brief Home Page
 * 
 * @return {JSX.Element} for the Login Page
 */
export default function LoginPage() {

    const router = useRouter()

    const [submitError, setSubmitError] = useState("")

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const isLoading = form.formState.isSubmitting

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData: any) => {

        const { error } = await actionLoginUser(formData)

        if (error) {
            form.reset()
            setSubmitError(error.message)
        } else {
            router.push("/dashboard")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} onChange={() => {
                if (submitError) setSubmitError("")
            }} className="w-full sm:w-[400px] space-y-6 flex flex-col">
                <Link href="/" className="w-full flex justify-center intems-left">
                    <Image src="./cypresslogo.svg" alt="Logo" width={50} height={50} />
                    <span className="font-semibold dark:text-white text-4xl first-letter:ml-2">cypress.</span>
                </Link>
                <FormDescription className="text-foreground/60 ">Sign in to your account</FormDescription>
                <FormField disabled={isLoading} control={form.control} name="email" render={(field) => (

                    <FormItem>
                        <FormControl>
                            <Input type="email" placeholder="Email Address" {...field} />
                        </FormControl>
                    </FormItem>

                )} />

                <FormField disabled={isLoading} control={form.control} name="password" render={(field) => (

                    <FormItem>
                        <FormControl>
                            <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                    </FormItem>

                )} />
                {submitError && <FormMessage>{submitError}</FormMessage>}
                <Button type="submit" disabled={isLoading} className="w-full">{!isLoading ? "Login" : <Loader />}</Button>
                <span className="self-container">Don't have an account? {""}
                    <Link href="/signup" className="text-primary font-semibold">Sign up</Link>
                </span>
            </form>
        </Form >
    )
}