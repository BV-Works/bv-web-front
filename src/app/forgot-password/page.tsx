'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
})

type FormData = z.infer<typeof schema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsLoading(false)
    setIsSuccess(true)
    
    // Start cooldown timer
    setCooldown(60)
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Forgot password</CardTitle>
          <CardDescription>
            {isSuccess
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive a reset link'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSuccess ? (
            <div className="space-y-4">
              <Alert>
                <AlertDescription>
                  If an account exists with that email, you will receive password reset instructions shortly.
                </AlertDescription>
              </Alert>

              <Button
                variant="outline"
                className="w-full"
                disabled={cooldown > 0}
                onClick={() => setIsSuccess(false)}
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : 'Send again'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Spinner className="mr-2 h-4 w-4" />}
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
    </div>
  )
}
