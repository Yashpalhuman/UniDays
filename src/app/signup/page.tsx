"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Mail, MailIcon, SpellCheck, Smile } from "lucide-react"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 8 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 6 characters.",
  }).email("This is not a valid email.")
  .refine((email) => email.endsWith("@kgpian.iitkgp.ac.in"), {
    message: "We are expanding.. More Colleges soon!",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 6 characters.",
  }).regex(passwordValidation, {
    message: 'Your password is not valid.',
  }),
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender",
  }),
})

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [terms, setTerms] = useState(false)
  const router = useRouter();
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        password: "",
        gender: "Other",
      }
  })

  const toggleTerms = ()=> {
    setTerms(!terms)
  }

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      console.log(values)
      const response = await axios.post("/api/auth/signup", values)
      console.log(response)
      console.log("Signup Success!!", response.data)
      toast({
          title: "Registeration Success!!",
          description: "Check your mail for verification purposes",
        })
      router.push('/signin')
    } catch (error: any) {
      console.log("Signup failed");
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: `${error.response.data.error}`,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-20  mb-40">
      <h1 className="padding-container max-container flexCenter font-bold font-vol text-3xl">SignUp</h1>
      <div className="mt-6 padding-container max-container flexCenter w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Anderson"
                      {...field}
                      type="name"
                      extimg={<SpellCheck />}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your full name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John@yourInsti.edu"
                      {...field}
                      type="email"
                      extimg={<MailIcon />}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Use your Institute Mail.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Password"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    <>Enter a strong Password.</>
                    <ul className="mt-2 text-[12px] list-disc">
                      <li>Minimum 8 characters</li>
                      <li>at least an Uppercase and lowercase letter</li>
                      <li>one special character, one number</li>
                    </ul>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
                
              )}
            />
  <FormField
  control={form.control}
  name="gender"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <div className="flex items-center gap-6">
          {["Male", "Female", "Other"].map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value={option}
                checked={field.value === option}
                onChange={() => field.onChange(option)}
                className="h-4 w-4 text-gray-700 border-gray-400 focus:ring-gray-500 accent-gray-700"
              />
              <span className="text-gray-700 font-medium">{option}</span>
            </label>
          ))}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
            <div className="flex flex-col gap-5 items-center "><div>Already a User? <Link className="text-blue-600 underline" href={"/signin"}>Login here</Link> </div>
            <div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" onClick={toggleTerms}/>
                <Label htmlFor="terms">Accept <Link href="/terms" className="text-primary/80 underline">terms and conditions</Link></Label>
              </div>
            </div></div>
            <Button type="submit" disabled={loading || !terms}>
              {loading ? "Signing Up..." : <><Mail className="mr-2 h-4 w-4" /> Signup</>}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
