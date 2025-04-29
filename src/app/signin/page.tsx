"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Mail, MailIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Enter your email",
  }).email("This is not a valid email."),
  password: z.string().min(2, {
    message: "Password must be at least 6 characters",
  }),
})

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      console.log(values)
      const response = await axios.post("/api/auth/login", values)
      console.log("Signin Success!!", response.data)
      toast({
        title: "Signin Success!!",
        description: "Welcome to UniDays",
      })
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      router.push('/')
    } catch (error: any) {
      console.log("Signin failed", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.response.data.error}`,
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="mt-20 mb-40">
    <h1 className="padding-container max-container flexCenter font-bold font-vol text-3xl">Login</h1>
    <div className="mt-6 padding-container max-container flexCenter w-full">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
      <FormField
          control={form.control}
          name="email"
          render={({ field }: any) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="John@example.com" {...field} type="email" extimg={<MailIcon />} />
              </FormControl>
              <FormDescription>
                Use your email address
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field } :any) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>
                Enter your Password
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>New User? <Link className="text-blue-500 underline" href={"/signup"}>Register here</Link> </div>
        <Button type="submit" disabled={loading}> {loading ? "Signing in..." :<><Mail className="mr-2 h-4 w-4" /> Login</> }</Button>
      </form>
    </Form>
    
  </div>
  </div>
  )
}
