"use client";

import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginWithEmailAndPassword } from "@/app/backend";
import { useAuthContext } from "../context/AuthContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const validationSchema = z.object({
  email: z.string().min(3, { message: "Email is required" }).nonempty(),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const SignInPage = () => {
  const { dispatch } = useAuthContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    setLoading(true);

    try {
      await loginWithEmailAndPassword(data);
      dispatch({ type: "LOGIN" });
      router.push("/");
    } catch (error) {
      setError((error as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="h-full w-full rounded-3xl bg-white px-4 lg:h-[700px] lg:w-[500px]">
        <div className="mt-5 flex justify-center">
          <h1 className="text-3xl font-semibold text-hero-bg lg:text-2xl">
            SIGN <span className="text-orange">IN</span>
          </h1>
        </div>

        <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="text-lg text-black" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className={`mt-2 w-full rounded-md border-2 border-gray-text bg-white p-4 pt-4 font-semibold outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
                errors.email ? "border-red-600" : "border-gray-300"
              } focus:outline-orange`}
              {...register("email")}
            />
            {errors.email ? (
              <p className="mt-2 text-xs italic text-red-600">
                {errors.email?.message}
              </p>
            ) : null}
          </div>

          <div className="mt-4">
            <label className="text-lg text-black" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className={`mt-2 w-full rounded-md border-2 border-gray-text bg-white p-4 pt-4 font-semibold outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
                errors.email ? "border-red-600" : "border-gray-300"
              } focus:outline-orange`}
              {...register("password")}
            />
            {errors.password ? (
              <p className="mt-2 text-xs italic text-red-500">
                {errors.password?.message}
              </p>
            ) : null}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              className="w-full flex justify-center items-center rounded-3xl bg-slate-700 p-4 font-semibold text-white"
              type="submit"
            >
              {loading ? (
                <div className="h-4 w-4 animate-spinner rounded-full border border-t border-t-slate-800 ease-linear"></div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
          <p className="mt-2 text-center text-red-500">{error}</p>
        </form>

        <div className="mt-4 flex justify-center">
          <h1 className="text-lg text-black">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="cursor-pointer text-orange">
              Sign up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
