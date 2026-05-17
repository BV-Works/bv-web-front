import { LinkPlatform } from "./link"
import { UserRole } from "./user"

export interface LoginFormData {
  email: string
  password: string
}

export interface ForgotPasswordFormData {
  email: string
}

export interface ResetPasswordFormData {
  password: string
  confirmPassword: string
}

export interface CreateUserFormData {
  email: string
  password: string
  role: UserRole
}

export interface LinkFormData {
  platform: LinkPlatform
  title: string
  url: string
  is_visible: boolean
}

export interface ChangePasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}