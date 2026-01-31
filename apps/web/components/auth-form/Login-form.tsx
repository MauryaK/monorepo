"use client";
import { zodResolver, Controller, useForm } from "@repo/ui/lib/zodResolver";
import { z } from '@erp/shared-types';
import { CardFooter } from "@repo/ui/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@repo/ui/components/ui/field";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import { Spinner } from "@repo/ui/components/ui/spinner";
import { toast } from "sonner";

import { useLoginMutation } from "../../redux/api/authApi";
import { loginUserSchema } from "@erp/shared-types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setAuth, useAppDispatch, useAppSelector } from "../../redux/api";
export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading: isAuthLoading } = useAppSelector((state) => state.auth);

    const [login] = useLoginMutation();

    useEffect(() => {
        if (isAuthenticated) {
            form.reset();
            navigate.push('/home');
        }
    }, [isAuthenticated, navigate]);

    const form = useForm<z.infer<typeof loginUserSchema>>({
        resolver: zodResolver(loginUserSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    async function onSubmit(formData: z.infer<typeof loginUserSchema>) {
        try {
            setIsLoading(true);
            const result = await login({
                email: formData.email,
                password: formData.password,
            }).unwrap();
            console.log('Login result:', result);
            if (result.SuccessStatus && result.user && result.token) {
                dispatch(setAuth({ user: result.user, token: result.token }));
                navigate.push('/home');
                toast.success(result.CustomMessage, {
                    closeButton: true, 
                    action: {
                        label: 'Success',
                        onClick: () => console.log('Successful login')
                    },
                });
            } else {
                toast.error(result.CustomMessage, {
                    closeButton: true,
                    action: {
                        label: 'Cancel',
                        onClick: () => console.log(result.CustomMessage)
                    },
                });

            }
        } catch (error: any) {
            const message = (error as { data?: { CustomMessage?: string } }).data?.CustomMessage;
            toast.error(message, {
                closeButton: true,
                action: {
                    label: 'Try Again',
                    onClick: () => console.log('Close')
                },
            });
        }
        finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-3">
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="gap-2">
                                <FieldLabel htmlFor="form-rhf-demo-email">
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-email"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your email"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="gap-2">
                                <FieldLabel htmlFor="form-rhf-demo-password">
                                    Password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter password"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <CardFooter className="mt-4 p-0">
                    <Field orientation="horizontal">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Reset
                        </Button>
                        <Button type="submit" disabled={isLoading} size="sm">
                            {
                                isLoading ? (<><Spinner data-icon="inline-start" /> Loading...</>) : "Login"
                            }
                        </Button>
                    </Field>
                </CardFooter>
                {
                    isAuthLoading && (
                        <div className="mt-4 p-2 text-center text-sm text-gray-500">
                            <Spinner data-icon="inline-start" /> Checking authentication...
                        </div>
                    )
                }
            </form>
        </>
    );
}