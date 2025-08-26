"use client"

import { Card, CardTitle, CardHeader, CardAction, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
            e.preventDefault();
            setLoading(true);
            setError("");

            try {
                await loginUser(email, password);
                router.push("/dashboard/customer");
            } catch (error: any) {
                setError(error.message || "Failed to login");
            } finally {
                setLoading(false);
            }
    };

    return (
        <div className="h-screen flex items-center justify-center flex-col gap-2">
            <Image src="/petshop-logo1.svg" alt="petshop_logo" width={300} height={300} />
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-[#9F580A] font-bold text-2xl">LOGIN</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                            required />
                        </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Logging in..." : "Login"}
                    </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <CardDescription>
                        Don't have an account? <></>
                        <Link href="/register" className="text-[#9F580A] font-semibold hover:underline">Register</Link>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div>
    );
}
