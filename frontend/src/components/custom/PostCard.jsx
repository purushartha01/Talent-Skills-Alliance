import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bookmark, BookmarkCheck, Calendar, CheckCircle, Clock, ExternalLink, Loader, MessageSquare, Send, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { useContext, useState } from 'react'
import { serverAxiosInstance } from '@/utilities/config'
import { AuthContext } from '@/context/AuthContext'
import { Link } from 'react-router-dom'

const PostCard = ({ post, isSaved, isApplied, setStatusChange }) => {

    const [saved, setSaved] = useState(isSaved);
    const [isLoading, setLoading] = useState(false);

    const currUser = useContext(AuthContext).getCurrAuth();
    const currUserId = (currUser?._id ?? currUser.id) || null;

    const handleSave = async (proposalId) => {
        setLoading(true);
        console.log("Saved", proposalId)
        await serverAxiosInstance.post('/user/proposal/save', { proposalID: proposalId })
            .then((res) => {
                // console.log(res.data)
                if (res.status === 200) {
                    setSaved(true);
                    setStatusChange((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false);
            })
    }

    const handleUnsave = async (proposalId) => {
        console.log("Unsave", proposalId)
        setLoading(true);
        await serverAxiosInstance.post('/user/proposal/unsave', { proposalID: proposalId })
            .then((res) => {
                if (res.status === 200) {
                    console.log("Withing then()")
                    setSaved(false);
                    setStatusChange((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false);
            })
    }

    const handleApply = async (proposalId) => {
        console.log("Applied", proposalId)

        setLoading(true);
        await serverAxiosInstance.post('/user/proposal/apply', { proposalID: proposalId, appliedOn: new Date() })
            .then((res) => {
                if (res.status === 200) {
                    console.log("Withing then()")
                    setStatusChange((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false);
            })
    }


    return (
        <Card className="overflow-hidden hover:shadow-lg" disabled={isLoading}>
            <CardHeader className="">
                <div className='flex justify-between items-start'>
                    <div className='flex items-center gap-3'>
                        <Avatar className={"md:h-8 aspect-square"}>
                            {/* TODO: Add user image or placeholder image and username as alt */}
                            <AvatarImage src={post?.author?.about?.profileImg} alt="" />
                            <AvatarFallback>
                                {post?.author?.about?.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">
                                {post.author.username}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {post?.author?.about?.title}
                            </div>
                        </div>
                    </div>
                    {/* <div className="text-sm text-muted-foreground">
                    </div> */}
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <CardTitle className="capitalize text-xl mb-2">
                        {post?.proposalTitle}
                    </CardTitle>
                    <CardDescription className="text-sm text-foreground/90 max-h-[50px] first-letter:capitalize overflow-ellipsis line-clamp-2">
                        {post?.proposalDescription}
                    </CardDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Users className="h-4 w-4 text-primary" />
                            Looking for:
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {post?.lookingFor?.map((role, index) => (
                                <Badge key={index} variant="outline" className="capitalize text-sm">
                                    {role}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <Clock className="h-4 w-4 text-primary" />
                            Time Commitment:
                        </div>
                        <div className="text-sm font-medium pl-6">
                            {post.timeCommitment}
                        </div>

                        <div className="flex items-center gap-2 text-sm font-medium mt-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            Project Duration:
                        </div>
                        <div className="text-sm font-medium pl-6">
                            {post?.duration}
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium">Required Skills:</div>
                    <div className="flex flex-wrap gap-2">
                        {post?.skillsRequired?.map((req, index) => (
                            <Badge key={index} variant="secondary" className="capitalize text-sm">
                                {req.skill} • {req.level}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="pt-4 flex justify-between">
                <div className="flex items-center gap-2">
                    <Button variant={isSaved ? "secondary" : "ghost"} size="sm" onClick={e => {
                        e.preventDefault();
                        if (!saved) {
                            handleSave(post?._id);
                        } else {
                            handleUnsave(post?._id);
                        }
                    }}
                        className="flex items-center gap-2"
                    >

                        {isLoading ? (
                            <div className='flex flex-row items-center gap-2'>
                                <Loader className="animate-spin h-4 w-4" />
                                Saving...
                            </div>
                        ) : (
                            <div className='flex flex-row items-center gap-2'>
                                {saved ? (
                                    <div className='flex flex-row items-center gap-2'>
                                        <BookmarkCheck className="h-4 w-4 text-primary" />
                                        Unsave
                                    </div>
                                ) : (
                                    <div className='flex flex-row items-center gap-2'>
                                        <Bookmark className="h-4 w-4" />
                                        Save
                                    </div>
                                )}
                            </div>
                        )}
                    </Button>
                </div>
                <div className='w-full flex flex-row justify-end gap-2'>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Link to={`/proposals/${post?._id}`} className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            View Proposal
                        </Link>
                    </Button>

                    {
                        post?.author?._id !== currUserId ? (
                            <Button
                                variant={isApplied ? "outline" : "default"}
                                size="sm"
                                className={"flex items-center gap-2"}
                                onClick={e => { e.preventDefault(); handleApply(post?._id) }}
                                disabled={isApplied || isLoading}
                            >
                                {/* {console.log("isApplied", currUserId, post.author)} */}
                                {isApplied ? (
                                    <>
                                        <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                                        Applied
                                    </>
                                ) : (
                                    "Apply Now"
                                )}
                            </Button>

                        ) : (
                            <Badge variant="outline" className="text-sm font-medium text-muted-foreground">
                                <div className='flex flex-row items-center gap-2'>
                                    <MessageSquare className="h-4 w-4" />
                                    You are the author
                                </div>
                            </Badge>
                        )
                    }
                </div>
            </CardFooter >

        </Card >
    )
}

export default PostCard