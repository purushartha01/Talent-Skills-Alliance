import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { EyeClosedIcon, EyeIcon, Info } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import CustomTooltip from "./CustomTooltip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { serverAxiosInstance } from "@/utilities/config";
import { logStatements } from "@/utilities/utilityMethods";



const Login = () => {
  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: 'Password must have atleast(1 Uppercase, 1 Lowercase, 1 number and 1 special symbol)' }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    logStatements("Login Data", data);
    serverAxiosInstance.post("/auth/login", data)
      .then((res) => {
        console.log("Login Response", res.data);
        toast.success("Login successful", {
          description: "You have successfully logged in",
        });
      })
      .catch((err) => {
        logStatements("Login Error", err.response.data.error);
        toast.error("Login failed", {
          description: err.response.data.error,
          cancelable: true,
        });
      })
  }


  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  return (
    <div className="h-[90vh] w-full flex items-center justify-center">
      <Card className="w-9/10 sm:w-2/3 h-3/4 md:w-2/5 flex flex-col items-center justify-center shadow-lg">
        <CardHeader className="w-full h-1/5 flex flex-col items-center justify-center">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription className="text-gray-500 hidden">Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-2/5 flex flex-col items-center justify-center my-8">

          <Form {...form} className="w-full h-full flex flex-col items-center justify-center">
            <form onSubmit={form.handleSubmit(onSubmit, (err) => {
              console.log("Form Error", err);
              Object.keys(err).forEach((key) => {
                toast.error("Invalid input", {
                  description: err[key].message,
                });
              })
              const firstErrorField = Object.keys(err)[0];
              form.trigger(firstErrorField, { shouldFocus: true });
            })} className="w-full flex flex-col items-center justify-around">

              {/* Email field */}
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel className="text-lg font-semibold mb-2 inline-flex">
                    Email
                    <CustomTooltip tipContent={["Ex: johndoe@example.com"]} />
                  </FormLabel>
                  <FormControl className="w-full flex flex-col items-center justify-center mb-4">
                    <Input placeholder="Enter your email"
                      className="w-full pr-9"
                      onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value.length > 0) {
                          field.setValue("email", e.target.value);
                        }
                      }} autoComplete={"email"} required {...field} />
                  </FormControl>
                </FormItem>)} />

              {/* Password field */}
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center">
                  <FormLabel className="text-lg font-semibold mb-2">
                    Password
                    <CustomTooltip tipContent={["Password must have minimum 8 characters", "Password must have atleast(1 Uppercase, 1 Lowercase, 1 number and 1 special symbol) "]} />
                  </FormLabel>
                  <FormControl className="w-full flex flex-col justify-center">
                    <div className="relative w-full flex flex-row items-center justify-between">
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value.length > 0) {
                          field.setValue("password", e.target.value);
                        }
                      }} className="mb-4 w-full pr-4" required {...field} />
                      <div className="absolute top-1/3 right-1 -translate-y-1/2 flex flex-row  items-center justify-center" onClick={togglePasswordVisibility}>
                        {showPassword ?
                          <EyeIcon className="cursor-pointer" />
                          :
                          <EyeClosedIcon className="cursor-pointer" />
                        }
                      </div>

                    </div>
                  </FormControl>
                </FormItem>)} />

              {/* Forgot Password Link */}
              <div className="w-full flex flex-row items-center justify-end mb-4">
                <Link to="/forgot-password" className="text-blue-500 hover:text-blue-600 text-sm">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" onClick={(e) => console.log()} disabled={form.formState.isValid ? false : true} className={`w-3/4 bg-blue-500 text-white hover:bg-blue-600`}>
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className={"w-full h-1/5 flex flex-col items-center justify-center"}>
          <div className="w-full flex flex-row items-center justify-center">
            <span className="text-gray-500">Don&apos;t have an account?</span>
            <Link to="/signup" className="text-blue-500 hover:text-blue-600 ml-2">Sign Up</Link>
          </div>
        </CardFooter>
      </Card >
    </div >
  )
}

export default Login;