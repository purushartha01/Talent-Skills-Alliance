
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

/**
 * CreatePostForm Component
 *
 * Form for creating a new project post with fields for title, description,
 * required skills, team roles, and project duration.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to call when form is submitted
 */
export default function CreatePost({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: [],
    lookingFor: [],
    timeCommitment: "",
    duration: "",
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
        requirements: [...prev.requirements, { ...newSkill }],
      }))
      setNewSkill({ skill: "", level: "Beginner" })
    }
  }

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
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
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter a clear, descriptive title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe your project idea, goals, and vision"
          rows={5}
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Required Skills</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill"
            value={newSkill.skill}
            onChange={(e) => setNewSkill({ ...newSkill, skill: e.target.value })}
            className="flex-1"
          />
          <Select value={newSkill.level} onValueChange={(value) => setNewSkill({ ...newSkill, level: value })}>
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
          {formData.requirements.map((req, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
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
          />
          <Button type="button" onClick={addRole} size="sm">
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
          <Label htmlFor="duration">Project Duration</Label>
          <Select
            value={formData.duration}
            onValueChange={(value) => setFormData({ ...formData, duration: value })}
            required
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select project duration" />
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

      <div className="flex justify-end gap-2">
        <Button
          type="submit"
          disabled={
            !formData.title ||
            !formData.description ||
            formData.requirements.length === 0 ||
            formData.lookingFor.length === 0 ||
            !formData.timeCommitment ||
            !formData.duration
          }
        >
          Create Post
        </Button>
      </div>
    </form>
  )
}
