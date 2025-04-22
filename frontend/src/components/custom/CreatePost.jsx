
import { useContext, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Calendar1, Loader2, Loader } from "lucide-react"
import SkillSuggestionInput from "./SkillSuggestionInput"
import { returnSkillsList } from "@/utilities/utilityMethods"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { AuthContext } from "@/context/AuthContext"
import { set } from "date-fns"
import { serverAxiosInstance } from "@/utilities/config"
import { toast } from "sonner"



const CreatePost = ({ onSubmit, shouldParentUpdate }) => {

  const skillsList = useMemo(() => returnSkillsList(), []);

  const auth = useContext(AuthContext).getCurrAuth();

  const currUserId = auth.id ?? auth._id;

  const [isOpen, setIsOpen] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    proposalTitle: "",
    proposalDescription: "",
    skillsRequired: [],
    lookingFor: [],
    timeCommitment: "",
    duration: "",
    applicationDeadline: new Date(),
  })

  const [newSkill, setNewSkill] = useState({ skill: "", level: "Beginner" })
  const [newRole, setNewRole] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const addSkill = () => {
    if (newSkill.skill.trim()) {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, { ...newSkill }],
      }))
      setNewSkill({ skill: "", level: "Beginner" })
    }
  }

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((_, i) => i !== index),
    }))
  }

  const addRole = () => {
    if (newRole.trim()) {
      setFormData((prev) => ({
        ...prev,
        lookingFor: [...prev.lookingFor, newRole],
      }))
      setNewRole("")
    }
  }

  const removeRole = (index) => {
    setFormData((prev) => ({
      ...prev,
      lookingFor: prev.lookingFor.filter((_, i) => i !== index),
    }))
  }


  const handleSubmit = (e) => {
    setIsLoading(true)
    formData.author = currUserId;

    e.preventDefault()
    console.log("Form submitted:", formData)

    serverAxiosInstance.post("/user/proposal/new", { formData })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Proposal created successfully", {
            description: "Your proposal has been created.",
            duration: 5000,
          })
          setFormData({
            proposalTitle: "",
            proposalDescription: "",
            skillsRequired: [],
            lookingFor: [],
            timeCommitment: "",
            duration: "",
            applicationDeadline: new Date(),
          })
          shouldParentUpdate(true)
        }
      })
      .catch((err) => {
        toast.error("Error creating proposal: " + err.message,
          {
            description: "Please try again later.",
            duration: 5000,
          })
      }).finally(() => {
        setIsLoading(false)
      });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 ">
      <div className="space-y-2">
        <Label htmlFor="proposalTitle">Proposal Title</Label>
        <Input
          id="proposalTitle"
          name="proposalTitle"
          placeholder="Enter a clear, descriptive title"
          value={formData.proposalTitle}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="proposalDescription">Proposal Description</Label>
        <Textarea
          id="proposalDescription"
          name="proposalDescription"
          placeholder="Describe your project idea, goals, and vision"
          rows={5}
          value={formData.proposalDescription}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Required Skills</Label>
        <div className="flex gap-2">


          <SkillSuggestionInput
            value={newSkill.skill}
            onChange={(val) => setNewSkill({ ...newSkill, skill: val })}
            skillsList={skillsList}
            onSelect={(skill) => setNewSkill({ ...newSkill, skill })}
            disabled={isLoading}
          />


          <Select
            value={newSkill.level}
            onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.skillsRequired.map((req, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1 capitalize">
              {req.skill} • {req.level}
              <button
                type="button"
                onClick={() => removeSkill(index)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Looking For (Team Roles)</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add a role (e.g. Frontend Developer)"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="button" onClick={addRole} size="sm" disabled={isLoading}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.lookingFor.map((role, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {role}
              <button
                type="button"
                onClick={() => removeRole(index)}
                className="ml-1 rounded-full hover:bg-muted p-0.5"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove</span>
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="timeCommitment">Time Commitment</Label>
          <Select
            disabled={isLoading}
            value={formData.timeCommitment}
            onValueChange={(value) => setFormData({ ...formData, timeCommitment: value })}
            required
          >
            <SelectTrigger id="timeCommitment">
              <SelectValue placeholder="Select time commitment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5 hours/week">1-5 hours/week</SelectItem>
              <SelectItem value="5-10 hours/week">5-10 hours/week</SelectItem>
              <SelectItem value="10-15 hours/week">10-15 hours/week</SelectItem>
              <SelectItem value="15-20 hours/week">15-20 hours/week</SelectItem>
              <SelectItem value="20+ hours/week">20+ hours/week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Proposal Duration</Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
            required
            disabled={isLoading}
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select Proposal duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Less than 1 month">Less than 1 month</SelectItem>
              <SelectItem value="1-3 months">1-3 months</SelectItem>
              <SelectItem value="3-6 months">3-6 months</SelectItem>
              <SelectItem value="6-12 months">6-12 months</SelectItem>
              <SelectItem value="Ongoing">Ongoing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationDeadline">Application Deadline</Label>

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild disabled={isLoading}>
            <div tabIndex={0} className="w-full cursor-pointer border rounded-md px-3 py-2 flex items-center justify-between">
              {formData.applicationDeadline ? formData.applicationDeadline.toLocaleDateString() : "Select a date"}
              <Calendar1 className="ml-auto h-4 w-4 opacity-50" />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto px-4 z-[9999] pointer-events-auto" align="start">
            <Calendar
              initialFocus
              mode="single"
              selected={formData.applicationDeadline}
              onSelect={(date) => {
                setFormData((prev) => ({ ...formData, applicationDeadline: date ?? prev.applicationDeadline }));
                setIsOpen(false);
              }}
              disabled={(date) => date < new Date()}
              required
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={
            !formData.proposalTitle ||
            !formData.proposalDescription ||
            formData.skillsRequired.length === 0 ||
            formData.lookingFor.length === 0 ||
            !formData.timeCommitment ||
            !formData.duration ||
            formData.applicationDeadline?.toDateString() === new Date().toDateString() ||
            isLoading
          }
        >
          {isLoading ?
            <span className="flex flex-row items-center">
              <Loader className="animate-spin mr-2 h-4 w-4" />
              Creating...
            </span>
            :
            <span>
              Create Post
            </span>
          }
        </Button>
      </div>
    </form >
  )
}


export default CreatePost;