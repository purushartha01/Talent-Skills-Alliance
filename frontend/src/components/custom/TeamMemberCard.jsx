
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, Mail, MailSearch, MessageSquareMore, Trash, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useContext, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { AuthContext } from '@/context/AuthContext';
import { serverAxiosInstance } from '@/utilities/config';
import { toast } from 'sonner';
import ConFirmationPopup from './ConFirmationPopup';




const TeamMemberCard = ({ member, isLeader, projectId, isReviewPresent, review, setShouldParentUpdate }) => {

    const user = useContext(AuthContext).getCurrAuth();
    const currUserId = user?.id ?? user?._id;

    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [reviewData, setReviewData] = useState({
        review: "",
        reviewFor: member?.id ?? member?._id,
        reviewBy: currUserId,
        reviewedOn: new Date(),
        forProject: projectId
    })

    const handleReview = () => {
        console.log(reviewData);

        serverAxiosInstance.post("/project/review/new", { reviewData })
            .then((result) => {
                if (result.status === 200) {
                    console.log(result.data);
                    toast.success("Review added successfully.", {
                        description: "Your review has been submitted successfully.",
                        duration: 3000,
                    })
                    setIsReviewDialogOpen(false);
                }
            }).catch((err) => {
                console.error(err);
                toast.error("Failed to add review. Please try again.", {
                    description: "There was an error while adding the review. Please try again later.",
                    duration: 3000,
                })
            });

    }


    const handleRejectTeamMember = async (pid,mid) => {
        console.log("PID:", pid," MID:", mid);
        const body = {
            projectId: pid,
            memberId: mid,
        }
        serverAxiosInstance.post('/project/remove-member',{...body} ).then((res) => {
            if (res.status === 200) {
                console.log("Status updated successfully")
                toast.success("Member removed successfully", {
                    description: "The member has been removed from the project successfully.",
                    duration: 3000,
                })
                setShouldParentUpdate(prev => prev + 1)
            }
        }).catch((err) => {
            console.log("Error updating status: ", err)
            toast.error("Error removing member", {
                description: "There was an error removing the member from the project.",
                duration: 3000,
            })
        })
    }


    return (
        <div
            className="flex w-full flex-col sm:flex-row min-h-[8vh] sm:items-center justify-between gap-3 p-3 rounded-md border hover:bg-accent hover:shadow-md transition-all duration-200 ease-in-out"
        >
            <div className="flex items-center gap-3">
                <Avatar>
                    <AvatarImage
                        src={member?.about?.profileImg || "/placeholder.svg"}
                        alt={member?.about?.name || ""}
                    />
                    <AvatarFallback>
                        {member?.about?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-medium line-clamp-1 overflow-hidden">
                        <Link to={`/user/${member?._id}`} className="text-foreground hover:underline">
                            {member?.about?.name}
                        </Link>
                    </div>
                    <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className='line-clamp-1'>{member?.about?.title || "Not Disclosed"}</span>
                        {isLeader && <Badge variant="secondary" className="h-4 px-2 text-xs hidden xs:inline-flex">Team Leader</Badge>}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
                {currUserId !== member?.id && currUserId !== member?._id && (
                    <Dialog defaultOpen={false} open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen} className="overflow-hidden">
                        <DialogTrigger asChild>
                            <Button
                                variant={"secondary"} className="flex items-center gap-2 text-foreground"
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log("opened dialog");
                                    setIsReviewDialogOpen(true);
                                }
                                }
                                disabled={member?.email === null || member?.email === undefined}
                            >
                                <span>
                                    <MessageSquareMore className="h-4 w-4" />
                                </span>
                                {
                                    isReviewPresent ?
                                        <div>
                                            <span className='text-sm hidden xs:inline-flex'>
                                                Change Review
                                            </span>
                                        </div>
                                        :
                                        <span className="text-sm hidden xs:inline-flex">
                                            Add Review
                                        </span>
                                }
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-h-2/3 overflow-y-auto">
                            <DialogHeader className="flex flex-col gap-2">
                                <DialogTitle className="text-lg font-semibold">Review Peer&apos;s Performance</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">

                                    {
                                        !isReviewPresent ?
                                            <span>
                                                Please provide a genuine review for {member?.about?.name} based on their performance in the project. Your feedback is valuable and will help them improve.
                                            </span> :
                                            <>
                                                <br />
                                                <span className='text-sm'>
                                                    You have already submitted a review for this member. You can change it if you want.
                                                </span>
                                                <br />
                                                Previous Review: &nbsp;
                                                <span className='font-bold'>
                                                    {review?.review}
                                                </span>
                                            </>
                                    }
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-4">

                                <div className="flex flex-col gap-2">
                                    <Textarea
                                        value={reviewData?.review}
                                        onChange={(e) => setReviewData({ ...reviewData, review: e.target.value })}
                                        placeholder="Write your review here..."
                                        className="resize-none h-32"
                                        minLength={10}
                                    />
                                </div>
                                <Button
                                    variant={"secondary"}
                                    className="w-full"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setReviewData({ ...reviewData, reviewFor: member?.id ?? member?._id, reviewBy: currUserId, reviewedOn: new Date(), forProject: projectId });
                                        handleReview();
                                    }}
                                    disabled={reviewData?.review?.length < 10}
                                >
                                    {
                                        isReviewPresent ?
                                            <span>
                                                Change Review
                                            </span> :
                                            <span>
                                                Submit Review
                                            </span>
                                    }
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>)
                }
                {/* Add alternative method write mail */}
                {/* <a href={`mailto:${member?.email}`} target='_self' className='flex items-center gap-2 text-foreground'>
                    <span>
                        <Mail className="h-4 w-4" />
                    </span>
                    <span className="text-sm hidden sm:inline-flex">
                        Contact
                    </span>
                </a> */}
                {
                    (!isLeader && currUserId !== member?._id) &&
                    < ConFirmationPopup
                        triggerTxt={"Remove"}
                        triggerClass={"textred-500 hover:bg-red-100"}
                        description={`Are you sure you want to reject ${member?.about?.name} as a member?`}
                        onConfirm={e => { e.preventDefault(); handleRejectTeamMember(projectId,member?._id); }}
                        Icon={X}
                    />
                }
            </div>
        </div >
    )
}

export default TeamMemberCard