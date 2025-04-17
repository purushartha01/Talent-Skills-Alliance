import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bookmark, BookmarkCheck, Calendar, CheckCircle, Clock, MessageSquare, Send, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'

const PostCard = () => {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="pb-4">
                <div className='flex justify-between items-start'>
                    <div className='flex items-center gap-3'>
                        <Avatar>
                            {/* TODO: Add user image or placeholder image and username as alt */}
                            <AvatarImage src={""} alt="" />
                            <AvatarFallback>
                                {/* {post.author.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")} */}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">
                                {/* {post.author.name} */}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {/* {post.author.role} */}
                            </div>
                        </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        {/* {post.timestamp} */}
                    </div>

                </div>
            </CardHeader>

            <CardContent className="pb-4 space-y-4">
                <div>
                    <CardTitle className="text-xl mb-2">
                        {/* {post.title} */}
                    </CardTitle>
                    <CardDescription className="text-sm text-foreground/90">
                        {/* {post.description} */}
                    </CardDescription>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Users className="h-4 w-4 text-primary" />
                            Looking for:
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {/* {post.lookingFor.map((role, index) => (
                                <Badge key={index} variant="outline">
                                    {role} *
                                </Badge>
                            ))} */}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="h-4 w-4 text-primary" />
                            Time Commitment:
                        </div>
                        <div className="text-sm">
                            {/* {post.timeCommitment} */}
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium mt-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            Project Duration:
                        </div>
                        <div className="text-sm">
                            {/* {post.duration} */}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">Required Skills:</div>
                    <div className="flex flex-wrap gap-2">
                        {/* {post.requirements.map((req, index) => (
                            <Badge key={index} variant="secondary">
                                {req.skill} • {req.level}
                            </Badge>
                        ))} */}
                    </div>
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="pt-4 flex justify-between">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onSave()}>
                        {/* {post.saved ? (
                            <>
                                <BookmarkCheck className="h-4 w-4 mr-2 text-primary" />
                                Saved
                            </>
                        ) : (
                            <>
                                <Bookmark className="h-4 w-4 mr-2" />
                                Save
                            </>
                        )} */}
                    </Button>
                    <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {/* {post.comments} Comments */}
                    </Button>
                </div>

                <Dialog
                // open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button
                            // variant={post.applied ? "outline" : "default"}
                            size="sm"
                        // onClick={post.applied ? handleApply : undefined}
                        >
                            {/* {post.applied ? (
                                <>
                                    <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                    Applied
                                </>
                            ) : (
                                "Apply Now"
                            )} */}
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {/* Apply to "{post.title}" */}
                            </DialogTitle>
                            <DialogDescription>
                                Tell the project creator why you're interested and what you can bring to the team.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium">Your application message:</h4>
                                <Textarea
                                    placeholder="I'm interested in this project because..."
                                    rows={6}
                                // value={applicationMessage}
                                // onChange={(e) => setApplicationMessage(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline"
                            // onClick={() => setIsApplyDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                            // onClick={submitApplication} disabled={!applicationMessage.trim()}
                            >
                                <Send className="h-4 w-4 mr-2" />
                                Send Application
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </CardFooter>

        </Card>
    )
}

export default PostCard