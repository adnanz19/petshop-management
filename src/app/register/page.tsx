"use client"

import { Card, CardTitle, CardHeader, CardAction, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { registerUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await registerUser(email, password);
            router.push("/login");
        } catch (error) {
            setError("Failed to register");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-screen flex-col flex gap-2 items-center justify-center">
            <Image src="/petshop-logo1.svg" alt="petshop_logo" width={300} height={300} />
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-[#9F580A] font-bold text-2xl">REGISTER</CardTitle>
                    <CardDescription>
                        Enter your email below to register for an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>
                        <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            id="password" 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        </div>
                    </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" onClick={handleRegister} className="w-full">
                    Register
                    </Button>
                    <CardDescription>
                    Already have an account? <></>
                    <Link href="/login" className="text-[#9F580A] font-semibold hover:underline">Login</Link>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}
