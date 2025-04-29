"use client";
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

function VerifyEmailComponent() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            setError(false); // Reset error state before making the request
            const response = await axios.post("/api/auth/verifyemail", { token });
            if (response.status === 200) {
                setVerified(true);
                toast({
                    title: "Email Verified",
                    description: "You can proceed with login now",
                });
                setError(false);
            } else {
                setError(true);
            }
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Extract token from query params
    useEffect(() => {
        setError(false);
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");
    }, [searchParams]);

    // Call verifyUserEmail if token is present
    useEffect(() => {
        setError(false);
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <>
            {loading && (
                <div className="padding-container max-container flexCenter mt-36">Loading...</div>
            )}
            {!loading && verified && (
                <div className="padding-container max-container flexCenter mt-36">
                    <h2>Congrats, you are a verified user.</h2>
                    <h2> You can now sign in! </h2>
                    <Link href="/signin" className='text-blue-400 underline'> Click here</Link>
                </div>
            )}
            {!loading && !verified && error && (
                <div className="padding-container max-container flexCenter text-red-500 mt-36">
                    <h2> Oops! Please check the URL.</h2>
                </div>
            )}
        </>
    );
}

export default VerifyEmailComponent;
