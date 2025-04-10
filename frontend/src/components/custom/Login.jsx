import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from './../../../node_modules/@hookform/resolvers/zod/src/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Link } from "react-router-dom";
import { toast } from "sonner";



const Login = () => {

  const formSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 8 characters long' })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: 'Password must have atleast(1 Uppercase, 1 Lowercase, 1 number and 1 special symbol)' }),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
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
            })} className="w-full flex flex-col items-center justify-around">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel className="text-lg font-semibold mb-2">Email</FormLabel>
                  <FormControl className="w-full flex flex-col items-center justify-center mb-4">
                    <Input placeholder="Enter your email" onChange={(e) => {
                      field.onChange(e);
                      if (e.target.value.length > 0) {
                        field.setValue("email", e.target.value);
                      }
                    }} autoComplete={"email"} className="mb-4 w-9/10" required {...field} />
                  </FormControl>
                  {/* <FormMessage className="text-red-500" /> */}
                </FormItem>)} />
              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel className="text-lg font-semibold mb-2">Password</FormLabel>
                  <FormControl className="w-full flex flex-col justify-center">
                    <div className="w-full flex flex-row items-center justify-between">
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" onChange={(e) => {
                        field.onChange(e);
                        if (e.target.value.length > 0) {
                          field.setValue("password", e.target.value);
                        }
                      }} className="mb-4 w-8/10" required {...field} />
                      <div className="w-2/10 h-full flex flex-row  items-center justify-center mb-4" onClick={togglePasswordVisibility}>
                        {showPassword ?
                          <EyeIcon className="cursor-pointer" />
                          :
                          <EyeClosedIcon className="cursor-pointer" />
                        }
                      </div>
                    </div>
                  </FormControl>
                  {/* <FormMessage className="text-red-500" /> */}
                </FormItem>)} />
              <Button type="submit" className="w-3/4 bg-blue-500 text-white hover:bg-blue-600">Login</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className={"w-full h-1/5 flex flex-col items-center justify-center"}>
          <div className="w-full flex flex-row items-center justify-center">
            <span className="text-gray-500">Don't have an account?</span>
            <Link to="/signup" className="text-blue-500 hover:text-blue-600 ml-2">Sign Up</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login