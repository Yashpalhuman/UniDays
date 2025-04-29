"use client";
import axios from 'axios';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, useCallback } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { ClimbSpinner } from '@/components/LoadingSpinner';

function LogoutComponent() {
    const [token, setToken] = useState("");
    const [logout, setLogout] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const logoutUser = useCallback(async () => {
        try {
            setLoading(true);
            setError(false); // Reset error state before making the request
            const response = await axios.post("/api/auth/logout", { token });
            if (response.status === 200) {
                toast({
                    title: "Logout successful",
                    description: "See you later!",
                });
                setLogout(true);
                setError(false);
            } else {
                setError(true);
                toast({
                    variant: "destructive",
                    description: "Oops! something went wrong..",
                });
            }
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        } finally {
            setLoading(false);
            setTimeout(() => {
                window.location.reload();
            }, 4000);
        }
    }, [token, toast]);

    useEffect(() => {
        const urlToken = searchParams.get("token");
        setToken(urlToken || "");
        logoutUser();
    }, [logoutUser, searchParams]);

    return (
        <div className="h-screen border-2 flex items-center justify-center">
            {loading && (
                <div className="padding-container max-container flexCenter"><ClimbSpinner /></div>
            )}
            {!loading && logout && (
                 <div className="padding-container max-container flex flex-col items-center justify-center">
                 <p>See ya soon!</p>
                 <p> You can always sign in here! </p>
                 <Link href="/signin" className="text-blue-400 underline">Click here</Link>
             </div>
            )}
            {!loading && !logout && error && (
                <div className="padding-container max-container flexCenter text-red-500">
                    <h2> Oops! Could not process your request.</h2>
                </div>
            )}
        </div>
    );
}

export default LogoutComponent;
