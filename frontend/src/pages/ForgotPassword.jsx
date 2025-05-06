import OTPComponent from "@/components/custom/OTPComponent";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { set } from 'date-fns';
import { Button } from "@/components/ui/button";
import { CrossIcon, Eye, EyeClosed, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { serverAxiosInstance } from "@/utilities/config";
import { toast } from "sonner";
import Timer from "@/components/custom/Timer";


const EmailSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
});

const PasswordSchema = z.object({
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: "Password must have atleast(1 Uppercase, 1 Lowercase, 1 number and 1 special symbol)" }),
    confirmPassword: z.string()

}).refine((val) => val.password === val.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});



const ForgotPassword = () => {

    const navigate = useNavigate();

    const user = useContext(AuthContext).getCurrAuth();

    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [isEmailVerified, setIsEmailVerified] = useState(false);

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [doPasswordsMatch, setDoPasswordsMatch] = useState(false);

    const handleEmailValidation = (val) => {
        const result = EmailSchema.safeParse({ email: val });
        // console.log(result);
        if (result.success) {
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    };

    const handlePasswordValidation = (val) => {
        const result = PasswordSchema.safeParse({ password: password, confirmPassword: val });
        // console.log(result);
        if (result.success) {
            setDoPasswordsMatch(true);
        } else {
            setDoPasswordsMatch(false);
        }
    }

    const handlePasswordChange = async () => {
        const body = {
            email: email,
            password: password
        }
        await serverAxiosInstance.post("/auth/forgot", { ...body }).then((res) => {
            if (res.status === 200) {
                toast.success("Password changed successfully!", {
                    description: "You can now login with your new password.",
                    duration: 3000,
                })
                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 200);
            }
        }).catch((err) => {
            toast.error("An error occurred while changing password!", {
                description: err?.response?.data?.message,
                duration: 3000,
            })
        });
    }



    useEffect(() => {
        if (Object.keys(user).length > 0) {
            console.log("User is logged in, redirecting to home page");
            if (window.history.length > 2) {
                navigate(-1);
            } else {
                navigate("/", { replace: true });
            }
        }
    }, [user, navigate])

    return (
        <div className="flex flex-col justify-center items-center h-[82vh] w-full">
            <Card className={"relative min-w-[300px] max-w-2xl w-full h-[70%] flex flex-col items-center justify-center gap-4 p-6"}>
                <CardHeader className={"flex flex-col w-full items-center justify-center gap-4"}>
                    <CardTitle className={"text-2xl font-bold text-center"}>
                        Forgot Password
                    </CardTitle>
                    <CardDescription className={"text-sm text-muted-foreground text-center"}>
                        Enter your email address to reset your password.
                    </CardDescription>
                </CardHeader>
                <CardContent className={"flex flex-col w-full items-center justify-center gap-4"}>
                    <div className="relative w-3/4 flex flex-col items-center justify-center">
                        <Input
                            type="email"
                            placeholder="Enter your email"
                            className="border rounded-md py-2 w-full pl-2 pr-10"
                            autoComplete="on"
                            name="email"
                            autoFocus
                            required
                            value={email}
                            onChange={(e) => { setEmail(e.target.value); handleEmailValidation(e.target.value) }}
                        />

                        <OTPComponent emailToVerify={email} isEmailValid={isEmailValid} onEmailVerification={() => { setIsEmailVerified(true) }} isEmailVerified={isEmailVerified} />
                    </div>
                    <div className={`${!isEmailVerified ? "hidden" : "block"} w-3/4 flex flex-col items-center justify-center gap-2`}>
                        <div className="text-sm text-muted-foreground text-center">
                            <h3 className="text-lg font-bold text-center text-foreground">
                                Enter your new password:
                            </h3>
                        </div>
                        <div className="relative w-full flex flex-col items-center justify-center">
                            <Input
                                type={showPassword ? "text" : "password"}
                                onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter new password"
                                className={"px-10"}
                            />
                            <Button variant={"ghost"} className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(prev => !prev)}>
                                {showPassword ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeClosed className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <div className="relative w-full flex flex-col items-center justify-center">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={(e) => { setConfirmPassword(e.target.value); handlePasswordValidation(e.target.value); }}
                                value={confirmPassword}
                                placeholder="Confirm new password"
                                className={"px-10"} />
                            <X className={`pl-2 absolute left-0 top-1/2 transform -translate-y-1/2 text-red-600 ${doPasswordsMatch ? "hidden" : ""}`} />
                            <Button variant={"ghost"} className="absolute right-0 top-1/2 transform -translate-y-1/2" onClick={() => setShowConfirmPassword(prev => !prev)}>
                                {showConfirmPassword ? (
                                    <Eye className="h-4 w-4" />
                                ) : (
                                    <EyeClosed className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                            variant={""}
                            className={"w-full mt-4"}
                            disabled={!isEmailVerified || !doPasswordsMatch}
                            onClick={handlePasswordChange}
                        >
                            Change Password
                        </Button>
                    </div>
                </CardContent>

            </Card>

        </div>
    )
}

export default ForgotPassword