import { Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';


const ApplicantsCard = ({ applicant }) => {
    console.log(applicant)

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
        <div
            key={applicant?.id}
            className="flex flex-col sm:flex-row min-h-[8vh] sm:items-center justify-between gap-3 p-3 rounded-md border"
        >
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage
                        src={applicant?.applicant?.about?.profileImg || "/placeholder.svg"}
                        alt={applicant?.applicant?.about?.name || "Applicant"}
                    />
                    <AvatarFallback>
                        {applicant?.applicant?.about?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-medium line-clamp-1">{applicant?.applicant?.about?.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className='line-clamp-1'>{applicant?.applicant?.about?.title || "Not Disclosed"}</span>
                        <span>Applied {formatDate(applicant?.appliedOn)}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
                {/* <Badge className={applicantStatusInfo.color}>
                                                {applicantStatusInfo.icon}
                                                {applicantStatusInfo.label}
                                            </Badge> */}

                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                    // onClick={() => viewApplicantDetails(proposal, applicant)}
                    >
                        View Profile
                    </Button>

                    {/* <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => {
                                                            setEmailDetails({
                                                                to: applicant.email,
                                                                subject: `Regarding your application to: ${proposal.title}`,
                                                                message: `Hi ${applicant.name.split(" ")[0]},\n\n`,
                                                            })
                                                            setIsEmailDialogOpen(true)
                                                        }}
                                                    >
                                                        <Mail className="h-4 w-4" />
                                                        <span className="sr-only">Email</span>
                                                    </Button>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Send Email</DialogTitle>
                                                            <DialogDescription>
                                                                Contact the applicant via email.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4">
                                                            <div className="space-y-2">
                                                                <label htmlFor="email-to" className="text-sm font-medium">
                                                                    To
                                                                </label>
                                                                <Input id="email-to" value={emailDetails.to} readOnly />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label htmlFor="email-subject" className="text-sm font-medium">
                                                                    Subject
                                                                </label>
                                                                <Input
                                                                    id="email-subject"
                                                                    value={emailDetails.subject}
                                                                    onChange={(e) =>
                                                                        setEmailDetails({
                                                                            ...emailDetails,
                                                                            subject: e.target.value,
                                                                        })
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label htmlFor="email-message" className="text-sm font-medium">
                                                                    Message
                                                                </label>
                                                                <Textarea
                                                                    id="email-message"
                                                                    rows={6}
                                                                    value={emailDetails.message}
                                                                    onChange={(e) =>
                                                                        setEmailDetails({
                                                                            ...emailDetails,
                                                                            message: e.target.value,
                                                                        })
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <DialogFooter>
                                                            <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                onClick={handleSendEmail}
                                                                disabled={!emailDetails.subject || !emailDetails.message}
                                                            >
                                                                <Send className="mr-2 h-4 w-4" />
                                                                Send Email
                                                            </Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog> */}

                    {/* {applicant.status === "pending" && (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-green-600"
                                                            onClick={() =>
                                                                updateApplicantStatus(proposal.id, applicant.id, "accepted")
                                                            }
                                                        >
                                                            <CheckCircle className="h-4 w-4" />
                                                            <span className="sr-only">Accept</span>
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-red-600"
                                                            onClick={() =>
                                                                updateApplicantStatus(proposal.id, applicant.id, "rejected")
                                                            }
                                                        >
                                                            <XCircle className="h-4 w-4" />
                                                            <span className="sr-only">Reject</span>
                                                        </Button>
                                                    </>
                                                )} */}
                </div>
            </div>
        </div>
    )
}

export default ApplicantsCard