
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, SquarePen, Users } from 'lucide-react';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import TeamMemberCard from './TeamMemberCard';




const ProjectCard = ({ isProposed, project }) => {


    const [isEditable, setIsEditable] = useState(false);
    const [isListExpanded, setIsListExpanded] = useState(false);

    // const [link,setLink]=useState({});

    const [changedStatus, setChangedStatus] = useState(project?.status);

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
                {isProposed &&
                    <div className='flex flex-col gap-2 ml-auto'>
                        <Button
                            variant={"secondary"}
                            onClick={() => setIsEditable(!isEditable)}
                            className={""}
                        >
                            <SquarePen className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    </div>}
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
                                        // handleSaveChanges(project._id, changedStatus, link);
                                        setIsEditable(false);
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        )
                }

                {/* Time Commitment */}
                {
                    (project?.timeCommitment && project?.timeCommitment.length > 0) &&
                    <div className='flex flex-row justify-between gap-2'>
                        <div className='flex flex-col gap-2'>
                            <h3 className='text-md font-semibold'>
                                Time Commitment:
                            </h3>
                            <Badge variant="secondary" className="w-fit h-8 capitalize">
                                {project?.timeCommitment}
                            </Badge>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Badge
                                variant="secondary"
                                className="w-fit h-8 capitalize cursor-pointer"
                                onClick={() => { setIsListExpanded(!isListExpanded) }}
                            >
                                <span>
                                    <Users className="h-4 w-4 mr-2" />
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
                }



                {/* Team members */}
                {isListExpanded && project?.members.length > 0 &&
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-md font-semibold'>
                            Team:
                        </h3>
                        <div className="flex flex-col w-full gap-2">
                            {project.members.map((member, index) => {
                                console.log("Project: ", project)
                                return (
                                    <TeamMemberCard key={index} member={member} isLeader={member?._id === project?.teamLeader?._id} projectId={project?._id}/>
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