import { useEffect, useState } from "react";
import { authClient } from "../lib/auth";
import { wakeBackend } from "../lib/api";

export default function Login() {
  const [mode, setMode] = useState("signin");
  const [step, setStep] = useState("auth");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [backendReady, setBackendReady] = useState(false);
  const [backendMessage, setBackendMessage] = useState("Starting employee portal services...");

  useEffect(() => {
    let active = true;

    async function startBackend() {
      setBackendMessage(
        "Starting employee portal services. First load may take up to 60 seconds."
      );

      const ready = await wakeBackend();

      if (!active) return;

      if (ready) {
        setBackendReady(true);
        setBackendMessage("");
      } else {
        setBackendReady(false);
        setBackendMessage(
          "Server is taking longer than expected. Please wait a moment or refresh the page."
        );
      }
    }

    startBackend();

    return () => {
      active = false;
    };
  }, []);

  const allowedDomain = import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN;

  function isAllowedEmail(value) {
    return value.toLowerCase().endsWith(`@${allowedDomain}`);
  }

  async function handleAuth(e) {
    e.preventDefault();
    setMessage("");

    if (!isAllowedEmail(email)) {
      setMessage(`Only @${allowedDomain} emails are allowed.`);
      return;
    }

    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await authClient.signIn.email({
          email,
          password,
        });

        if (error) {
          setMessage(error.message || "Sign in failed.");
          return;
        }

        window.location.href = `${import.meta.env.BASE_URL}#/dashboard`;
        window.location.reload();
      } else {
        const { error } = await authClient.signUp.email({
          name,
          email,
          password,
        });

        if (error) {
          setMessage(error.message || "Sign up failed.");
          return;
        }

        setMessage("Check your email for a verification code.");
        setStep("verify");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { error } = await authClient.emailOtp.verifyEmail({
        email,
        otp: code,
      });

      if (error) {
        setMessage(error.message || "Verification failed.");
        return;
      }

      setMessage("Email verified. Please sign in.");
      setStep("auth");
      setMode("signin");
      setCode("");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setMessage("");
    setLoading(true);

    try {
      const { error } = await authClient.sendVerificationEmail({
        email,
        callbackURL: window.location.origin,
      });

      if (error) {
        setMessage(error.message || "Could not resend verification code.");
        return;
      }

      setMessage("New verification code sent.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "verify") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <form
          onSubmit={handleVerify}
          className="bg-white p-8 rounded-2xl shadow max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>

          <p className="text-slate-600 mb-6">
            Enter the verification code sent to <strong>{email}</strong>.
          </p>

          <label className="block text-sm font-medium mb-1">
            Verification Code
          </label>
          <input
            className="w-full border rounded-lg p-3 mb-4"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            required
          />

          {message && (
            <p className="mb-4 text-sm text-slate-700">{message}</p>
          )}

          <button
            disabled={loading}
            className="w-full bg-slate-900 text-white rounded-lg p-3 disabled:opacity-50"
          >
            {loading ? "Please wait..." : "Verify Email"}
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="w-full mt-3 text-sm underline disabled:opacity-50"
          >
            Resend verification code
          </button>

          <button
            type="button"
            onClick={() => setStep("auth")}
            className="w-full mt-3 text-sm text-slate-500"
          >
            Back to login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <form
        onSubmit={handleAuth}
        className="bg-white p-8 rounded-2xl shadow max-w-md w-full"
      >
        <h1 className="text-2xl font-bold mb-2">Employee Portal</h1>

        <p className="text-slate-600 mb-6">
          {mode === "signin"
            ? "Sign in to your employee account."
            : "Create your employee account."}
        </p>

        {backendMessage && (
          <div className="mb-4 rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            {backendMessage}
          </div>
        )}

        {mode === "signup" && (
          <>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              className="w-full border rounded-lg p-3 mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
            />
          </>
        )}

        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          className="w-full border rounded-lg p-3 mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`you@${allowedDomain}`}
          required
        />

        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          className="w-full border rounded-lg p-3 mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        {message && <p className="mb-4 text-sm text-slate-700">{message}</p>}

        <button
          disabled={loading || !backendReady}
          className="w-full bg-slate-900 text-white rounded-lg p-3 disabled:opacity-50"
        >
          {!backendReady
            ? "Starting Server..."
            : loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign In"
                : "Create Account"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMessage("");
            setMode(mode === "signin" ? "signup" : "signin");
          }}
          className="w-full mt-4 text-sm underline"
        >
          {mode === "signin"
            ? "Need an account? Create one"
            : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}