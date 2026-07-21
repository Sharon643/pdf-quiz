import {
  useState,
  type FormEvent,
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { signUp } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");
    const [name, setName] =
  useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleSubmit(
    event: FormEvent
  ) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
    setError(
        "Please enter your name."
    );

    return;
    }

    if (
    password !==
    confirmPassword
    ) {
    setError(
        "Passwords do not match."
    );

    return;
    }

    if (password.length < 6) {
    setError(
        "Password must be at least 6 characters."
    );

    return;
    }

    setLoading(true);

    try {
      const data =
        await signUp(
        name.trim(),
        email,
        password
        );

      /*
       * Supabase projects commonly require
       * email confirmation.
       *
       * If there is no session yet,
       * the user must verify their email.
       */

      if (!data.session) {
        navigate(
          "/login",
          {
            state: {
              message:
                "Check your email to verify your account.",
            },
          }
        );

        return;
      }

      navigate("/dashboard");

    } catch (error: any) {

      setError(
        error.message ??
          "Unable to create account."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6">

      <div className="w-full max-w-md">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-semibold text-white">
            Create account
          </h1>

          <p className="mt-2 text-zinc-400">
            Start building your question banks.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-zinc-800 bg-zinc-900 p-8"
        >

          <div className="space-y-5">
            <div>
            <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-zinc-300"
            >
                Name
            </label>

            <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(event) =>
                setName(event.target.value)
                }
                placeholder="Your name"
                autoComplete="name"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
            />
            </div>

            <div>

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(event) =>
                  setEmail(
                    event.target.value
                  )
                }
                placeholder="you@example.com"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />

            </div>

            <div>

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Minimum 6 characters"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />

            </div>

            <div>

              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value
                  )
                }
                placeholder="Enter password again"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition focus:border-zinc-500"
              />

            </div>

          </div>

          {error && (
            <p className="mt-4 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-white px-4 py-3 font-medium text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating account..."
              : "Create account"}
          </button>

          <p className="mt-6 text-center text-sm text-zinc-400">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-white hover:underline"
            >
              Sign in
            </Link>

          </p>

        </form>

      </div>

    </main>
  );
}