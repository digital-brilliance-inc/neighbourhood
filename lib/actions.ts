'use server';

import { signIn } from '@/auth';

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error: any) {
    console.log('authenticate(): error = %o', error);
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
