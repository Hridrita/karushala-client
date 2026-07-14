"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowRightToLine, Mail, Lock, User, Sparkles } from "lucide-react";
import { FaPalette, FaGem, FaShop } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";


const signInSchema = z.object({
  email: z.string().min(1, "Email required").email("Enter valid email"),
  password: z.string().min(6, "Min 6 chars"),
  rememberMe: z.boolean().optional(),
});
type SignInFormData = z.infer<typeof signInSchema>;

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name too short"),
    email: z.string().min(1, "Email required").email("Enter valid email"),
    password: z.string().min(6, "Min 6 chars"),
    confirmPassword: z.string().min(6, "Min 6 chars"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
type SignUpFormData = z.infer<typeof signUpSchema>;

// ---------- Page ----------
export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggle = () => setIsSignUp((v) => !v);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10 sm:py-16 overflow-hidden selection:bg-[#4A4FCF]/30 selection:text-white">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[350px] w-[350px] rounded-full bg-[#4A4FCF]/15 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-72 w-72 rounded-full bg-[#887ad1]/10 blur-[120px]" />

      <div className="relative w-full max-w-5xl">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4A4FCF]/10 to-[#887ad1]/10 rounded-3xl blur-xl opacity-70" />

        <div className="relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/50 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] md:h-[640px]">
          {/* ===== DESKTOP / TABLET (md+): sliding brand + form panels ===== */}
          <div
            className="hidden md:block absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out"
            style={{ left: isSignUp ? "50%" : "0%" }}
          >
            <BrandPanel isSignUp={isSignUp} onSwitch={toggle} />
          </div>

          <div
            className="hidden md:block absolute top-0 h-full w-1/2 transition-all duration-700 ease-in-out"
            style={{ left: isSignUp ? "0%" : "50%" }}
          >
            <div className="relative h-full w-full">
              <div
                className={`absolute inset-0 flex items-center justify-center px-8 lg:px-10 transition-opacity duration-500 ${
                  isSignUp ? "opacity-0 pointer-events-none delay-0" : "opacity-100 delay-300"
                }`}
              >
                <SignInForm onSwitch={toggle} />
              </div>
              <div
                className={`absolute inset-0 flex items-center justify-center px-8 lg:px-10 transition-opacity duration-500 ${
                  isSignUp ? "opacity-100 delay-300" : "opacity-0 pointer-events-none delay-0"
                }`}
              >
                <SignUpForm onSwitch={toggle} />
              </div>
            </div>
          </div>

          {/* ===== MOBILE (<md): stacked, no absolute, no clipping bug ===== */}
          <div className="md:hidden flex items-center justify-center px-5 py-10 sm:px-8">
            {isSignUp ? <SignUpForm onSwitch={toggle} /> : <SignInForm onSwitch={toggle} />}
          </div>
        </div>
      </div>
    </div>
  );
}


function BrandPanel({ isSignUp, onSwitch }: { isSignUp: boolean; onSwitch: () => void }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#4A4FCF] to-[#7c74d8]">
      <div className="pointer-events-none absolute -top-16 -left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 -right-10 h-64 w-64 rounded-full bg-[#B8AEEA]/30 blur-3xl" />

      <FaPalette className="absolute left-10 top-16 h-7 w-7 text-white/25 animate-pulse" />
      <FaGem className="absolute right-14 top-1/3 h-6 w-6 text-white/20 animate-pulse [animation-delay:300ms]" />
      <FaShop className="absolute left-16 bottom-24 h-8 w-8 text-white/20 animate-pulse [animation-delay:600ms]" />

      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-8 lg:px-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner">
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-white to-[#B8AEEA] animate-pulse" />
        </div>

        <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
          {isSignUp ? "One of us already?" : "New to Karushala?"}
        </h2>
        <p className="max-w-xs text-sm leading-relaxed text-white/80">
          {isSignUp
            ? "Sign in to manage your shop, track orders, and connect with buyers across Bangladesh."
            : "Discover handmade crafts from local artisans, or open your own store and start selling."}
        </p>

        <button
          type="button"
          onClick={onSwitch}
          className="rounded-xl border border-white/30 bg-white/10 px-8 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.98]"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}

// ---------- Sign In form ----------
function SignInForm({ onSwitch }: { onSwitch: () => void }) {
    const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const DEMO_CREDENTIALS = {
    email: "demo@karushala.com",
    password: "demopass123",
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { rememberMe: false,
    email: "demo@karushala.com",     
      password: "demopass123",
}});

const handleDemoLogin = async () => {
    setValue("email", DEMO_CREDENTIALS.email);
    setValue("password", DEMO_CREDENTIALS.password);
    
    toast.info("Demo credentials loaded! Logging you in...");
    
    setTimeout(async () => {
      try {
        const { data, error } = await authClient.signIn.email({
          email: DEMO_CREDENTIALS.email,
          password: DEMO_CREDENTIALS.password,
        });

        if (data) {
          toast.success("Welcome to Karushala Demo!");
          router.push("/");
        }

        if (error) {
          toast.error(error.message || "Demo login failed.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
      }
    }, 500);
  };

  const onSubmit = async (formdata: SignInFormData) => {
    setIsSubmitting(true);
    console.log("Sign in payload:", formdata);
    try {
      const {data, error} = await authClient.signIn.email({
        email: formdata.email,
        password: formdata.password
      })
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network
      if(data){
        toast.success("Logged in successfully!")
      }

      if(error){
        toast.error(error.message || "Registration failed. Please try again.");
      return;
      }

    reset();
      router.push("/");
      // TODO: Better Auth sign-in integration
    } catch (err) {
      console.error(err);
    toast.error("Something went wrong. Please try again.");
      // TODO: error toast/message
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async() =>{
    await authClient.signIn.social({
      provider: "google"
    })
  }

  return (
    <div className="w-full max-w-[380px]">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-100 sm:text-3xl">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-400">Sign in to manage your craft store</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div>
          <label htmlFor="si-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Email address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#887ad1] transition-colors">
              <Mail size={16} />
            </div>
            <input
              id="si-email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className={`w-full rounded-xl border bg-zinc-950/90 pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-[#887ad1] focus:ring-2 focus:ring-[#887ad1]/10 ${
                errors.email ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-800/90"
              }`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="si-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#887ad1] transition-colors">
              <Lock size={16} />
            </div>
            <input
              id="si-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              {...register("password")}
              className={`w-full rounded-xl border bg-zinc-950/90 pl-10 pr-11 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-[#887ad1] focus:ring-2 focus:ring-[#887ad1]/10 ${
                errors.password ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-800/90"
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#887ad1] transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center justify-between text-sm pt-1">
          <label className="flex items-center gap-2.5 text-zinc-400 cursor-pointer select-none group">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="size-4 rounded border-zinc-800 bg-zinc-950 text-[#4A4FCF] focus:ring-[#4A4FCF]/30 focus:ring-offset-0 accent-[#4A4FCF]"
            />
            <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">Remember me</span>
          </label>
          <a href="/auth/forgot-password" className="font-medium text-[#887ad1] hover:text-[#B8AEEA] transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] py-3 text-sm font-bold text-white shadow-[0_4px_25px_rgba(74,79,207,0.3)] transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
          {!isSubmitting && <ArrowRightToLine size={16} className="transition-transform group-hover:translate-x-0.5" />}
        </button>
      </form>

      <button
        type="button"
        onClick={handleDemoLogin}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#4A4FCF]/30 bg-[#4A4FCF]/10 py-2.5 text-sm font-medium text-[#B8AEEA] transition-all hover:bg-[#4A4FCF]/20 hover:border-[#4A4FCF]/50 active:scale-[0.98] group"
      >
        <Sparkles size={16} className="text-[#4A4FCF] group-hover:animate-pulse" />
        <span>Try Demo Login</span>
        
      </button>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-zinc-800/70" />
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">or continue with</span>
        <span className="h-px flex-1 bg-zinc-800/70" />
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/40 py-2.5 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-950 hover:text-white active:scale-[0.98]"
      >
        <FcGoogle size={16} />
        Google
      </button>

      <p className="mt-8 text-center text-sm text-zinc-400 md:hidden">
        Don&apos;t have an account?{" "}
        <button type="button" onClick={onSwitch} className="font-bold text-[#887ad1] hover:text-[#B8AEEA] transition-colors">
          Sign up
        </button>
      </p>
    </div>
  );
}

// ---------- Sign Up form ----------
function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (formData: SignUpFormData) => {
  setIsSubmitting(true);
  try {
    const { data, error } = await authClient.signUp.email({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if(data){
      toast.success("Account created successfully!")
    }

    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
      return;
    }

    reset();
    onSwitch();
    
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="w-full max-w-[380px]">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-100 sm:text-3xl">Create account</h1>
        <p className="mt-2 text-sm text-zinc-400">Start selling or shopping on Karushala</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="su-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Full name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#887ad1] transition-colors">
              <User size={16} />
            </div>
            <input
              id="su-name"
              type="text"
              autoComplete="name"
              {...register("name")}
              className={`w-full rounded-xl border bg-zinc-950/90 pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-[#887ad1] focus:ring-2 focus:ring-[#887ad1]/10 ${
                errors.name ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-800/90"
              }`}
              placeholder="Your name"
            />
          </div>
          {errors.name && <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="su-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Email address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#887ad1] transition-colors">
              <Mail size={16} />
            </div>
            <input
              id="su-email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className={`w-full rounded-xl border bg-zinc-950/90 pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-[#887ad1] focus:ring-2 focus:ring-[#887ad1]/10 ${
                errors.email ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-800/90"
              }`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="su-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#887ad1] transition-colors">
              <Lock size={16} />
            </div>
            <input
              id="su-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              {...register("password")}
              className={`w-full rounded-xl border bg-zinc-950/90 pl-10 pr-11 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-[#887ad1] focus:ring-2 focus:ring-[#887ad1]/10 ${
                errors.password ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-800/90"
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-[#887ad1] transition-colors p-1"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.password.message}</p>}
        </div>

        <div>
          <label htmlFor="su-confirm" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Confirm password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-[#887ad1] transition-colors">
              <Lock size={16} />
            </div>
            <input
              id="su-confirm"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              {...register("confirmPassword")}
              className={`w-full rounded-xl border bg-zinc-950/90 pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition-all focus:border-[#887ad1] focus:ring-2 focus:ring-[#887ad1]/10 ${
                errors.confirmPassword ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/10" : "border-zinc-800/90"
              }`}
              placeholder="••••••••"
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1.5 text-xs text-red-400 font-medium pl-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4A4FCF] to-[#887ad1] py-3 text-sm font-bold text-white shadow-[0_4px_25px_rgba(74,79,207,0.3)] transition-all active:scale-[0.98] hover:opacity-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
          {!isSubmitting && <ArrowRightToLine size={16} className="transition-transform group-hover:translate-x-0.5" />}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400 md:hidden">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="font-bold text-[#887ad1] hover:text-[#B8AEEA] transition-colors">
          Sign in
        </button>
      </p>
    </div>
  );
}