import CreatePost from "@/components/custom/CreatePost"
import TabsWithLoader from "@/components/custom/TabsWithLoader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthContext } from "@/context/AuthContext"
import { serverAxiosInstance } from "@/utilities/config"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { ClockAlert, PlusCircle, Search, Users } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { toast } from "sonner"


const Proposals = () => {

    const { getCurrAuth } = useContext(AuthContext);
    const currUser = getCurrAuth();

    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [needsReload, setNeedsReload] = useState(false);

    const [allProposals, setAllProposals] = useState([]);
    const [allFilteredProposals, setAllFilteredProposals] = useState([]);
    const [allSavedProposals, setAllSavedProposals] = useState([]);
    const [allAppliedProposals, setAllAppliedProposals] = useState([]);

    // Fetch all proposals from the server on page load
    useEffect(() => {
        setIsLoading(true)
        const fetchAllProposals = async () => {
            try {
                await serverAxiosInstance.get("/user/proposals").then((response) => {
                    if (response.status === 200) {
                        const proposals = response.data.foundProposals;
                        const savedProposals = response.data.savedProposals;
                        setAllSavedProposals(savedProposals);
                        setAllProposals(proposals);
                        setAllAppliedProposals(proposals.filter((proposal) => proposal.applicants.some((applicant) => applicant._id === response.data.currUserId)));
                    }
                    setIsLoading(false);
                    setIsDisabled(false);
                }).catch((error) => {
                    toast.error("Error fetching proposals: " + error.message)
                    setIsLoading(false);
                })
            } catch (error) {
                console.error("Error fetching proposals:", error)
            }
        }
        fetchAllProposals();
    }, [needsReload])

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl h-[82vh] flex flex-1">
            <div className="flex flex-col md:flex-row gap-6 flex-1 h-full">
                {/* sidebar */}
                <div className="w-full md:w-64 space-y-6">
                    <div className="rounded-lg border p-4 space-y-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search for proposals..."
                                className="pl-8"
                                disabled={isDisabled || isLoading}
                            // value={searchQuery}
                            // onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold">
                                Filters
                            </h3>
                            <div className="space-y-1">
                                <Button
                                    // variant={activeFilter === "all" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    disabled={isDisabled || isLoading}
                                // onClick={() => setActiveFilter("all")}
                                >
                                    <Users className="mr-2 h-4 w-4" />
                                    All Proposals
                                </Button>
                                <Button
                                    // variant={activeFilter === "saved" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    disabled={isDisabled || isLoading}
                                // onClick={() => setActiveFilter("saved")}
                                >
                                    <ClockAlert className="mr-2 h-4 w-4" />
                                    Recent Proposals
                                </Button>
                            </div>
                        </div>
                        <Separator />
                        <Dialog
                        // open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}
                        >
                            <DialogTrigger asChild>
                                <Button
                                    className="w-full"
                                    disabled={isDisabled || isLoading}
                                >
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create a New Proposal
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-visible focus:outline-none">
                                <DialogHeader>
                                    <DialogTitle>Create a New Proposal</DialogTitle>
                                    <DialogDescription>
                                        Share your project idea and find the perfect team members to collaborate with.
                                    </DialogDescription>
                                </DialogHeader>
                                <CreatePost onSubmit={"addNewPost"} shouldParentUpdate={setNeedsReload} />
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
                <div className="flex-1 space-y-6 h-full flex flex-col">
                    <Tabs defaultValue="all" className="flex flex-col flex-1 h-full max-h-[80vh]">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="all">All Proposals</TabsTrigger>
                            <TabsTrigger value="saved">Saved Proposals</TabsTrigger>
                            <TabsTrigger value="applied">Applied Proposals</TabsTrigger>
                        </TabsList>
                        <TabsWithLoader
                            value={"all"}
                            styles={"mt-6 space-y-6 h-full overflow-auto"}
                            isLoading={isLoading}
                            proposalList={allProposals}
                            savedProposals={allSavedProposals}
                            appliedProposals={allAppliedProposals}
                            shouldParentUpdate={setNeedsReload}
                        >
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium">No projects found</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                            </div>
                        </TabsWithLoader>
                        <TabsWithLoader
                            value={"saved"}
                            styles={"mt-6 space-y-6 h-full overflow-auto"}
                            isLoading={isLoading}
                            proposalList={allSavedProposals}
                            savedProposals={allSavedProposals}
                            appliedProposals={allAppliedProposals}
                            shouldParentUpdate={setNeedsReload}
                        >
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium">No saved projects</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                            </div>
                        </TabsWithLoader>
                        <TabsWithLoader
                            value={"applied"}
                            styles={"mt-6 space-y-6 h-full overflow-auto"}
                            isLoading={isLoading}
                            proposalList={allAppliedProposals}
                            savedProposals={allSavedProposals}
                            appliedProposals={allAppliedProposals}
                            shouldParentUpdate={setNeedsReload}
                        >
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium">No applied projects</h3>
                                <p className="text-muted-foreground">Try adjusting your search or filters</p>
                            </div>
                        </TabsWithLoader>
                    </Tabs>
                </div >

            </div >
        </div >
    )
}


export default Proposals;