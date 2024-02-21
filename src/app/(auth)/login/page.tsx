/**
 * @file src/app/(site)/page.tsx
 * @author Patrick Lorenzeti <patrick.lorenzeti@outlook.com>
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
import Loader from "@/src/components/global/Loader"
import { actionLoginUser } from "@/src/lib/serverActions/authActions"

/**
 * @brief Home Page
 * 
 * @return {JSX.Element} for the Login Page
 */
const LoginPage = () => {

    const router = useRouter();
    const [submitError, setSubmitError] = useState('');

    const form = useForm<z.infer<typeof FormSchema>>({
        mode: 'onChange',
        resolver: zodResolver(FormSchema),
        defaultValues: { email: '', password: '' },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (formData) => {
        const { error } = await actionLoginUser(formData);
        if (error) {
            form.reset();
            setSubmitError(error.message);
        }
        router.push('/dashboard');
    };

    return (
        <Form {...form}>
            <form onChange={() => {
                if (submitError) setSubmitError('');
            }} onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col">
                <Link href="/" className=" w-full flex justify-left items-center">
                    <Image src="/worksp4ceLogo.svg" alt="worksp4ce Logo" width={50} height={50} />
                    <span
                        className="font-semibold dark:text-white text-4xl first-letter:ml-2">
                        worksp4ce.
                    </span>
                </Link>
                <FormDescription className="text-foreground/60">
                    An all-In-One Collaboration and Productivity Platform
                </FormDescription>
                <FormField disabled={isLoading} control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                <FormField disabled={isLoading} control={form.control} name="password" render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="password" placeholder="Password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                />
                {submitError && <FormMessage>{submitError}</FormMessage>}
                <Button type="submit" className="w-full p-6" size="lg" disabled={isLoading}>
                    {!isLoading ? 'Login' : <Loader />}
                </Button>
                <span className="self-container">
                    Do not have an account?{' '}
                    <Link href="/signup" className="text-primary">
                        Sign Up
                    </Link>
                </span>
            </form>
        </Form>
    );
};

export default LoginPage;