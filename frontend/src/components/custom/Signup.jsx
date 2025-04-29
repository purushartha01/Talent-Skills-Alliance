import { Link, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form"
import { z } from "zod"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod/src/zod"
import { EyeClosedIcon, EyeIcon, Loader, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import CustomTooltip from "./CustomTooltip"
import OTPComponent from "./OTPComponent"
import { serverAxiosInstance } from "@/utilities/config"
import { AuthContext } from "@/context/AuthContext"

const Signup = () => {

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }


  const navigate = useNavigate();
  const { getCurrAuth } = useContext(AuthContext);

  const user = getCurrAuth();

  const signupFormSchema = z.object({
    username: z.string().min(2, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: "Password must have atleast(1 Uppercase, 1 Lowercase, 1 number and 1 special symbol)" }),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });


  const onSubmit = (data) => {
    if (isFormSubmitting) return;
    setIsFormSubmitting(true);

    const { username, email, password } = data;
    serverAxiosInstance.post("/auth/register", { username, email, password }).then((res) => {
      if (res.status === 200) {
        toast.success("Signup successful", {
          description: "You have successfully signed up",
        });
        form.reset();
        // setCurrAuth(res.data.userData);
        setShouldRedirect(true);
      }
    }).catch((err) => {
      toast.error("Signup failed", {
        description: err.response.data.error,
        cancelable: true,
      });
      form.reset();
    }).finally(() => {
      setIsFormSubmitting(false);
    })
  }

  const email = form.watch("email");
  const emailSchema = z.string().email({ message: "Invalid email address" })
  const isEmailValid = emailSchema.safeParse(email).success;



  useEffect(() => {
    if (Object.keys(user).length > 0) {
      if (window.history.length > 2) {
        navigate(-1);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, navigate]);


  useEffect(() => { setIsEmailVerified(false) }, [email])
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/login");
    }
  }, [shouldRedirect, navigate]);

  return (
    <div className="h-[90vh] w-full flex flex-col items-center justify-center">
      <Card className="w-9/10 h-9/10 sm:w-2/3 md:w-3/7 flex flex-col items-center justify-center shadow-lg">
        <CardHeader className="w-full h-1/5 flex flex-col items-center justify-center">
          <CardTitle className="text-2xl font-bold">Signup</CardTitle>
          <CardDescription className="text-gray-500 hidden">Please enter your credentials</CardDescription>
        </CardHeader>
        <CardContent className="w-full h-3/5 flex flex-col items-center justify-center my-8">
          {/* Form goes here */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (err) => {

              Object.keys(err).forEach((key) => {
                toast.error("Invalid input", {
                  description: err[key].message,
                });
              })
            })} className="w-full h-full flex flex-col items-center justify-center">
              <FormField control={form.control} name="username" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel>
                    Username
                    <CustomTooltip tipContent={["Ex: johndoe123"]} />
                  </FormLabel>
                  <FormControl>
                    <input {...field} type="text" placeholder="Enter your preferred username" className="border rounded-md p-2 w-full" />
                  </FormControl>
                </FormItem>
              )} />

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel>
                    Email
                    <CustomTooltip tipContent={["Ex: johndoe@example.com"]} />
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full flex flex-col items-center justify-center">
                      <input {...field} type="email" placeholder="Enter your email" className="border rounded-md p-2 w-full pr-29" />
                      <OTPComponent emailToVerify={email} isEmailValid={isEmailValid} onEmailVerification={() => { setIsEmailVerified(true) }} isEmailVerified={isEmailVerified} />
                    </div>
                  </FormControl>
                </FormItem>
              )} />



              {/* TODO: Adjust OTP-based into a modal*/}



              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4">
                  <FormLabel>
                    Password
                    <CustomTooltip tipContent={["Password must have minimum 8 characters", "Password must have atleast(1 Uppercase, 1 Lowercase, 1 number and 1 special symbol) "]} />
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full flex flex-row items-center justify-between">

                      <input {...field} type={showPassword ? "text" : "password"} placeholder="Enter your password" className="border rounded-md p-2 w-full" />
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={togglePasswordVisibility}>
                        {showPassword ?
                          <EyeIcon className="cursor-pointer" />
                          :
                          <EyeClosedIcon className="cursor-pointer" />
                        }
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                <FormItem className="w-full flex flex-col justify-center mb-4 ">
                  <FormLabel>
                    Confirm Password
                    <CustomTooltip tipContent={["Must match the Password field!"]} />
                  </FormLabel>
                  <FormControl>
                    <div className="relative w-full flex flex-row items-center justify-between">
                      <input {...field} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" className="border rounded-md p-2 w-full" name="confirmPassword" />
                      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ?
                          <EyeIcon className="cursor-pointer" />
                          :
                          <EyeClosedIcon className="cursor-pointer" />
                        }
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )} />
              <Button type="submit" disabled={!form.formState.isValid || !isEmailVerified} className="w-3/4 mb-2">
                {console.log(isFormSubmitting)}
                {isFormSubmitting ?
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-4 w-4 mr-3" />
                    Signing up...
                  </span>
                  : <span>Signup</span>
                }
              </Button>
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