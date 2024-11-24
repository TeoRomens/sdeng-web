import { z } from 'zod'

export const SignupFormSchema = z.object({
  firstName: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters long.' })
      .trim(),
  lastName: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters long.' })
      .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
      .string()
      .min(8, { message: 'Be at least 8 characters long' })
      .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Contain at least one special character.',
      })
      .trim(),
})

export type SignupFormState = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  status?: string;
};

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email.' }).trim(),
  password: z.string().trim(),
})

export type SigninFormState = {
  email?: string;
  password?: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  status?: string;
};

