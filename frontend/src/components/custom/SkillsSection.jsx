import { AuthContext } from "@/context/AuthContext";
import { Card } from "../ui/card"
import { useContext } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent } from '@/components/ui/select';
import { SelectTrigger } from '@/components/ui/select';
import { SelectValue } from '@/components/ui/select';
import { SelectItem } from '@/components/ui/select';
import { Plus, X } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const SkillsSection = () => {

    const user = useContext(AuthContext).getCurrAuth();

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                    <CardDescription>Add and manage your professional skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Add New Skill */}
                    <div className="space-y-2">
                        <Label>Add a New Skill</Label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Input
                                placeholder="Skill name (e.g. React, Python, UX Design)"
                                // value={newSkill.name}
                                // onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                className="flex-1"
                            />
                            <Select
                            // value={newSkill.level}
                            // onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}
                            >
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Proficiency level" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button type="button"
                            // onClick={addSkill} disabled={!newSkill.name.trim()}
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

                        {["Advanced", "Intermediate", "Beginner"].map((level) => {
                            // const skillsAtLevel = user?.skills.filter((skill) => skill.level === level)
                            // if (skillsAtLevel.length === 0) return null

                            return (
                                <div key={level} className="space-y-2">
                                    <h4 className="text-sm font-medium">{level}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {/* {skillsAtLevel.map((skill) => (
                                            <div key={skill.name} className="group relative">
                                                <Badge variant="secondary" className="flex items-center gap-1 pr-8">
                                                    {skill.name}
                                                    <button
                                                        type="button"
                                                        // onClick={() => removeSkill(skill.name)}
                                                        className="absolute right-1 rounded-full hover:bg-muted p-0.5"
                                                    >
                                                        <X className="h-3 w-3" />
                                                        <span className="sr-only">Remove</span>
                                                    </button>
                                                </Badge>
                                                <div className="absolute top-full left-0 mt-1 hidden group-hover:block z-10 bg-background border rounded-md shadow-md p-1">
                                                    <div className="text-xs p-1 font-medium">Change level:</div>
                                                    {["Beginner", "Intermediate", "Advanced"].map((newLevel) => (
                                                        <button
                                                            key={newLevel}
                                                            // onClick={() => updateSkillLevel(skill.name, newLevel)}
                                                            className={`block w-full text-left text-xs px-2 py-1 rounded hover:bg-muted ${skill.level === newLevel ? "bg-muted" : ""
                                                                }`}
                                                        >
                                                            {newLevel}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                            )
                        })}

                        {/* {user?.skills.length === 0 && (
                            <div className="text-center py-4 text-muted-foreground">
                                You haven&apos;t added any skills yet. Add skills to help others find you for collaborations.
                            </div>
                        )} */}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default SkillsSection