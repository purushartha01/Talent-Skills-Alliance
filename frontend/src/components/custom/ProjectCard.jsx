
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Loader2, SquarePen, Users } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import TeamMemberCard from './TeamMemberCard';
import { serverAxiosInstance } from '@/utilities/config';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { set } from 'zod';




const ProjectCard = ({ isProposed, project, reviews = [], setShouldParentUpdate }) => {

    // console.log("Reviews: ", reviews)

    const [isEditable, setIsEditable] = useState(false);
    const [isListExpanded, setIsListExpanded] = useState(false);

    // const [link,setLink]=useState({});

    const [changedStatus, setChangedStatus] = useState(project?.status);

    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);


    const handleSaveChanges = (projectId, newStatus) => {
        if (!isEditable) return;
        if (project?.status === newStatus) return;
        setIsUpdatingStatus(true);
        // Call the API to update the project status

        serverAxiosInstance.put("/project/change-status", { projectId, newStatus })
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Project status updated successfully.", {
                        description: res.data?.message || "Project status updated successfully.",
                        duration: 3000,
                    });
                    setChangedStatus(newStatus);
                    project.status = newStatus;
                }
            }).catch((error) => {
                console.error("Error updating project status:", error);
                toast.error("Error updating project status.", {
                    description: error?.response?.data?.message || "Something went wrong. Please try again.",
                    duration: 3000,
                });
            }).finally(() => {
                setIsUpdatingStatus(false);
                setIsEditable(false);
            });
    }


    return (
        <Card className={"w-full flex flex-col gap-2 p-4"}>
            <CardHeader className={"flex flex-row gap-2"}>
                <div className="flex flex-col gap-4">
                    <div className='flex flex-row items-center justify-start gap-4'>
                        <h2 className="text-2xl font-bold capitalize">
                            {project?.projectTitle}
                        </h2>
                        <span className='text-sm font-normal text-muted-foreground'>
                            ({project?.startedOn ? new Date(project?.startedOn).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' }) : "Not Started"} - {project?.completedOn ? new Date(project?.completedOn).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' }) : "Ongoing"})
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground first-letter:capitalize">{project.projectDescription}</p>
                </div>
                {(isProposed && project?.status !== "completed") &&
                    <div className='flex flex-col gap-2 ml-auto'>
                        <Button
                            variant={"secondary"}
                            onClick={() => setIsEditable(!isEditable)}
                            className={""}
                        >
                            <SquarePen className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </div>
                }
            </CardHeader>
            <CardContent className={"flex flex-col gap-4"}>
                <div className="flex flex-col gap-2">
                    <h3 className="text-md font-semibold">Skills Used:</h3>
                    <div className="flex flex-wrap gap-2">
                        {project.skillsUsed.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="w-fit h-8 capitalize">
                                {skill.skill} &#8226; ({skill.level})
                            </Badge>
                        ))}
                    </div>
                </div>
                {/*TODO: Links Section */}
                {
                    (project?.links.length > 0 && !isEditable) &&
                    (<div div className='flex flex-col gap-2'>
                        <h3 className='text-md font-semibold'>
                            Links:
                        </h3>
                    </div>)

                        //add links when required 
                        (isEditable && isProposed) && (
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md font-semibold'>
                                Enter the project Links
                            </h3>
                            <div className='flex flex-col gap-2'>
                                <Input
                                    type="text"
                                    value={""}
                                    placeholder='Enter the link title'
                                    className='border border-gray-300 rounded-md p-2'
                                />
                                <Input
                                    value={""}
                                    type="text"
                                    placeholder='Enter the link URL'
                                    className='border border-gray-300 rounded-md p-2'
                                />
                                {/* <input type="text" placeholder='Enter the link title' className='border border-gray-300 rounded-md p-2' />
                                <input type="text" placeholder='Enter the link URL' className='border border-gray-300 rounded-md p-2' /> */}
                            </div>
                        </div>
                    )
                }

                {/* Project Status */}
                {
                    (!isEditable) ?
                        (<div className='flex flex-col gap-2'>
                            <h3 className='text-md font-semibold'>
                                Project Status:
                            </h3>

                            <Badge variant="secondary" className="w-fit h-8 capitalize">
                                {project?.status}
                            </Badge>
                        </div>) :
                        (
                            project?.status !== "completed" &&
                            <div className={`flex flex-col gap-2 ${!isEditable ? "hidden" : "block"}`}>
                                <h3 className='text-md font-semibold'>
                                    Project Status:
                                </h3>
                                <Select
                                    className="w-[180px]" value={changedStatus}
                                    defaultValue={project?.status}
                                    onValueChange={(value) => { setChangedStatus(value) }}
                                    disabled={!isEditable}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder={"Change Project status"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ongoing">Ongoing</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                        <SelectItem value="on-hold">On Hold</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant={"secondary"}
                                    className={"w-fit h-8"}
                                    onClick={() => {
                                        handleSaveChanges(project._id, changedStatus);
                                    }}
                                >
                                    <span className='text-md font-semibold inline-flex items-center'>
                                        {isUpdatingStatus ? <Loader2 className="animate-spin h-4 w-4 mr-2" /> : ""}
                                        {isUpdatingStatus ? ("Saving...") : ("Save Changes")}
                                    </span>
                                </Button>
                            </div>
                        )
                }



                {/* Time Commitment */}
                {
                    (project?.timeCommitment) &&
                    <div className='flex flex-col sm:flex-row justify-between gap-2'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md font-semibold'>
                                Time Commitment:
                            </h3>
                            <Badge variant="secondary" className="w-fit h-8 capitalize">
                                {project?.timeCommitment}
                            </Badge>
                        </div>

                    </div>
                }

                <div className='flex flex-col sm:flex-row justify-between gap-2'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-md font-semibold'>
                            Leader Contact Details:
                        </h3>
                        <p className='text-sm text-muted-foreground font-semibold flex flex-wrap gap-2'>
                            <span>
                                {project?.teamLeader?.about?.name}
                            </span>
                            &#8226;
                            <span>
                                {project?.teamLeader?.email}
                            </span>
                        </p>
                    </div>
                    <div className='flex flex-col gap-2 mt-8'>
                        <Badge
                            variant="secondary"
                            className="w-fit h-8 capitalize cursor-pointer"
                            onClick={() => { setIsListExpanded(!isListExpanded) }}
                        >
                            <span className='inline-flex items-center'>
                                <Users className="h-4 w-4 mr-2" />&nbsp;&#8226; &nbsp;
                                {project?.members.length}
                            </span>
                            <span className='text-md font-semibold'>
                                Team Member{project?.members.length > 1 ? "s" : ""}
                            </span>
                            <span>
                                {isListExpanded ? <ChevronUp /> : <ChevronDown />}
                            </span>
                        </Badge>
                    </div>
                </div>



                {/* Team members */}
                {isListExpanded && project?.members.length > 0 &&
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-md font-semibold'>
                            Team:
                        </h3>
                        <div className="flex flex-col w-full gap-2">
                            {project.members.map((member, index) => {
                                // console.log("Project: ", project)
                                const isReviewPresent = reviews.some((review) => review?.reviewFor?._id === member?._id)
                                const review = reviews.filter((review) => review?.reviewFor?._id === member?._id)[0]
                                return (
                                    <TeamMemberCard
                                        key={index}
                                        member={member}
                                        isLeader={member?._id === project?.teamLeader?._id} projectId={project?._id}
                                        isReviewPresent={isReviewPresent}
                                        review={review}
                                        setShouldParentUpdate={setShouldParentUpdate}
                                    />
                                )
                            }
                            )}
                        </div>

                    </div>
                }

            </CardContent>
        </Card >
    )
}

export default ProjectCard