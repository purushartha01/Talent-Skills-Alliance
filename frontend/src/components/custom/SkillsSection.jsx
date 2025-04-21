import { Card } from "../ui/card"
import { useState, useRef, useEffect, useMemo, useId } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { Calendar, Edit, Edit2, ExternalLink, Plus, PlusIcon, Save, Trash, X } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { returnSkillsList } from "@/utilities/utilityMethods";
import { DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog } from '@/components/ui/dialog';
import SkillSuggestionInput from "./SkillSuggestionInput";
import { toast } from "sonner";

const SkillsSection = ({ userSkillsData, submitChanges }) => {

    const skillsList = useMemo(() => returnSkillsList(), []);
    const uniqueId = useId();

    const [isSectionDisabled, setIsSectionDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const [userSkills, setUserSkills] = useState(userSkillsData?.skills || []);
    const [personalProjects, setPersonalProjects] = useState(userSkillsData?.personalProjects || []);


    const [needsUpdate, setNeedsUpdate] = useState(null);
    const [newProject, setNewProject] = useState({
        id: "",
        projectTitle: "",
        projectDescription: "",
        timeframe: "",
        projectLinks: [],
        projectSkills: [],
    });


    const [newSkill, setNewSkill] = useState({
        name: "",
        proficiency: "beginner"
    });

    const [newProjectSkill, setNewProjectSkill] = useState({
        name: ""
    });


    const addSkillToProject = () => {
        if (
            newProjectSkill.name.trim() === "" ||
            newProject.projectSkills.some(
                (skill) =>
                    skill?.name?.toLowerCase() === newProjectSkill?.name?.trim()?.toLowerCase()
            )
        ) {

            toast.error("Skill already exists in the project", {
                description: "Please select a different skill.",
                duration: 3000,
            });
            return;
        }

        setNewProject((prev) => ({
            ...prev,
            projectSkills: [
                ...prev.projectSkills,
                { name: newProjectSkill.name.trim() },
            ],
        }));

        setNewProjectSkill({ name: "" });
    }

    const onChangeVal = (value) => {
        setNewSkill((prev) => ({ ...prev, name: value }));
    };

    const onSelectVal = (skill) => {
        setNewSkill((prev) => ({ ...prev, name: skill }));
    };

    const onChangeValForProjects = (value) => {
        setNewProjectSkill((prev) => ({ ...prev, name: value }));
    };

    const onSelectValForProjects = (skill) => {
        setNewProjectSkill((prev) => ({ ...prev, name: skill }));
    };

    const handleSaveChanges = () => {
        setIsSectionDisabled(true);
        setIsLoading(true);
        const expertise = {
            skills: userSkills,
            personalProjects: personalProjects,
        };

        submitChanges({ expertise });
        console.log("Updated data:", expertise);
        setIsLoading(false);
    }

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <div className="flex flex-row items-center justify-between">
                        <CardTitle>Skills & Expertise</CardTitle>
                        <Button variant={isSectionDisabled ? "outline" : "secondary"} className="text-sm" onClick={(e) => { e.preventDefault; if (isSectionDisabled) setIsSectionDisabled(false); else return; }}>
                            <Edit size={16} className="md:mr-1" />
                            <span className="hidden md:inline">Edit</span>
                        </Button >
                    </div>
                    <CardDescription>Add and manage your professional skills</CardDescription>

                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Add New Skill */}
                    <div className="space-y-2">
                        <Label>Add a New Skill</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <SkillSuggestionInput
                                value={newSkill.name}
                                onChange={onChangeVal}
                                placeholder={"Skill name (e.g. React, Python, UX Design)"}
                                onSelect={onSelectVal}
                                skillsList={skillsList}
                                disabled={isSectionDisabled}
                            />
                            <Select
                                value={newSkill?.proficiency || "beginner"}
                                onValueChange={(value) => setNewSkill({ ...newSkill, proficiency: value })}
                                disabled={isSectionDisabled}
                            >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Proficiency level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="beginner">Beginner</SelectItem>
                                    <SelectItem value="intermediate">Intermediate</SelectItem>
                                    <SelectItem value="advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="button"
                                onClick={() => {
                                    if (newSkill.name.trim() === "" || userSkills?.includes(newSkill)) return;
                                    if (!newSkill.proficiency) newSkill.proficiency = "beginner";
                                    if (userSkills?.some((skill) => skill.name === newSkill.name)) {
                                        console.log("Skill already exists:", newSkill.name);
                                        return;
                                    }
                                    console.log("Adding new skill:", newSkill);
                                    setUserSkills((prev) => [...prev, newSkill]);
                                    setNewSkill({ name: "", proficiency: "beginner" });
                                }}
                                disabled={!newSkill.name.trim() || isSectionDisabled}
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Skill
                            </Button>
                        </div>
                    </div>

                    <Separator />

                    {/* Current Skills */}
                    <div className="space-y-4">
                        <Label>Current Skills</Label>

                        {userSkills?.length > 0 ? (["advanced", "intermediate", "beginner"].map((proficiency) => {
                            const skillsAtLevel = userSkills?.filter((skill) => skill?.proficiency === proficiency)
                            if (skillsAtLevel?.length === 0) return null
                            const level = proficiency.charAt(0).toUpperCase() + proficiency.slice(1).toLowerCase()
                            return (
                                <div key={level} className="space-y-2">
                                    <h4 className="text-sm font-medium">{level}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsAtLevel.map((skill) => (
                                            <div key={skill.name} className="relative">
                                                <Badge variant="secondary" className="flex h-8 justify-center items-center gap-1 pr-8 capitalize">
                                                    {skill.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setUserSkills((prev) => prev.filter((s) => s.name !== skill.name));
                                                            setNewSkill({ name: "", proficiency: "beginner" });
                                                        }}
                                                        className="absolute right-1 rounded-full hover:bg-muted p-0.5"
                                                    >
                                                        <X className="h-3 w-3" />
                                                        <span className="sr-only">Remove</span>
                                                    </button>
                                                </Badge>
                                                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-10 bg-background border rounded-md shadow-md p-1">
                                                    <div className="text-xs p-1 font-medium">Change Proficiency:</div>
                                                    {["beginner", "intermediate", "advanced"].map((newLevel) => (
                                                        <button
                                                            key={newLevel}
                                                            onClick={() => {
                                                                setUserSkills((prev) => prev.map((s) => s.name === skill.name ? { ...s, proficiency: newLevel } : s));
                                                                setNewSkill({ name: "", proficiency: "beginner" });
                                                            }}
                                                            className={`block w-full text-left text-xs px-2 py-1 rounded hover:bg-muted ${skill.proficiency === newLevel ? "bg-muted" : ""
                                                                }`}
                                                        >
                                                            {newLevel}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        })) : (
                            <div className="text-center py-4 text-muted-foreground">
                                It looks like you haven&apos;t added any skills yet. Add skills to help others find you for collaborations.
                            </div>
                        )}

                    </div>
                    <div>

                    </div>
                </CardContent>
            </Card>

            <Card className="mt-4">
                <CardHeader>
                    <div className="flex flex-row items-center justify-between">
                        <CardTitle>
                            Personal Projects
                        </CardTitle>
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button variant={"default"} className="text-sm" disabled={isSectionDisabled || needsUpdate !== null}>
                                    <PlusIcon size={16} className="md:mr-1" />
                                    <span className="hidden md:inline">Add Project</span>
                                </Button >
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add a New Project</DialogTitle>
                                    <DialogDescription>
                                        Add details about your project, including title, description, timeframe, and skills used.
                                    </DialogDescription>
                                </DialogHeader>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium">Add a New Project</h3>
                                    <div className="rounded-lg border p-4 space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="project-title">Project Title*</Label>
                                            <Input
                                                id="project-title"
                                                value={newProject?.projectTitle}
                                                onChange={(e) => setNewProject({ ...newProject, projectTitle: e.target.value})}
                                                placeholder="Project title"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="project-description">Description*</Label>
                                            <Textarea
                                                id="project-description"
                                                value={newProject?.projectDescription}
                                                onChange={(e) => setNewProject({ ...newProject, projectDescription: e.target.value })}
                                                placeholder="Describe your project, its purpose, and your role"
                                                rows={5}
                                                className={"max-h-[150px]"}
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="project-timeframe">Timeframe*</Label>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="project-timeframe"
                                                    value={newProject.timeframe}
                                                    onChange={(e) => setNewProject({ ...newProject, timeframe: e.target.value })}
                                                    placeholder="e.g., Jan 2023 - Mar 2023"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="project-link">Project Link (Optional)</Label>
                                            <div className="flex items-center gap-2">
                                                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    id="project-link"
                                                    value={newProject.projectLinks}
                                                    onChange={(e) => setNewProject({ ...newProject, projectLinks: e.target.value })}
                                                    placeholder="https://github.com/yourusername/project"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Skills Used*</Label>
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {newProject?.projectSkills.map((skill) => (
                                                    <Badge key={skill.name} variant="secondary" className="capitalize flex items-center gap-1">
                                                        {skill.name}
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setNewProject({
                                                                    ...newProject,
                                                                    skills: newProject.projectSkills.filter((s) => s.name !== skill.name),
                                                                });
                                                                setNewProjectSkill({ name: "" });
                                                            }
                                                            }
                                                            className="ml-1 rounded-full hover:bg-muted p-0.5"
                                                        >
                                                            <X className="h-3 w-3" />
                                                            <span className="sr-only">Remove</span>
                                                        </button>
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex gap-2">
                                                <SkillSuggestionInput
                                                    value={newProjectSkill.name}
                                                    onChange={onChangeValForProjects}
                                                    placeholder={"Skill name (e.g. React, Python, UX Design)"}
                                                    onSelect={onSelectValForProjects}
                                                    skillsList={skillsList}
                                                    disabled={isSectionDisabled}
                                                />


                                                <Button type="button" onClick={addSkillToProject} size="sm">
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <Button
                                                onClick={() => {
                                                    if (newProject.projectTitle?.trim() && newProject.projectDescription?.trim()) {
                                                        setPersonalProjects((prev) => [...prev, newProject]);
                                                        setNewProject({
                                                            projectTitle: "",
                                                            projectDescription: "",
                                                            timeframe: "",
                                                            projectLinks: [],
                                                            projectSkills: [],
                                                        });
                                                        setNewProjectSkill({ name: "" });
                                                        setOpen(false);
                                                    }
                                                }}
                                                disabled={!newProject?.projectTitle || !newProject?.projectDescription || !newProject?.timeframe || newProject.projectSkills.length === 0 || isSectionDisabled}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Project
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <CardDescription>Showcase your projects and contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {
                        personalProjects.length > 0 ? (
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium">
                                    Your Projects
                                </h3>
                                {personalProjects.map((project, index) => (
                                    needsUpdate === project.id ? (
                                        // edit existing project form
                                        <div key={index} className="rounded-lg border p-4 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="projectTitle">
                                                    Project Title
                                                </Label>
                                                <Input
                                                    id={`projectTitle-${index}`}
                                                    placeholder="Project Title"
                                                    value={newProject?.projectTitle}
                                                    onChange={(e) => {
                                                        setNewProject({ ...newProject, projectTitle: e.target.value });
                                                    }}
                                                >
                                                </Input>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="projectDescription">
                                                    Project Description
                                                </Label>
                                                <Input
                                                    placeholder="Project Description"
                                                    value={newProject?.projectDescription}
                                                    onChange={(e) => {
                                                        setNewProject({ ...newProject, projectDescription: e.target.value });
                                                    }}
                                                >
                                                </Input>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="timeframe">
                                                    Timeframe
                                                </Label>
                                                <div className="flex items-center gap-2">

                                                    <Calendar className="h-4 w-4 text-shadow-muted-foreground" />
                                                    <Input id={"timeframe"}
                                                        value={newProject?.timeframe}
                                                        onChange={(e) => {
                                                            setNewProject({ ...newProject, timeframe: e.target.value });
                                                        }}
                                                        placeholder="e.g. 2023-2024"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="projectLinks">
                                                    Project Links
                                                </Label>
                                                <Input
                                                    placeholder="Project Links (comma separated)"
                                                    value={newProject?.projectLinks?.join(",")}
                                                    onChange={(e) => {
                                                        setNewProject({
                                                            ...newProject,
                                                            projectLinks: e.target.value.split(",")?.map(link => link.trim())
                                                        });
                                                    }}
                                                >
                                                </Input>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="projectSkills">
                                                    Skills Used
                                                </Label>
                                                <div className="flex flex-wrap gap-2 mb-2">
                                                    {newProject?.projectSkills?.map((skill) => (
                                                        <Badge key={skill.name} variant="secondary" className="relative capitalize flex items-center gap-1 pr-8">
                                                            {console.log(newProject.projectSkills)}
                                                            {skill.name}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setNewProject({
                                                                        ...newProject,
                                                                        projectSkills: newProject.projectSkills.filter((s) => s.name !== skill.name),
                                                                    });
                                                                    setNewProjectSkill({ name: "" });
                                                                }}
                                                                className="absolute right-1 rounded-full hover:bg-muted p-0.5"
                                                            >
                                                                <X className="h-3 w-3" />
                                                                <span className="sr-only">Remove</span>
                                                            </button>
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <div className="flex flex-row flex-1 gap-2 relative">
                                                    <div className="flex-1 items-center gap-2 mb-2">

                                                        <SkillSuggestionInput
                                                            value={newProjectSkill.name}
                                                            onChange={onChangeValForProjects}
                                                            placeholder={"Skill name (e.g. React, Python, UX Design)"}
                                                            onSelect={onSelectValForProjects}
                                                            skillsList={skillsList}
                                                            disabled={isSectionDisabled}
                                                        />

                                                        <Button type="button"
                                                            onClick={addSkillToProject}
                                                            disabled={!newProjectSkill.name.trim() || newProject.projectSkills?.some((skill) => skill.name === newProjectSkill.name)}
                                                            className={"mt-4"}
                                                        >
                                                            <Plus className="mr-2 h-4 w-4" />
                                                            Add Skill
                                                        </Button>
                                                    </div>


                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <Button variant="outline" type="button" onClick={e => {
                                                    setNeedsUpdate(null); setNewProject({
                                                        projectTitle: "",
                                                        projectDescription: "",
                                                        timeframe: "",
                                                        projectLinks: [],
                                                        projectSkills: [],
                                                    });
                                                    setNewProjectSkill({
                                                        name: ""
                                                    });
                                                }} >
                                                    Cancel
                                                </Button>
                                                <Button className={"bg-primary text-white"}
                                                    disabled={isSectionDisabled || !newProject.projectTitle || !newProject.projectDescription || !newProject.timeframe || newProject.projectSkills.length === 0}
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        setNeedsUpdate(null);
                                                        setPersonalProjects((prev) => prev.map((p) => p.id === project.id ? { ...p, ...newProject } : p));
                                                        setNewProject({
                                                            projectTitle: "",
                                                            projectDescription: "",
                                                            timeframe: "",
                                                            projectLinks: [],
                                                            projectSkills: [],
                                                        });
                                                        setNewProjectSkill({
                                                            name: ""
                                                        });
                                                    }}
                                                >
                                                    Apply Changes
                                                </Button>

                                            </div>
                                        </div>
                                    ) : (
                                        // current values of project
                                        <div key={index} className="rounded-lg border p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-medium">{project?.projectTitle}</h4>
                                                <div className="flex gap-1">
                                                    <Button variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                        onClick={() => {
                                                            setNeedsUpdate(project.id);
                                                            setNewProject(
                                                                {
                                                                    projectTitle: project.projectTitle || "",
                                                                    projectDescription: project.projectDescription || "",
                                                                    timeframe: project.timeframe || "",
                                                                    projectLinks: project.projectLinks || [],
                                                                    projectSkills: project.projectSkills || [],
                                                                }
                                                            )
                                                        }}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                        <span className="sr-only">Edit</span>
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive"
                                                        onClick={() => {
                                                            setPersonalProjects((prev) => prev.filter((p) => p.projectTitle !== project.projectTitle || p.projectDescription !== project.projectDescription));
                                                            setNewProject({
                                                                projectTitle: "",
                                                                projectDescription: "",
                                                                timeframe: "",
                                                                projectLinks: [],
                                                                projectSkills: [],
                                                            });
                                                        }
                                                        }
                                                    >
                                                        <Trash className="h-4 w-4" />
                                                        <span className="sr-only">Delete</span>
                                                    </Button>
                                                </div>
                                            </div>

                                            <p className="text-sm">{project.projectDescription}</p>

                                            <div className="flex flex-wrap gap-2">
                                                {project.projectSkills?.map((skill) => (
                                                    <Badge key={skill.name} variant="secondary">
                                                        {skill.name}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    <span>{project.timeframe}</span>
                                                </div>
                                                {project.projectLinks && (
                                                    <a
                                                        href={project.projectLinks}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1 hover:text-primary"
                                                    >
                                                        <ExternalLink className="h-4 w-4" />
                                                        <span>View Project</span>
                                                    </a>
                                                )}
                                            </div>
                                        </div>)
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 text-muted-foreground">
                                You haven&apos;t added any projects yet. Add projects to showcase your work and skills.
                            </div>
                        )
                    }
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            className="text-sm"
                            onClick={handleSaveChanges}
                            disabled={isSectionDisabled}
                        >
                            <Save size={16} className="md:mr-1" />
                            <span className="hidden md:inline">Save All Changes</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}

export default SkillsSection