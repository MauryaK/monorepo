
"use client";
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/api';
import { setAuth, setLoading } from '../redux/api';

interface AuthProviderProps {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        try {
            const raw = localStorage.getItem('auth');
            if (raw) {
                const parsed = JSON.parse(raw) as { user: { id: string; email: string }; token?: string };
                if (parsed?.user) {
                    dispatch(setAuth({ user: parsed.user, token: parsed.token ?? 'from_cookie' }));
                }
            }
        } catch {
            console.error('Error parsing auth data from localStorage');
        }
        dispatch(setLoading(false));
    }, [dispatch]);

    return <>{children}</>;
}
