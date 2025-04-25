
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Clock, ExternalLink, MoreHorizontal, Trash, UserRoundCheck, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ApplicantsCard from './ApplicantsCard';
import ConFirmationPopup from './ConFirmationPopup';
import { serverAxiosInstance } from '@/utilities/config';
import { toast } from 'sonner';

const ManageProposalCard = ({ proposal, setShouldUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    const toggleProposalExpanded = () => {
        setIsExpanded(prev => !prev);
    }


    const handleDeleteProposal = (id) => {
        serverAxiosInstance.delete(`/user/proposal/${id}`)
            .then((res) => {
                console.log(res.data);
                toast.success("Proposal deleted successfully", {
                    description: "The proposal has been deleted successfully.",
                    duration: 3000
                })
                setShouldUpdate(prev => prev + 1);
            }
            ).catch((err) => {
                console.log(err);
                toast.error("Error deleting proposal", {
                    description: "There was an error deleting the proposal. Please try again.",
                    duration: 3000
                })
            }
            )
    }


    const handleProjectCreation = (id) => {
        serverAxiosInstance.post(`/project/complete`, { proposalId: id })
            .then((res) => {
                console.log(res.data);
                toast.success("Project created successfully", {
                    description: "The project has been created successfully.",
                    duration: 3000
                })
                setShouldUpdate(prev => prev + 1);
            }
            ).catch((err) => {
                console.log(err);
                toast.error("Error creating project", {
                    description: err?.response?.data?.message || "There was an error creating the project. Please try again.",
                    duration: 3000
                })
            }
            )
    }


    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                    <Badge variant={"secondary"} className="text-sm font-normal capitalize">
                        {proposal?.proposalStatus === "open" ? "Active" : "Closed"}
                    </Badge>
                    {/* Add dropdowns targets and their contents */}
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">

                            <DropdownMenuItem asChild className="w-full cursor-pointer">
                                <Link
                                    to={`/proposals/${proposal._id}`}
                                >View Post
                                </Link>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem asChild className={"cursor-pointer"}>
                                <Link
                                // href={`/posts/${proposal.id}/edit`}
                                >Edit Post</Link>
                            </DropdownMenuItem> */}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive cursor-pointer" onClick={() => {
                                console.log("Delete proposal clicked", proposal);
                                handleDeleteProposal(proposal._id)
                            }}>
                                Delete Proposal
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/*  */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-xl capitalize font-semibold text-foreground">
                            {proposal?.proposalTitle}
                        </CardTitle>
                        <CardDescription className="mt-1 font-semibold text-sm text-muted-foreground">
                            Created on {formatDate(proposal?.createdAt)} • Deadline:{formatDate(proposal?.applicationDeadline)}
                        </CardDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full flex flex-row items-center sm:w-auto justify-between sm:justify-start"
                        onClick={() => toggleProposalExpanded(proposal.id)}
                    >
                        <Users className="h-4 w-4 mr-2" />
                        {proposal?.applicants?.length > 0 ? (
                            <div>
                                <span>
                                    {proposal?.applicants.length} Applicant{proposal?.applicants?.length !== 1 && "s"}
                                </span>
                            </div>
                        ) : (
                            <div className="flex items-center text-muted-foreground">
                                <span>No Applicants</span>
                            </div>
                        )}
                        {isExpanded ? (
                            <ChevronUp className="ml-2 h-4 w-4" />
                        ) : (
                            <ChevronDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                </div>
            </CardHeader>

            <CardContent className="pb-4 space-y-4">
                <p className="text-sm line-clamp-2">
                    {proposal?.proposalDescription}
                </p>

                <div className="flex flex-wrap gap-2">
                    {proposal?.skillsRequired?.map((req, index) => (
                        <Badge key={index} variant="secondary" className={"text-sm capitalize font-semibold"}>
                            {req.skill} • {req.level}
                        </Badge>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                        <div className="flex items-center text-muted-foreground">
                            <Users className="h-4 w-4 mr-1" />
                            Looking For
                        </div>

                        <div className='flex flex-wrap gap-4'>
                            {proposal?.lookingFor?.map((role, index) => {
                                return (
                                    <Badge
                                        key={index}
                                        variant="secondary"
                                        className={"text-sm capitalize font-semibold"}
                                    >
                                        {role}
                                    </Badge>
                                )
                            })}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="flex flex-col items-start justify-center text-muted-foreground">
                            <div className='flex flex-row items-start justify-center h-8'>
                                <Clock className="h-4 w-4 mr-1" />
                                <span className='text-sm font-semibold h-full'>
                                    Time Commitment
                                </span>
                            </div>
                            <p className='px-2'>
                                {proposal?.timeCommitment}
                            </p>
                        </div>
                    </div>
                </div>

                {isExpanded && proposal.applicants.length > 0 && (
                    <div className="mt-4 space-y-4">
                        <Separator />
                        <h3 className="font-medium">Applicants</h3>

                        <div className="space-y-3">
                            {proposal?.applicants?.map((applicant) => {
                                return (
                                    <ApplicantsCard key={applicant._id} applicant={applicant} setShouldUpdate={setShouldUpdate} proposalID={proposal?._id} />
                                )
                            })}
                        </div>
                    </div>
                )}
            </CardContent>

            {
                proposal?.proposalStatus === "open" && (
                    <CardFooter className="pt-2">
                        <div className="w-full flex justify-end">
                            <ConFirmationPopup
                                disabled={proposal?.applicants?.length === 0}
                                triggerTxt={"Finish Selection"}
                                triggerClass={""}
                                Icon={UserRoundCheck}
                                description={`Are you sure you want to finish the selection process for "${proposal?.proposalTitle}"? This action cannot be undone.`}
                                onConfirm={e => { e.preventDefault(); handleProjectCreation(proposal?._id) }}
                            />
                        </div>
                    </CardFooter>
                )
            }
        </Card >
    )
}

export default ManageProposalCard