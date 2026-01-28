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
import { registerUserSchema } from '@erp/shared-types';
import { toast } from "sonner";

import { useRouter } from 'next/navigation'
import { useRegisterMutation } from "../../redux/api/authApi";
import { useAppDispatch, useAppSelector } from "../../redux/api";
import { setAuth } from "../../redux/api/slices/authSlice";
import { useEffect, useState } from "react";
export default function RegistrationForm() {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);


    const [register] = useRegisterMutation();

    useEffect(() => {
        if (isAuthenticated) {
            form.reset();
            navigate.push('/home');
        }
    }, [isAuthenticated, navigate]);

    const form = useForm<z.infer<typeof registerUserSchema>>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            isactive: true,
        },
    })

    async function onSubmit(formData: z.infer<typeof registerUserSchema>) {
        setIsLoading(true);
        const result = await register({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            isactive: formData.isactive,
        });
        if (result.error) {
            const errorMessage = 'data' in result.error ? (result.error.data as any)?.CustomMessage : 'Registration failed';
            toast.error(errorMessage, {
                closeButton: true,
                action: {
                    label: 'Try Again',
                    onClick: () => console.log('Close')
                },
            });
        } else {

            toast.success(result.data.CustomMessage, {
                closeButton: true,
                action: {
                    label: 'Success',
                    onClick: () => console.log('Ok')
                },
            });
            if (result.data.user && result.data.token) {
                dispatch(setAuth({ user: result.data.user, token: result.data.token }));
                // navigate.push('/home');
            }

        }
        setIsLoading(false);
    }
    return (
        <>
            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className="gap-3">
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="gap-2">
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-name"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your name"
                                    autoComplete="off"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="gap-2">
                                <FieldLabel htmlFor="form-rhf-demo-title">
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
                                <FieldLabel htmlFor="form-rhf-demo-title">
                                    Password
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="form-rhf-demo-password"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your password"
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
                                isLoading ? (<><Spinner data-icon="inline-start" /> Loading...</>) : "Submit"
                            }
                        </Button>
                    </Field>
                </CardFooter>
            </form>
        </>
    )
}

