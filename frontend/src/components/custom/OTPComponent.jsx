import { Check, ShieldEllipsis } from "lucide-react"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"
import { Label } from "../ui/label"
import { useEffect, useState } from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { logStatements } from "@/utilities/utilityMethods"
import { serverAxiosInstance } from "@/utilities/config"
import { toast } from "sonner"

const OTPComponent = ({ emailToVerify, isEmailValid, onEmailVerification, isEmailVerified }) => {


    const [isOtpSent, setIsOtpSent] = useState(false)
    const [otp, setOtp] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false)
    const [expiresIn, setExpiresIn] = useState(300);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSendOtp = async () => {
        // Simulate sending OTP
        const res = await serverAxiosInstance.post("/auth/generate", { email: emailToVerify }).then((res) => {
            if (res.status === 200) {
                // logStatements(res.data);
                setIsOtpSent(true);
                setExpiresIn(res.data.expiresIn);
                toast.success("OTP sent successfully", {
                    description: "Please check your email for the OTP",
                    duration: 5000,
                    action: {
                        label: "OK",
                        onClick: () => {
                            toast.dismiss()
                        },
                    },
                })
            }
        }).catch((res) => {
            toast.error("Failed to send OTP", {
                description: res?.response?.data?.error,
                duration: 5000,
                action: {
                    label: "X",
                    onClick: () => {
                        toast.dismiss()
                    },
                },
            })
            setIsOtpSent(true);
        }
        );
    }

    const handleVerifyOtp = async () => {
        serverAxiosInstance.post("/auth/verify", { email: emailToVerify, otp: otp }).then((res) => {
            if (res.status === 200) {
                toast.success("OTP verified successfully", {
                    description: "You have successfully verified your email",
                    duration: 5000,
                    action: {
                        label: "OK",
                        onClick: () => {
                            toast.dismiss()
                        },
                    },

                })
                setIsOtpVerified(true);
                onEmailVerification();
                setIsDialogOpen(false);
            }
        }).catch((err) => {
            toast.error("OTP verification failed", {
                description: err.response.data.error,
                duration: 5000,
                action: {
                    label: "X",
                    onClick: () => {
                        toast.dismiss()
                    },
                },
            })
        })
    }


    useEffect(() => {
        setIsOtpSent(false);
    }, [emailToVerify, isEmailVerified])

    return (
        <Dialog modal={false} open={isDialogOpen} onOpenChange={() => { setIsDialogOpen(); setOtp("") }}>
            <DialogTrigger asChild className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer">
                {isEmailVerified ? <Check size={30} className=" text-green-700" /> : <Button disabled={!isEmailValid} type="button">Verify</Button>}
            </DialogTrigger>
            <DialogHeader className="flex flex-col items-center justify-center">

            </DialogHeader>
            <DialogContent className="w-7/10 h-fit flex flex-col items-center justify-center">
                <DialogHeader className="flex flex-col items-center justify-center">
                    <DialogTitle className="text-center text-2xl font-bold">Email Verification</DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        {
                            isOtpSent ?
                                `Enter the OTP sent to your email:${emailToVerify}`
                                :
                                `Please verify your email: ${emailToVerify}`
                        }
                    </DialogDescription>
                </DialogHeader>
                <Button variant="default" className="mt-2" onClick={handleSendOtp}>
                    Send OTP
                    <ShieldEllipsis size={20} className="mr-2" />
                </Button>
                {isOtpSent &&
                    <p className="text-sm font-normal">OTP sent, expires at: <span className="font-semibold">
                        {new Date(expiresIn).toLocaleTimeString(undefined, { timeZone: "Asia/Kolkata" })}
                    </span>
                    </p>
                }
                <div className="w-full flex flex-col justify-center">
                    <Label className="text-sm font-semibold mb-2 inline-flex">OTP</Label>
                    <div className="w-full flex flex-col sm:flex-row gap-6 items-center justify-between md:justify-evenly">
                        <InputOTP disabled={!isOtpSent} maxLength={6} length={6} value={otp} onChange={(value) => setOtp(value)} className="w-full" pattern={REGEXP_ONLY_DIGITS}>
                            <InputOTPGroup className={"w-full flex flex-row items-center justify-between sm:gap-2 md:gap-3"}>
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <InputOTPSlot key={index} index={index} className={" w-[1.7rem] sm:w-[2rem] border border-black sm:rounded-md"} />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                        <Button variant={""} title="Verify" disabled={(otp.length < 6 || !isOtpSent || isOtpVerified) && isEmailVerified} onClick={handleVerifyOtp} className="w-full sm:w-1/4 flex items-center justify-center gap-2">
                            <ShieldEllipsis size={30} />
                            <span className="">Verify</span>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default OTPComponent