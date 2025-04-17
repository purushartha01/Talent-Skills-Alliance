import CreatePost from "@/components/custom/CreatePost"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Bookmark, CheckCircle2, PlusCircle, Search, Users } from "lucide-react"

const Explore = () => {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-6">
                {/* sidebar */}
                <div className="w-full md:w-64 space-y-6">
                    <div className="rounded-lg border p-4 space-y-4">
                        <h2 className="text-xl font-bold">Explore Projects</h2>
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search projects..."
                                className="pl-8"
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Filter By</h3>
                            <div className="space-y-1">
                                <Button
                                    // variant={activeFilter === "all" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                // onClick={() => setActiveFilter("all")}
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    All Projects
                                </Button>
                                <Button
                                    // variant={activeFilter === "saved" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                // onClick={() => setActiveFilter("saved")}
                                >
                                    <Bookmark className="mr-2 h-4 w-4" />
                                    Saved Projects
                                </Button>
                                <Button
                                    // variant={activeFilter === "applied" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                // onClick={() => setActiveFilter("applied")}
                                >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />
                                    Applied Projects
                                </Button>
                            </div>
                        </div>
                        <Separator />
                        <Dialog
                        // open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}
                        >
                            <DialogTrigger asChild>
                                <Button className="w-full">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create Post
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Create a New Project Post</DialogTitle>
                                    <DialogDescription>
                                        Share your project idea and find the perfect team members to collaborate with.
                                    </DialogDescription>
                                </DialogHeader>
                                <CreatePost onSubmit={"addNewPost"} />
                            </DialogContent>
                        </Dialog>
                    </div>

                    <div className="rounded-lg border p-4 space-y-4">
                        <h2 className="text-lg font-bold">Popular Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">React</Badge>
                            <Badge variant="secondary">Node.js</Badge>
                            <Badge variant="secondary">UI/UX</Badge>
                            <Badge variant="secondary">Python</Badge>
                            <Badge variant="secondary">Machine Learning</Badge>
                            <Badge variant="secondary">AWS</Badge>
                            <Badge variant="secondary">DevOps</Badge>
                            <Badge variant="secondary">Mobile</Badge>
                        </div>
                    </div>
                </div>


                {/* main content */}
                <div className="flex-1 space-y-6">
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">All Projects</TabsTrigger>
                            <TabsTrigger value="trending">Trending</TabsTrigger>
                            <TabsTrigger value="recent">Recent</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="mt-6 space-y-6">
                            {/* {filteredPosts.length > 0 ? ( */}
                                {/* filteredPosts.map((post) => ( */}
                                    {/* <PostCard
                                        key={post.id}
                                        post={post}
                                        onSave={() => toggleSavePost(post.id)}
                                        onApply={() => toggleApplyPost(post.id)}
                                    /> */}
                                {/* )) */}
                            {/* ) : ( */}
                                <div className="text-center py-12">
                                    <h3 className="text-lg font-medium">No projects found</h3>
                                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                                </div>
                            {/* )} */}
                        </TabsContent>
                        <TabsContent value="trending" className="mt-6 space-y-6">
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium">Trending projects coming soon</h3>
                                <p className="text-muted-foreground">We're working on this feature</p>
                            </div>
                        </TabsContent>
                        <TabsContent value="recent" className="mt-6 space-y-6">
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium">Recent projects coming soon</h3>
                                <p className="text-muted-foreground">We're working on this feature</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    )
}


export default Explore