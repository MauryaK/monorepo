"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

import { Button } from "@repo/ui/components/ui/button";
import { useLogoutMutation } from "../../redux/api/authApi";
import { logout, useAppDispatch, useAppSelector } from "../../redux/api";

export default function HomePage() {
    const navigate = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, user, isLoading } = useAppSelector((state) => state.auth);
    const [logoutApi, { isLoading: isLogoutLoading }] = useLogoutMutation();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate.push('/');
        }
    }, [isAuthenticated, isLoading, navigate]);

    if (!isAuthenticated) {
        return null;
    }
    async function handleLogout() {
        try {
            const result = await logoutApi().unwrap();
            if (result.SuccessStatus) {
                dispatch(logout());
                toast.success(result.CustomMessage || "Logged out successfully");
            } else {
                toast.error(result.CustomMessage || "Logout failed");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Logout failed';
            toast.error(errorMessage);
        }
    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900 p-4">
            <div className="w-full max-w-md bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-gray-200 dark:border-zinc-700 p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Welcome Home
                    </h1>
                    {user?.name && (
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Hello, <span className="font-medium text-gray-900 dark:text-gray-200">{user.name}</span>
                        </p>
                    )}
                </div>

                <div className="pt-4">
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full h-11 text-base font-medium shadow-sm active:scale-95 transition-all duration-200"
                        disabled={isLogoutLoading || isLoading}
                    >
                        {isLogoutLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Logging out...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <LogOut className="w-4 h-4" />
                                Logout
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}