'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    // TODO:
    // conectar con API real
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <Card
      className="
          w-full
          max-w-sm
          border-none
          bg-[var(--color-paper-translucent)]
          backdrop-blur-sm
        "
    >
      <CardHeader className="px-8 pt-8">
        <CardTitle
          className="
              font-display
              text-5xl
              font-extrabold
              tracking-tight
            "
        >
          Reset
        </CardTitle>

        <CardDescription
          className="
              font-display
              tracking-wide
            "
        >
          {isSuccess ? 'Contraseña actualizada correctamente.' : 'Introduce tu nueva contraseña.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        {isSuccess ? (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Password reset successfully. Redirecting to login...
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New password</Label>

              <Input
                className="
                      bg-transparent
                      border-foreground/20
                    "
                id="password"
                type="password"
                {...register('password')}
              />

              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm password</Label>

              <Input
                className="
                      bg-transparent
                      border-foreground/20
                    "
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
              />

              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="
                    w-full
                    font-display
                    font-extrabold
                    tracking-wide
                  "
            >
              {isLoading && <Spinner className="mr-2 h-4 w-4" />}
              Reset password
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="
                text-sm
                text-muted-foreground
                hover:text-foreground
              "
          >
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
