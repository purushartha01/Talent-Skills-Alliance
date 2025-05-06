
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Briefcase, Loader, PlusCircle, Search, UserPlus, Users, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useContext, useEffect, useState } from 'react';
import { serverAxiosInstance } from '@/utilities/config';
import { toast } from 'sonner';
import { AuthContext } from '@/context/AuthContext';
import { set } from 'date-fns';
import ProjectCard from '@/components/custom/ProjectCard';
import { useNavigate } from 'react-router-dom';



const UserProjects = () => {

    const currUser = useContext(AuthContext).getCurrAuth();
    const currUserId = currUser?.userId ?? currUser?._id;

    const navigate = useNavigate();


    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [shouldUpdate, setShouldUpdate] = useState(0);

    const [projectList, setProjectList] = useState([]);
    const [proposedProjects, setProposedProjects] = useState([]);
    const [allProposedProjects, setAllProposedProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);

    const [allUserReviews, setAllUserReviews] = useState([]);




    useEffect(() => {
        if (Object.keys(currUser).length > 0) {
            if (!currUser?.about) {
                toast.error("Incomplete profile.", {
                    description: "Please complete your profile to access all features.",
                    duration: 3000,
                });
                navigate("/user/profile");
            }
        }
    }, [currUser, navigate]);

    useEffect(() => {

        const fetchProjects = () => {
            setIsLoading(true);
            serverAxiosInstance.get('/project/user/all')
                .then((res) => {
                    if (res.status === 200) {
                        // console.log(res.data);
                        setProjectList(res.data.allProjects);
                        setAllProjects(res.data.allProjects);

                        setProposedProjects(res.data.foundProposedProjects);
                        setAllProposedProjects(res.data.foundProposedProjects);
                        setAllUserReviews(res.data.foundReviewsGiven);



                        setIsLoading(false);
                    }
                })
                .catch((err) => {
                    // console.error(err);
                    toast.error('Error fetching projects. Please try again later.');
                    setIsLoading(false);
                });
        }

        fetchProjects();

    }, [shouldUpdate]);




    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value.length === 0) {
            setProjectList(allProjects);
            setProposedProjects(allProposedProjects);
        }

    }

    const handleSearchOperation = (e) => {
        if (searchQuery.length > 0) {
            setProjectList(allProjects?.filter((project) => {
                return project?.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project?.projectDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project?.skillsUsed?.some((skill) => skill?.skill?.toLowerCase().includes(searchQuery.toLowerCase()));
            }));
            setProposedProjects(allProposedProjects.filter((project) => {
                return project?.projectTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project?.projectDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project?.skillsUsed?.some((skill) => skill?.skill?.toLowerCase().includes(searchQuery.toLowerCase()));
            }));
        }
        else {
            setProjectList(allProjects);
            setProposedProjects(allProposedProjects);
        }
    }




    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="flex flex-col space-y-8 mt-4 mb-36">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar - Stats and Filters */}
                    <div className="w-full md:w-64 space-y-6">
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle>Search</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col space-y-4">
                                <div className="relative space-y-2">
                                    <Input
                                        placeholder="Search for proposals..."
                                        className="pr-8"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    {
                                        searchQuery.length > 0 &&
                                        <Button
                                            variant="ghost"
                                            className="absolute right-0 top-0 text-muted-foreground"
                                            onClick={e => { e.preventDefault(); setSearchQuery(''); setProjectList(allProjects); setProposedProjects(allProposedProjects); }}
                                        >
                                            <X className="h-full w-4" />
                                        </Button>
                                    }
                                    <Button className={"w-full"}
                                        onClick={handleSearchOperation}
                                    >
                                        {/* Updated variant to "primary" */}
                                        Search
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="all">
                                    <Users className="h-4 w-4 mr-2" />
                                    Team Projects
                                </TabsTrigger>
                                <TabsTrigger value="proposed">
                                    <Briefcase className="h-4 w-4 mr-2" />
                                    Proposed Projects
                                </TabsTrigger>
                            </TabsList>

                            {/* All Projects */}
                            <TabsContent value="all" className="mt-6 space-y-6">
                                {
                                    isLoading ?
                                        <div className="flex items-center justify-center h-64">
                                            <Loader className='animate-spin w-4 h-4' />
                                        </div>
                                        :
                                        <div className="flex flex-col space-y-4">
                                            {
                                                projectList.length > 0 ?
                                                    projectList.map((project, index) => {
                                                        // console.log("Project: ", project);
                                                        return (
                                                            <ProjectCard
                                                                key={index}
                                                                isProposed={project?.teamLeader?._id === currUserId}
                                                                project={project}
                                                                reviews={
                                                                    allUserReviews.filter((rev) => {
                                                                        return rev?.forProject?._id === project?._id;
                                                                    })
                                                                }
                                                                setShouldParentUpdate={setShouldUpdate}
                                                            />
                                                        )
                                                    })
                                                    :
                                                    <div className="flex items-center justify-center h-64">
                                                        <p>No team projects found.</p>
                                                    </div>
                                            }
                                        </div>
                                }

                            </TabsContent>

                            {/* Team Projects Tab */}
                            <TabsContent value="proposed" className="mt-6 space-y-6">
                                {
                                    isLoading ?
                                        <div className="flex items-center justify-center h-64">
                                            <Loader className='animate-spin w-4 h-4' />
                                        </div>
                                        :
                                        <div className="flex flex-col space-y-4">
                                            {
                                                proposedProjects.length > 0 ?
                                                    proposedProjects.map((project, index) => (
                                                        // console.log("foundReviewsGiven: ", allUserReviews),

                                                        <ProjectCard
                                                            key={index}
                                                            isProposed={true}
                                                            project={project}
                                                            reviews={
                                                                allUserReviews.filter((rev) => {
                                                                    return rev?.forProject?._id === project?._id;
                                                                })
                                                            }
                                                            setShouldParentUpdate={setShouldUpdate}
                                                        />
                                                    ))
                                                    :
                                                    <div className="flex items-center justify-center h-64">
                                                        <p>No projects proposed  yet.</p>
                                                    </div>
                                            }
                                        </div>
                                }
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProjects;