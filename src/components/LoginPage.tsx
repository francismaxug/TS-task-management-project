"use client"
import Image from "next/image"
import Link from "next/link"
import { useFormStatus, useFormState } from "react-dom"
import { z } from "zod"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { login } from "@/app/actions/auth"
import { toast } from "react-toastify"
import { redirect, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"

const FormDataSchema = z.object({
  email: z.string().email().min(1, "Email must be a valid Email"),
  password: z.string().min(6, "password must be 6 or more characters"),
})

type Inputs = z.infer<typeof FormDataSchema>

const Login = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(FormDataSchema),
  })

  const onSubmit: SubmitHandler<Inputs> = async (
    data: z.infer<typeof FormDataSchema>
  ) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const output = await trigger(["email", "password"], { shouldFocus: true })

    if (!output) return
    console.log(data)
    const res = await login(data)
    if (res?.status === "failed") {
      return toast.error(res.errorMessage)
    }
    router.push("/tasks/overview")
    // console.log(res)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="  grid md:grid-cols-[400px_1fr]  3xl:grid-cols-[470px_1fr] 4xl:grid-cols-[520px_1fr] overflow-hidden rounded-sm w-full bg-white mt-10 3xl:my-14 4xl:my-20"
    >
      <div className="  px-3  sm:px-20 md:px-2 py-6 3xl:py-10  ">
        <div className="flex flex-col py-7 gap-y-4 px-5">
          <div className=" flex justify-center flex-col gap-y-4 items-center">
            <p className=" font-semibold">Task Management App</p>
            <p className=" text-grayColor font-lexend text-xl font-semibold">
              Log In
            </p>
          </div>
          <form
            className=" space-y-9 w-full "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className=" space-y-5 w-full">
              <div className=" flex flex-col gap-y-[0.2rem] w-full">
                <label
                  htmlFor="email"
                  className=" text-authRed font-manrope text-xs 3xl:text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  className={`border outline-none text-[0.9rem] placeholder:text-[0.9rem] rounded px-2 py-[0.5rem] 3xl:py-[0.7rem] sm:py-[0.3rem] text-grayColor w-full ${
                    errors.email?.message &&
                    "focus:ring-red-500 focus:ring-opacity-50 focus:ring-1"
                  }`}
                />
                {errors.email && (
                  <span className="text-red-500 text-[0.68rem]">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className=" flex flex-col gap-y-[0.2rem]">
                <label
                  htmlFor="password"
                  className=" text-authRed font-manrope text-xs 3xl:text-sm"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password", { required: true })}
                  className={` border outline-none text-[0.9rem]  py-[0.5rem] sm:py-[0.3rem] placeholder:text-[0.9rem] rounded px-2 3xl:py-[0.7rem] text-grayColor w-full ${
                    errors.password?.message &&
                    "focus:ring-red-500 focus:ring-opacity-50 focus:ring-1"
                  }`}
                />
                {errors.password && (
                  <span className="text-red-500 text-[0.68rem]">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className=" w-full bg-gradient-to-r  from-[hsl(251,82%,67%)] via-purple-500 to-[#8b81f7e1] relative before:w-0 before:hover:w-full before:duration-300 before:hover:bg-[hsl(251,82%,67%)] before:absolute text-white before:bg-opacity-30 before:inset-0 before:z-10 before:transition-all py-[0.4rem] px-2 rounded-full before:rounded-full "
            >
              <p className=" relative z-30 text-[0.85rem] px-1 flex items-center justify-center gap-x-2 text-center w-full">
                {isSubmitting ? <Loader2 className=" animate-spin" /> : null}{" "}
                Log In
              </p>
            </button>
            {/* <SubmitFxn /> */}
          </form>
          <p className=" md:text-xs text-sm text-topNav 3xl:text-[0.8rem]">
            Dont have an account?{" "}
            <span>
              <Link href="/signup" className="underline">
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
      <div className="hidden md:block">
        <div className=" h-full w-full">
          <Image
            src="/images/task.png"
            width={2000}
            height={2000}
            quality={80}
            priority
            sizes="(max-width: 768px) 100vw (max-width: 1200px) 50vw, 33vw"
            className=" w-full h-full object-cover"
            alt="robot"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Login
