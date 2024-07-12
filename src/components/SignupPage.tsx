"use client"
import { useFormStatus, useFormState } from "react-dom"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { Loader2 } from "lucide-react"
import { signup } from "@/app/actions/auth"
import { toast } from "react-toastify"
import { redirect, useRouter } from "next/navigation"
import { InitState } from "@/lib/types"
import { motion } from "framer-motion"
import { LiaEye, LiaEyeSlash } from "react-icons/lia"
const initailState: InitState = {
  errorMssage: null,
  status: "",
  authToken: "",
  date: new Date(),
}

const FormDataSchema = z.object({
  name: z.string().min(1, "Name must be 3 or more characters"),
  email: z.string().email().min(1, "Email must be a valid Email"),
  password: z.string().min(6, "Password must be 6 or more characters"),
})

type Inputs = z.infer<typeof FormDataSchema>

const Signup = () => {
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
    const output = await trigger(["email", "name", "password"], {
      shouldFocus: true,
    })

    if (!output) return
    console.log(data)
    const res = await signup(data)
    if (res?.status === "failed") {
      return toast.error(res.errorMessage)
    }
    router.push("/tasks/overview")

    console.log(res)
  }

  const [passwordVisible, setPasswordVisible] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="  grid md:grid-cols-[400px_1fr] 3xl:grid-cols-[450px_1fr] 4xl:grid-cols-[470px_1fr] w-full  overflow-hidden rounded-sm bg-white my-5"
    >
      <div className="  px-3  sm:px-20 md:px-2  ">
        <div className="flex flex-col py-7 4xl:py-10 px-5 gap-y-7  ">
          <div className=" flex justify-center flex-col gap-y-4 items-center">
            <p className=" font-semibold">Task Management App</p>
            <p className=" text-grayColor font-lexend text-xl font-semibold">
              Sign Up
            </p>
          </div>
          <form className=" space-y-9 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className=" space-y-5">
              <div className=" flex flex-col gap-y-[0.2rem]">
                <label
                  htmlFor="email"
                  className=" text-authRed font-manrope text-xs 3xl:text-sm"
                >
                  Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="name"
                  className={` border outline-none text-[1rem] placeholder:text-sm rounded px-2 py-[0.7rem] 3xl:py-[0.7rem] sm:py-[0.4rem] text-grayColor w-full ${
                    errors.name?.message &&
                    "focus:ring-red-500 focus:ring-opacity-50 focus:ring-1"
                  }`}
                />
                {errors.name && (
                  <span className="text-red-500 text-[0.68rem]">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className=" flex flex-col gap-y-[0.2rem]">
                <label
                  htmlFor="email"
                  className=" text-authRed font-manrope text-xs 3xl:text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className={` border outline-none text-[1rem] placeholder:text-sm rounded px-2 py-[0.7rem] 3xl:py-[0.7rem] sm:py-[0.4rem] text-grayColor w-full ${
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
                  className=" text-authRed font-manrope text-xs 3xl:text-sm "
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "password" : "text"}
                    {...register("password", { required: true })}
                    placeholder="password"
                    className={` border outline-none text-[1rem] pr-9  py-[0.7rem] sm:py-[0.4rem] placeholder:text-sm 3xl:py-[0.7rem] rounded px-2 text-grayColor w-full ${
                      errors.password?.message &&
                      "focus:ring-red-500 focus:ring-opacity-50 focus:ring-1"
                    }`}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-[0.68rem]">
                      {errors.password.message}
                    </span>
                  )}
                  <div
                    onClick={() => setPasswordVisible((p) => !p)}
                    className=" absolute right-0 cursor-pointer h-fit top-0 mt-2.5 flex items-center px-3  justify-center"
                  >
                    {passwordVisible ? (
                      <LiaEyeSlash className=" text-slate-500 " />
                    ) : (
                      <LiaEye className=" text-slate-500 " />
                    )}
                  </div>
                </div>
              </div>
              {/* <div className=" flex flex-col gap-y-[0.2rem]">
                <label
                  htmlFor="password"
                  className=" text-authRed font-manrope text-xs 3xl:text-sm"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={passwordVisible ? "password" : "text"}
                    name="confirmPassword"
                    required
                    placeholder="confirm password"
                    className=" border outline-none text-[1rem] pr-9  py-[0.7rem] sm:py-[0.4rem] placeholder:text-sm 3xl:py-[0.7rem] rounded px-2 text-grayColor w-full"
                  />
                  <div
                    onClick={() => setPasswordVisible((p) => !p)}
                    className=" absolute right-0 cursor-pointer  h-full top-0 flex items-center px-3  justify-center"
                  >
                    {passwordVisible ? (
                      <LiaEyeSlash className=" text-slate-500 " />
                    ) : (
                      <LiaEye className=" text-slate-500 " />
                    )}
                  </div>
                </div>
              </div> */}
            </div>
            <button
              disabled={isSubmitting}
              className=" text-center md:py-2 md:text-[0.82rem] flex items-center justify-center gap-x-2 3xl:text-[1rem]  text-[0.95rem] bg-topNav py-[0.6rem] sm:py-1 w-full font-manrope rounded text-white hover:bg-blue-400"
            >
              {isSubmitting ? <Loader2 className=" animate-spin" /> : null}
              <p> Sign Up</p>
            </button>
            {/* <SubmitFxn /> */}
          </form>
          <p className=" md:text-xs text-sm text-topNav 3xl:text-[0.8rem]">
            Dont have an account?{" "}
            <span>
              <Link href="/login" className="underline">
                Log In
              </Link>
            </span>
          </p>
        </div>
      </div>
      <div className="hidden md:block ">
        <div className=" h-full overflow-hidden">
          <Image
            src="/images/robot_sitting.jpg"
            width={2000}
            height={2000}
            quality={80}
            priority
            sizes="(max-width: 768px) 100vw (max-width: 1200px) 50vw, 33vw"
            className=" w-full h-full object-cover "
            alt="robot"
          />
        </div>
      </div>
    </motion.div>
  )
}

export default Signup
