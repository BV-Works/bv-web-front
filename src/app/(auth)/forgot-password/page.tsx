'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/lib/stores/auth.store';

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
});

type FormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const forgotPassword = useAuthStore((state) => state.forgotPassword);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const result = await forgotPassword(data.email);

    setLoading(false);

    if (!result.success) {
      return;
    }

    setSuccess(true);
    setCooldown(60);

    const timer = setInterval(() => {
      setCooldown((v) => {
        if (v <= 1) {
          clearInterval(timer);
          return 0;
        }

        return v - 1;
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-sm border-none bg-[var(--color-paper-translucent)] backdrop-blur-sm">
      <CardHeader className="px-8 pt-8">
        <CardTitle className="font-display text-5xl font-extrabold tracking-tight">
          Forgot
        </CardTitle>

        <CardDescription>
          {success
            ? 'If an account exists, you will receive an email shortly.'
            : 'Enter your email to receive a password reset link.'}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-8 pb-8">
        {success ? (
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                Si existe una cuenta con ese correo recibirás instrucciones.
              </AlertDescription>
            </Alert>

            <Button
              variant="outline"
              className="w-full"
              disabled={cooldown > 0}
              onClick={() => setSuccess(false)}
            >
              {cooldown > 0 ? `Reenviar en ${cooldown}s` : 'Enviar de nuevo'}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                className="bg-transparent border-foreground/20"
                type="email"
                placeholder="email@example.com"
                {...register('email')}
              />

              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <Button
              className="w-full font-display font-extrabold tracking-wide"
              type="submit"
              disabled={loading}
            >
              {loading && <Spinner className="mr-2 h-4 w-4" />}
              Send reset link
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
            Back to login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
