
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Briefcase, PlusCircle, Search, UserPlus, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
const UserTeams = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Teams & Collaborations</h1>
                        <p className="text-muted-foreground">Manage your teams, projects, and collaborations.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Dialog
                        // open={isNewTeamDialogOpen} onOpenChange={setIsNewTeamDialogOpen}
                        >
                            <DialogTrigger asChild>
                                <Button className="w-full sm:w-auto">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create New Team
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Create a New Team</DialogTitle>
                                    <DialogDescription>
                                        Create a team to collaborate on projects with other professionals.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <label htmlFor="team-name" className="text-sm font-medium">
                                            Team Name
                                        </label>
                                        <Input
                                            id="team-name"
                                            placeholder="Enter team name"
                                        // value={newTeam.name}
                                        // onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="team-description" className="text-sm font-medium">
                                            Description
                                        </label>
                                        <Textarea
                                            id="team-description"
                                            placeholder="Describe the team's purpose and goals"
                                            rows={4}
                                        // value={newTeam.description}
                                        // onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline"
                                    // onClick={() => setIsNewTeamDialogOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                    // onClick={handleCreateTeam} disabled={!newTeam.name || !newTeam.description}
                                    >
                                        Create Team
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Sidebar - Stats and Filters */}
                    <div className="w-full lg:w-64 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Team Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">
                                        {/* {teams.length} */}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Teams</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">
                                        {/* {teams.reduce((acc, team) => acc + team.projects.length, 0)} */}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Projects</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">
                                        {/* {invitations.length} */}

                                    </p>
                                    <p className="text-sm text-muted-foreground">Invitations</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold">
                                        {/* {teams.reduce((acc, team) => acc + team.projects.filter((p) => p.status === "active").length, 0)} */}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Active</p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="rounded-lg border p-4 space-y-4">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search teams..."
                                    className="pl-8"
                                // value={searchQuery}
                                // onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Invitations Section */}
                        {/* {invitations.length > 0 && (
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle>Team Invitations</CardTitle>
                                    <CardDescription>
                                        You have {invitations.length} pending invitation{invitations.length > 1 ? "s" : ""}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {invitations.map((invitation) => (
                                        <div key={invitation.id} className="rounded-lg border p-3 space-y-3">
                                            <div>
                                                <h4 className="font-medium">{invitation.teamName}</h4>
                                                <p className="text-sm text-muted-foreground">
                                                    Invited by {invitation.invitedBy} • {new Date(invitation.date).toLocaleDateString()}
                                                </p>
                                                <Badge className="mt-1">{invitation.role}</Badge>
                                            </div>
                                            <p className="text-sm">{invitation.message}</p>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() => handleDeclineInvitation(invitation.id)}
                                                >
                                                    Decline
                                                </Button>
                                                <Button size="sm" className="flex-1" onClick={() => handleAcceptInvitation(invitation.id)}>
                                                    Accept
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        )} */}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        <Tabs defaultValue="myTeams" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="myTeams">
                                    <Users className="h-4 w-4 mr-2" />
                                    My Teams
                                </TabsTrigger>
                                <TabsTrigger value="teamProjects">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Team Projects
                                </TabsTrigger>
                            </TabsList>

                            {/* My Teams Tab */}
                            <TabsContent value="myTeams" className="mt-6 space-y-6">
                                {/* {filteredTeams.length > 0 ? (
                                    <div className="space-y-6">
                                        {filteredTeams.map((team) => (
                                            <Card key={team.id}>
                                                <CardHeader>
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                        <div>
                                                            <CardTitle className="text-xl">{team.name}</CardTitle>
                                                            <CardDescription className="mt-1">{team.description}</CardDescription>
                                                        </div>
                                                        <Badge variant="outline" className="w-fit">
                                                            {team.role}
                                                        </Badge>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-2">Team Members ({team.members.length})</h4>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                                                            {team.members.map((member) => (
                                                                <div key={member.id} className="flex items-center gap-2 p-2 rounded-md border">
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                                                        <AvatarFallback>
                                                                            {member.name
                                                                                .split(" ")
                                                                                .map((n) => n[0])
                                                                                .join("")}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-sm font-medium truncate">{member.name}</p>
                                                                        <p className="text-xs text-muted-foreground truncate">{member.role}</p>
                                                                    </div>
                                                                    <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
                                                                        <DialogTrigger asChild>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="icon"
                                                                                className="h-8 w-8"
                                                                                onClick={() =>
                                                                                    setEmailDetails({
                                                                                        to: member.email,
                                                                                        subject: `Regarding ${team.name} Team`,
                                                                                        message: `Hi ${member.name.split(" ")[0]},\n\n`,
                                                                                    })
                                                                                }
                                                                            >
                                                                                <Mail className="h-4 w-4" />
                                                                                <span className="sr-only">Email</span>
                                                                            </Button>
                                                                        </DialogTrigger>
                                                                        <DialogContent>
                                                                            <DialogHeader>
                                                                                <DialogTitle>Send Email</DialogTitle>
                                                                                <DialogDescription>Contact your team member via email.</DialogDescription>
                                                                            </DialogHeader>
                                                                            <div className="space-y-4 py-4">
                                                                                <div className="space-y-2">
                                                                                    <label htmlFor="email-to" className="text-sm font-medium">
                                                                                        To
                                                                                    </label>
                                                                                    <Input id="email-to" value={emailDetails.to} readOnly />
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    <label htmlFor="email-subject" className="text-sm font-medium">
                                                                                        Subject
                                                                                    </label>
                                                                                    <Input
                                                                                        id="email-subject"
                                                                                        value={emailDetails.subject}
                                                                                        onChange={(e) =>
                                                                                            setEmailDetails({ ...emailDetails, subject: e.target.value })
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                                <div className="space-y-2">
                                                                                    <label htmlFor="email-message" className="text-sm font-medium">
                                                                                        Message
                                                                                    </label>
                                                                                    <Textarea
                                                                                        id="email-message"
                                                                                        rows={6}
                                                                                        value={emailDetails.message}
                                                                                        onChange={(e) =>
                                                                                            setEmailDetails({ ...emailDetails, message: e.target.value })
                                                                                        }
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <DialogFooter>
                                                                                <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                                                                                    Cancel
                                                                                </Button>
                                                                                <Button
                                                                                    onClick={handleSendEmail}
                                                                                    disabled={!emailDetails.subject || !emailDetails.message}
                                                                                >
                                                                                    <Mail className="mr-2 h-4 w-4" />
                                                                                    Send Email
                                                                                </Button>
                                                                            </DialogFooter>
                                                                        </DialogContent>
                                                                    </Dialog>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {team.projects.length > 0 && (
                                                        <div>
                                                            <h4 className="text-sm font-medium mb-2">Projects ({team.projects.length})</h4>
                                                            <div className="space-y-2">
                                                                {team.projects.map((project) => {
                                                                    const statusInfo = getStatusInfo(project.status)
                                                                    return (
                                                                        <div
                                                                            key={project.id}
                                                                            className="flex items-center justify-between p-2 rounded-md border"
                                                                        >
                                                                            <div className="flex items-center gap-2">
                                                                                <Badge className={`${statusInfo.color} flex items-center`}>
                                                                                    {statusInfo.icon}
                                                                                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                                                </Badge>
                                                                                <span className="font-medium">{project.name}</span>
                                                                            </div>
                                                                            <div className="flex items-center gap-4">
                                                                                <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                                                                                    <Calendar className="h-4 w-4" />
                                                                                    <span>{new Date(project.deadline).toLocaleDateString()}</span>
                                                                                </div>
                                                                                <Button variant="ghost" size="sm" asChild>
                                                                                    <Link href={`/projects/${project.id}`}>
                                                                                        <span className="sr-only sm:not-sr-only sm:mr-2">Details</span>
                                                                                        <ArrowUpRight className="h-4 w-4" />
                                                                                    </Link>
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardContent>
                                                <CardFooter className="flex flex-col sm:flex-row gap-2 justify-between">
                                                    <div className="text-sm text-muted-foreground">
                                                        Created on {new Date(team.createdAt).toLocaleDateString()}
                                                    </div>
                                                    <div className="flex gap-2 w-full sm:w-auto">
                                                        {team.isOwner ? (
                                                            <>
                                                                <Dialog>
                                                                    <DialogTrigger asChild>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => {
                                                                                setSelectedTeamForInvite(team.id)
                                                                                setIsInviteMemberDialogOpen(true)
                                                                            }}
                                                                        >
                                                                            <UserPlus className="mr-2 h-4 w-4" />
                                                                            Invite Member
                                                                        </Button>
                                                                    </DialogTrigger>
                                                                </Dialog>
                                                                <Button variant="outline" size="sm" asChild>
                                                                    <Link href={`/teams/${team.id}/settings`}>
                                                                        <Settings className="mr-2 h-4 w-4" />
                                                                        Team Settings
                                                                    </Link>
                                                                </Button>
                                                            </>
                                                        ) : (
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="outline" size="sm">
                                                                        <MoreHorizontal className="mr-2 h-4 w-4" />
                                                                        Actions
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end">
                                                                    <DropdownMenuItem asChild>
                                                                        <Link href={`/teams/${team.id}`}>View Team Details</Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleLeaveTeam(team.id)}
                                                                        className="text-destructive"
                                                                    >
                                                                        <LogOut className="mr-2 h-4 w-4" />
                                                                        Leave Team
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        )}
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <h3 className="text-lg font-medium">No teams found</h3>
                                        {searchQuery ? (
                                            <p className="text-muted-foreground">Try adjusting your search</p>
                                        ) : (
                                            <p className="text-muted-foreground">Create a team or accept invitations to get started</p>
                                        )}
                                        <Button className="mt-4" onClick={() => setIsNewTeamDialogOpen(true)}>
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Create New Team
                                        </Button>
                                    </div>
                                )} */}
                            </TabsContent>

                            {/* Team Projects Tab */}
                            <TabsContent value="teamProjects" className="mt-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* {teams
                                        .flatMap((team) =>
                                            team.projects.map((project) => ({
                                                ...project,
                                                teamName: team.name,
                                                teamId: team.id,
                                                role: team.role,
                                            })),
                                        )
                                        .map((project) => {
                                            const statusInfo = getStatusInfo(project.status)
                                            return (
                                                <Card key={`${project.teamId}-${project.id}`}>
                                                    <CardHeader className="pb-2">
                                                        <div className="flex justify-between">
                                                            <Badge className={`${statusInfo.color} flex items-center mb-2`}>
                                                                {statusInfo.icon}
                                                                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                                            </Badge>
                                                            <Badge variant="outline">{project.role}</Badge>
                                                        </div>
                                                        <CardTitle className="text-lg">{project.name}</CardTitle>
                                                        <CardDescription>
                                                            Part of{" "}
                                                            <Link href={`/teams/${project.teamId}`} className="underline hover:text-primary">
                                                                {project.teamName}
                                                            </Link>
                                                        </CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="pb-2">
                                                        <div className="space-y-4">
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-muted-foreground">Progress</span>
                                                                <span className="font-medium">{project.progress}%</span>
                                                            </div>
                                                            <div className="w-full bg-muted rounded-full h-2">
                                                                <div
                                                                    className="bg-primary rounded-full h-2"
                                                                    style={{ width: `${project.progress}%` }}
                                                                ></div>
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                                    <Calendar className="h-4 w-4" />
                                                                    <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                                                                </div>
                                                                <div className="flex items-center gap-1 text-sm">
                                                                    {project.status === "completed" ? (
                                                                        <Badge variant="outline" className="bg-green-50">
                                                                            Completed
                                                                        </Badge>
                                                                    ) : (
                                                                        <Badge variant="outline" className={project.progress >= 50 ? "bg-amber-50" : ""}>
                                                                            {project.progress >= 50 ? "In Progress" : "Early Stage"}
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                    <CardFooter className="pt-2">
                                                        <div className="flex gap-2 w-full">
                                                            <Button variant="outline" size="sm" className="flex-1" asChild>
                                                                <Link href={`/teams/${project.teamId}`}>
                                                                    <Users className="mr-2 h-4 w-4" />
                                                                    Team
                                                                </Link>
                                                            </Button>
                                                            <Button size="sm" className="flex-1" asChild>
                                                                <Link href={`/projects/${project.id}`}>
                                                                    <FileText className="mr-2 h-4 w-4" />
                                                                    Project Details
                                                                </Link>
                                                            </Button>
                                                        </div>
                                                    </CardFooter>
                                                </Card>
                                            )
                                        })} */}
                                </div>

                                {/* {teams.flatMap((team) => team.projects).length === 0 && (
                                    <div className="text-center py-12">
                                        <h3 className="text-lg font-medium">No team projects found</h3>
                                        <p className="text-muted-foreground">
                                            Your teams don't have any projects yet. Create a project in one of your teams to get started.
                                        </p>
                                    </div>
                                )} */}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>

            {/* Invite Member Dialog */}
            <Dialog
            // open={isInviteMemberDialogOpen} onOpenChange={setIsInviteMemberDialogOpen}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite Team Member</DialogTitle>
                        <DialogDescription>
                            Invite someone to join your team. They&apos;ll receive an email invitation.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label htmlFor="invite-email" className="text-sm font-medium">
                                Email Address
                            </label>
                            <Input
                                id="invite-email"
                                type="email"
                                placeholder="colleague@example.com"
                            // value={inviteDetails.email}
                            // onChange={(e) => setInviteDetails({ ...inviteDetails, email: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="invite-role" className="text-sm font-medium">
                                Team Role
                            </label>
                            <Select
                            // value={inviteDetails.role}
                            // onValueChange={(value) => setInviteDetails({ ...inviteDetails, role: value })}
                            >
                                <SelectTrigger id="invite-role">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Developer">Developer</SelectItem>
                                    <SelectItem value="Designer">Designer</SelectItem>
                                    <SelectItem value="Project Manager">Project Manager</SelectItem>
                                    <SelectItem value="QA Engineer">QA Engineer</SelectItem>
                                    <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                                    <SelectItem value="DevOps Engineer">DevOps Engineer</SelectItem>
                                    <SelectItem value="Other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="invite-message" className="text-sm font-medium">
                                Personal Message (Optional)
                            </label>
                            <Textarea
                                id="invite-message"
                                placeholder="Add a personal message to your invitation..."
                                rows={3}
                            // value={inviteDetails.message}
                            // onChange={(e) => setInviteDetails({ ...inviteDetails, message: e.target.value })}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline"
                        // onClick={() => setIsInviteMemberDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                        // onClick={handleInviteMember} disabled={!inviteDetails.email || !inviteDetails.role}
                        >
                            <UserPlus className="mr-2 h-4 w-4" />
                            Send Invitation
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default UserTeams