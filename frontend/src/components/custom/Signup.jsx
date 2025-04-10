import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod/src/zod"

const Signup = () => {

  const [isOtpSent, setIsOtpSent] = useState(false)
  const [otp, setOtp] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const signupFormSchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: "Password must have atleast(1 Uppercase, 1 Lowercase, 1 number and 1 special symbol)" }),
  });

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    mode: "onBlur",
  });


  const onSubmit = (data) => {
    console.log(data);
  }



  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <Card className="w-9/10 sm:w-2/3 h-3/4 md:w-2/5 flex flex-col items-center justify-center shadow-lg">
        <CardHeader className="w-full h-1/5 flex flex-col items-center justify-center">
          <CardTitle className="text-2xl font-bold">Signup</CardTitle>
          <CardDescription className="text-gray-500 hidden">Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-2/5 flex flex-col items-center justify-center my-8">
          {/* Form goes here */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (err) => {
              Object.keys(err).forEach((key) => {
                toast.error("Invalid input", {
                  description: err[key].message,
                });
              })
            })} className="w-full h-full flex flex-col items-center justify-center">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <input {...field} type="text" placeholder="Enter your preferred username" className="border rounded-md p-2 w-full" />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <input {...field} type="email" placeholder="Enter your email" className="border rounded-md p-2 w-full" />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <input {...field} type={showPassword ? "text" : "password"} placeholder="Enter your password" className="border rounded-md p-2 w-full" />
                    {
                      // TODO: Add a toggle button to show/hide password
                    }
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="confirmPassword" render={({ field }) => ()}>
                {//TODO: Add a confirm password field}
              </FormField>
            </form>

          </Form>
        </CardContent>

        <CardFooter className="w-full h-1/5 flex flex-col items-center justify-center">
          <CardDescription className="text-gray-500">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link></CardDescription>
        </CardFooter>

      </Card>

    </div>
  )
}

export default Signup