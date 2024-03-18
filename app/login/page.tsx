'use client';
import { authenticate } from '@/lib/actions';
import './login.scss';
import { useFormState, useFormStatus } from 'react-dom';

export default function Page() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();
  return (
    <form action={dispatch}>
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <div>{errorMessage && <p>{errorMessage}</p>}</div>
      <button aria-disabled={pending} type="submit">
        Login
      </button>
    </form>
  );
}
