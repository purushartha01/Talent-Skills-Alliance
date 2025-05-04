import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthContext } from "@/context/AuthContext";
import { serverAxiosInstance } from "@/utilities/config";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck, CheckCircle, Loader, MessageSquare } from "lucide-react";


// This component is used to view a proposal. It fetches the proposal data from the server and displays it. It also allows the user to save or unsave the proposal and apply for it.
// It uses the useParams hook to get the proposal ID from the URL. It also uses the useContext hook to get the current user data from the AuthContext. It uses the useState hook to manage the state of the proposal data, loading state, and saved/unsaved state. It uses the useEffect hook to fetch the proposal data when the component mounts or when the proposal ID changes.

// COMPLETED: 100%



const ViewProposal = () => {

    const { getCurrAuth } = useContext(AuthContext);
    const currUser = getCurrAuth();
    const currUserId = currUser.id ?? currUser._id;

    const [isLoading, setIsLoading] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [isApplied, setIsApplied] = useState(false)
    const [statusChange, setStatusChange] = useState(0)

    const proposalId = useParams().id;

    const [proposal, setProposal] = useState({})

    const handleSave = async (proposalId) => {
        setIsLoading(true);
        // console.log("Saved", proposalId)
        await serverAxiosInstance.post('/user/proposal/save', { proposalID: proposalId })
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    setIsSaved(true);
                    setStatusChange((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            })
    }

    const handleUnsave = async (proposalId) => {
        // console.log("Unsave", proposalId)
        setIsLoading(true);
        await serverAxiosInstance.post('/user/proposal/unsave', { proposalID: proposalId })
            .then((res) => {
                if (res.status === 200) {
                    // console.log("Withing then()")
                    setIsSaved(false);
                    setStatusChange((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            })
    }

    const handleApply = async (proposalId) => {
        // console.log("Applied", proposalId)

        setIsLoading(true);
        await serverAxiosInstance.post('/user/proposal/apply', { proposalID: proposalId, appliedOn: new Date() })
            .then((res) => {
                if (res.status === 200) {
                    // console.log("Withing then()")
                    setIsApplied(true);
                    toast.success("Applied successfully", {
                        description: "You have successfully applied for the proposal.",
                        duration: 3000,
                    })
                    setStatusChange((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setIsLoading(false);
            })
    }


    useEffect(() => {
        setIsLoading(true);

        const fetchProposal = async () => {
            await serverAxiosInstance.get(`/user/proposals/${proposalId}`)
                .then((res) => {
                    // console.log(res.data)
                    if (res.status === 200) {
                        setProposal(res.data.foundProposal)
                        setIsSaved(res.data.foundSavedProposals.savedProposals.includes(proposalId))
                        setIsApplied(res.data.foundProposal.applicants.some((applicant) => applicant.applicant === currUserId))
                        toast.success("Proposal fetched successfully", {
                            description: "You can now view the proposal details.",
                            duration: 3000,
                        })
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Error fetching proposal data", {
                        description: "Please try again later.",
                        duration: 3000,
                    })
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }

        if (Object.keys(currUser).length > 0) {
            fetchProposal();
        }

    }, [proposalId, currUserId, statusChange, currUser])


    return (
        <div className="flex flex-col items-center justify-center w-full bg-gray-100">
            {isLoading ? (
                <Loader className="animate-spin h-4 w-4" />
            ) : (
                <Card className="w-full max-w-4xl mx-auto p-4 flex flex-col bg-white shadow-md rounded-lg mt-20 mb-40">
                    <CardHeader className="flex flex-row justify-between items-center p-4">
                        <div className="flex flex-row gap-4 items-center">

                            <div className="flex flex-row gap-4">
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={proposal?.author?.about?.profileImg} />
                                    <AvatarFallback>
                                        {
                                            proposal?.author?.about?.name.charAt(0).toUpperCase()
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    <Link to={`/user/${proposal?.author?._id}`} className="text-blue-500 hover:underline">
                                        {proposal?.author?.about?.name}
                                    </Link>
                                </h2>
                                <span className="text-sm text-muted-foreground">
                                    {proposal?.author?.about?.title}
                                </span>
                                <Badge variant="secondary" className="capitalize text-sm my-2">
                                    Author
                                </Badge>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-sm text-gray-500">
                                Created On:     {new Date(proposal?.createdAt).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                                Deadline: {new Date(proposal?.applicationDeadline).toLocaleDateString()}
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {proposal?.proposalTitle}
                            </h3>
                        </div>
                        <p className="text-gray-700 mb-4">
                            {proposal?.proposalDescription}
                        </p>
                        <div className="flex flex-col gap-2">
                            <h4 className="text-md font-semibold text-gray-800">Skills Required:</h4>
                            <ul className="list-disc list-inside">
                                {proposal?.skillsRequired?.map((skill, index) => (
                                    <li key={index} className="text-gray-700 capitalize">{skill.skill} &#8226; {skill?.level}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <h4 className="text-md font-semibold text-gray-800">Looking For:</h4>
                            <ul className="list-disc list-inside">
                                {proposal?.lookingFor?.map((role, index) => (
                                    <li key={index} className="text-gray-700 capitalize">{role}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full flex flex-row justify-start items-center gap-4">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-md font-semibold text-gray-800 mt-4">
                                    Time Commitment:
                                </h4>
                                <p className="text-gray-700 capitalize">{proposal?.timeCommitment}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-md font-semibold text-gray-800 mt-4">
                                    Total Duration:
                                </h4>
                                <p className="text-gray-700 capitalize">
                                    {proposal?.duration}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end gap-2 mt-4 w-full">
                            <Button
                                variant={isSaved ? "secondary" : "ghost"}
                                className="bg-gray-200 hover:bg-gray-300"
                                onClick={e => isSaved ? handleUnsave(proposalId) : handleSave(proposalId)}
                            >
                                {
                                    isSaved ?
                                        <>
                                            <BookmarkCheck className="mr-2" />
                                            Saved
                                        </>
                                        :
                                        <>
                                            <Bookmark className="mr-2" />
                                            Save
                                        </>
                                }
                            </Button>

                            {proposal?.author?._id === currUserId ?
                                (
                                    <Badge variant="outline" className="text-sm font-medium text-muted-foreground">
                                        <div className='flex flex-row items-center gap-2'>
                                            <MessageSquare className="h-4 w-4" />
                                            You are the author
                                        </div>
                                    </Badge>
                                ) :
                                <Button
                                    variant={isApplied ? "secondary" : "primary"}
                                    className="bg-gray-200 hover:bg-gray-300"
                                    onClick={e => handleApply(proposalId)}
                                    disabled={isApplied}
                                >
                                    {
                                        isApplied ?
                                            <>
                                                <CheckCircle className="mr-2" />
                                                Applied
                                            </>
                                            :
                                            <>
                                                Apply
                                            </>
                                    }
                                </Button>

                            }
                        </div>
                    </CardContent>
                </Card >
            )
            }
        </div >
    )

}

export default ViewProposal