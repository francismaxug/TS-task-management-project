"use server"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server"

interface FormState {
  name: string
  email: string
  password: string
}

interface FormLogin extends Omit<FormState, "name"> {}

console.log(process.env.SECRET_KEY)

const secretKey = (process.env.SECRET_KEY as string) || "secret"
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10 sec from now")
    .sign(key)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  })
  return payload
}
export async function signup(formdata: FormState): Promise<any> {
  console.log(formdata)
  const email = formdata["email"] as string
  const name = formdata["name"] as string
  const password = formdata["password"] as string

  //check if the password and confirm password match

  try {
    const response = await fetch(`http://localhost:3000/api/register`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
    // console.log("Response status:", response.status)
    // console.log("Response headers:", response.headers)

    if (!response.ok) {
      const errorData = await response.json()
      console.log(errorData)
      return {
        status: errorData.status,
        errorMessage: errorData.message,
      }
    }
    const data = await response.json()
    console.log(data)
    const user = {
      name,
      email,
    }
    const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    //encryt the user data
    const session = await encrypt({ user, expires })

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true })
    // redirect("/chat")
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function login(formdata: FormLogin): Promise<any> {
  console.log(formdata)
  const email = formdata["email"] as string

  const password = formdata["password"] as string

  // console.log(process.env.AUTH_URL)

  try {
    const response = await fetch(`http://localhost:3000/api/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.log(errorData)
      return {
        status: errorData.status,
        errorMessage: errorData.message,
      }
    }
    const data = await response.json()
    console.log(data)
    const user = {
      name: data.name,
      email,
    }
    const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ user, expires })

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true })
    // redirect("/chat")
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getSession() {
  const session = cookies().get("session")?.value
  if (!session) return null
  return await decrypt(session)
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) })
}
