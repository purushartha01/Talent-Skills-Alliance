
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Check, Mail, MailSearch, MessageSquareMore, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useContext, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { AuthContext } from '@/context/AuthContext';
import { serverAxiosInstance } from '@/utilities/config';
import { toast } from 'sonner';




const TeamMemberCard = ({ member, isLeader, projectId }) => {

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
            if(result.status === 200) {
                console.log(result.data);
                toast.success("Review added successfully.",{
                    description: "Your review has been submitted successfully.",
                    duration: 3000,
                })
                setIsReviewDialogOpen(false);
            }
        }).catch((err) => { 
            console.error(err);
            toast.error("Failed to add review. Please try again.",{
                description: "There was an error while adding the review. Please try again later.",
                duration: 3000,
            })
        });

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
                    <div className="font-medium line-clamp-1 overflow-hidden">{member?.about?.name}</div>
                    <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className='line-clamp-1'>{member?.about?.title || "Not Disclosed"}</span>
                        {isLeader && <Badge variant="secondary" className="h-4 px-2 text-xs">Team Leader</Badge>}
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
                {currUserId !== member?.id && currUserId !== member?._id && (
                    <Dialog defaultOpen={false} open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
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
                                <span className="text-sm hidden sm:inline-flex">
                                    Review
                                </span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader className="flex flex-col gap-2">
                                <DialogTitle className="text-lg font-semibold">Review Peer&apos;s Performance</DialogTitle>
                                <DialogDescription className="text-sm text-muted-foreground">
                                    Please provide a genuine review for {member?.about?.name} based on their performance in the project. Your feedback is valuable and will help them improve.
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
                                    Submit Review
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

            </div>
        </div >
    )
}

export default TeamMemberCard