import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AuthContext } from "@/context/AuthContext";
import { serverAxiosInstance } from "@/utilities/config";
import { Frown, Info, LinkIcon, Loader2, MailIcon, MapPin, MessageSquare, Users } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import Github from "@/assets/github.svg";
import LinkedIn from "@/assets/linkedin.svg";
import Twitter from "@/assets/twitter.svg";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import CustomTooltip from "@/components/custom/CustomTooltip";



const ViewUserProfile = () => {

  const { id } = useParams();

  const user = useContext(AuthContext).getCurrAuth();

  const [loading, setLoading] = useState(true);


  const [userProfileData, setUserProfileData] = useState({});
  const [userProjectData, setUserProjectData] = useState([]);
  const [userReviewData, setUserReviewData] = useState([]);
  const [performanceIndex, setPerformanceIndex] = useState(0);

  useEffect(() => {
    setLoading(true);

    const fetchUserProfile = (userId) => {

      serverAxiosInstance.get(`/user/view/${userId}`)
        .then((response) => {
          if (response.status === 200) {
            const userProfile = response.data?.userData?.currUser;
            const userProjects = response.data?.userData?.userProjects;
            const projectsOfUser = response.data?.userData?.projectsOfUser;
            const userReviews = response.data?.userData?.reviewsForUser;

            // console.log(response.data);

            setUserProfileData(userProfile);
            setUserProjectData([...userProjects, ...projectsOfUser]);
            setUserReviewData([...userReviews]);
            setPerformanceIndex(response.data?.userData?.performanceRating);
          }
        })
        .catch((error) => {
          toast.error("Error fetching user profile data.", {
            description: "Please try again later.",
            duration: 3000,
            style: {
              backgroundColor: "#f44336",
              color: "#fff",
            },
          });
          console.error("Error fetching user profile:", error);
        }).finally(() => {
          setLoading(false);
        });
    }

    if (Object.keys(user).length > 0) {
      fetchUserProfile(id);
    }
  }, [user, id]);

  return (
    <>
      {
        loading ? (
          <div className="h-[82vh] w-full flex justify-center items-center">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) :
          (
            <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center py-20 px-4 md:px-0">
              <Card className={"w-3/4 h-full"}>
                {/* coverImg */}
                <div className="relative h-48 md:h-64 lg:h-80 w-full overflow-hidden">
                  {/* {console.log("user: ", userProfileData, " projects: ", userProjectData, " reviews: ", userReviewData)} */}
                  <img src={userProfileData?.about?.coverImg} alt={"cover"} className="w-full h-full object-cover" />
                </div >
                {/* user's profile */}
                <div className="container mx-auto px-4 pb-12">

                  <div className="relative -mt-16 md:-mt-20 mb-8 ">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                      <Avatar className={"w-32 h-32 md:h-40 md:w-40 border-4 border-background rounded-full"} >
                        <AvatarImage src={userProfileData?.about?.profileImg} />
                        <AvatarFallback >
                          {userProfileData?.about?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 mt-4 md:mt-16">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <h1 className="text-3xl font-bold">{userProfileData?.about?.name}</h1>
                            <p className="text-xl text-muted-foreground">{userProfileData?.about?.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{userProfileData?.about?.location}</span>
                              {/* <span className="mx-1">•</span>
                              <Calendar className="h-4 w-4" />
                              <span>Joined {userProfileData?.about? .joinDate}</span> */}
                            </div>
                          </div>

                          {/* <div className="flex gap-2">
                            <Button>
                              <Users className="mr-2 h-4 w-4" />
                              Connect
                            </Button>
                            <Button variant="outline">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message
                            </Button>
                          </div> */}
                        </div>

                      </div>



                    </div>
                    <div className="md:ml-16 mt-4 mr-4 inline-flex items-center">
                      {/* <span className="text-sm text-muted-foreground hidden xs:inline-flex">
                        Appraisal :&nbsp;
                      </span> */}
                      <Badge variant={"secondary"} className="text-sm px-2 py-1">
                        {performanceIndex} / 10
                      </Badge>
                      <CustomTooltip tipContent={["Performance Index is calculated based on the reviews provided by other users that have worked with this user.", "Performance Index of 0 indicates that no reviews were provided yet"]} />
                    </div>

                  </div>


                  {/* Profile Body */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* left column containing about and expertise information */}
                    <div className="space-y-6">
                      <Card>
                        <CardHeader className="flex text-xl font-semibold">
                          About
                        </CardHeader>
                        <Separator className={"bg-gray-400"} />
                        <CardContent className="p-4">
                          <p className="text-sm text-wrap">
                            {userProfileData?.about?.bio}
                          </p>
                          <div className="flex flex-col gap-2 mt-4">

                            {
                              userProfileData?.links?.preferredEmail && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Link to={`mailto:${userProfileData?.links?.preferredEmail}`} target="_blank" className="flex flex-row gap-2 break-all items-center">
                                    <MailIcon className="h-4 w-4" />
                                    <span>{userProfileData?.links?.preferredEmail}</span>
                                  </Link>
                                </div>
                              )
                            }

                            {
                              userProfileData?.links?.github && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Link to={userProfileData?.links?.github} target="_blank" className="flex flex-row gap-2 break-all items-center">
                                    <img src={Github} alt="github" className="h-4 w-4" />
                                    <span>{userProfileData?.links?.github}</span>
                                  </Link>
                                </div>
                              )
                            }

                            {
                              userProfileData?.links?.linkedin && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Link to={userProfileData?.links?.linkedin} target="_blank" className="flex flex-row items-center gap-2 break-all">
                                    <img src={LinkedIn} alt="github" className="h-4 w-4" />
                                    <span>{userProfileData?.links?.linkedin}</span>
                                  </Link>
                                </div>
                              )
                            }
                            {
                              userProfileData?.links?.twitter && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Link to={userProfileData?.links?.twitter} target="_blank" className="flex flex-row gap-2 break-all items-center">
                                    <img src={Twitter} alt="github" className="h-4 w-4" />
                                    <span>{userProfileData?.links?.twitter}</span>
                                  </Link>
                                </div>
                              )
                            }

                            {
                              userProfileData?.links?.website && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Link to={userProfileData?.links?.website} target="_blank" className="flex flex-row gap-2 break-all items-center">
                                    <span>{userProfileData?.links?.website}</span>
                                  </Link>
                                </div>
                              )
                            }


                          </div>
                        </CardContent>

                      </Card>

                      <Card>
                        <CardHeader className={"flex text-xl font-semibold"}>
                          Skills
                        </CardHeader>
                        <Separator className={"bg-gray-300"} />
                        <CardContent className={"p-4 flex flex-row flex-wrap lg:flex-col gap-2"}>
                          {
                            userProfileData?.expertise?.skills?.map((skill, index) => (
                              <div key={index} className="flex items-center justify-between">
                                <Badge className="text-sm text-muted-foreground capitalize" variant="secondary">{skill?.name}&nbsp;&#8226;&nbsp;{skill?.proficiency}</Badge>
                              </div>
                            ))
                          }
                        </CardContent>
                      </Card>
                    </div>

                    {/* right column containing projects and reviews */}
                    <div className="space-y-6 lg:col-span-2">
                      <Card>
                        <CardHeader className="flex text-xl font-semibold">
                          Personal Projects
                        </CardHeader>
                        <Separator className={"bg-gray-400"} />
                        <CardContent className="p-4 flex flex-col gap-2">
                          {
                            userProfileData?.expertise?.personalProjects?.length > 0 ?
                              (
                                <div className="flex flex-col gap-2">
                                  {
                                    userProfileData?.expertise?.personalProjects?.map((project, index) => {
                                      return (
                                        <div key={index} className="flex flex-col justify-between border rounded-md p-4 hover:shadow-lg transition-all duration-200 ease-in-out gap-2">
                                          <div className="flex flex-col gap-1">
                                            <h3 className="text-md font-semibold">{project?.projectTitle}</h3>
                                            <p className="text-sm text-muted-foreground">{project?.projectDescription}</p>
                                            <Badge className="text-sm text-muted-foreground capitalize" variant="secondary">{project?.timeframe}</Badge>
                                          </div>
                                          {
                                            [project?.projectLinks]?.length > 0 &&
                                            <div className="flex flex-col gap-2">
                                              {
                                                project?.projectLinks?.map((link, index) => {
                                                  return (
                                                    <Link key={index} to={link} target="_blank" className="text-xs text-muted-foreground hover:text-primary transition-all duration-200 ease-in-out flex flex-row gap-2 items-center">
                                                      <LinkIcon className="h-4 w-4" />
                                                      <p className="text-wrap break-all ">{link}</p>
                                                    </Link>
                                                  )
                                                })
                                              }
                                            </div>
                                          }

                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              )
                              :
                              (
                                <div className="flex items-center justify-center text-muted-foreground gap-2">
                                  <Frown className="h-4 w-4" />
                                  <span className="text-sm">No projects found.</span>
                                </div>
                              )
                          }
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="flex text-xl font-semibold">
                          Team Projects
                        </CardHeader>
                        <Separator className={"bg-gray-300"} />
                        <CardContent className="p-4 flex flex-col gap-2">
                          {
                            userProjectData?.length > 0 ?
                              (
                                <div className="flex flex-col gap-2">
                                  {
                                    userProjectData?.map((project, index) => {
                                      return (
                                        <div key={index} className="flex flex-col justify-between border rounded-md p-4 hover:shadow-lg transition-all duration-200 ease-in-out gap-2">
                                          <div className="flex flex-col gap-1">
                                            <h3 className="text-md font-semibold">{project?.projectTitle}</h3>
                                            <p className="text-sm text-muted-foreground line-clamp-3">{project?.projectDescription}</p>
                                            <Badge className="text-sm text-muted-foreground capitalize" variant="secondary">{project?.timeCommitment}</Badge>
                                          </div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                              )
                              :
                              (
                                <div className="flex items-center justify-center text-muted-foreground gap-2">
                                  <Frown className="h-4 w-4" />
                                  <span className="text-sm">No projects found.</span>
                                </div>
                              )
                          }
                        </CardContent>
                      </Card>


                      <Card>
                        <CardHeader className="flex text-xl font-semibold">
                          Reviews
                        </CardHeader>
                        <Separator className={"bg-gray-300"} />
                        <CardContent className="p-4 flex flex-col gap-2">

                          {
                            (userReviewData?.length > 0) ?
                              (
                                userReviewData[0]?.extraRemarks !== null ?
                                  <div className="flex flex-col gap-2">
                                    {
                                      userReviewData[0]?.extraRemarks
                                    }
                                  </div>
                                  :
                                  <div className="flex flex-col gap-2">
                                    {userReviewData.map((review, index) => {
                                      return (
                                        <div className="flex flex-col justify-between border rounded-md p-4 hover:shadow-lg transition-all duration-200 ease-in-out gap-2" key={index}>
                                          <div className="flex flex-col sm:flex-row gap-1 sm:justify-between">
                                            <h3 className="text-md font-semibold">{review?.forProject?.projectTitle}</h3>
                                            <Badge className="text-sm text-muted-foreground capitalize" variant="secondary">
                                              {
                                                review?.rating < 5 ? "Negative" :
                                                  review?.rating > 5 ? "Positive" : "Excellent"
                                              }
                                            </Badge>
                                          </div>
                                          <p className="text-sm text-muted-foreground">{review?.review}</p>
                                          <Badge className="text-sm text-muted-foreground capitalize" variant="secondary">{review?.rating} / 10</Badge>
                                        </div>
                                      )
                                    })}
                                  </div>
                              )
                              :
                              (
                                <div className="flex items-center justify-center text-muted-foreground gap-2">
                                  <Frown className="h-4 w-4" />
                                  <span className="text-sm">No reviews yet.</span>
                                </div>
                              )
                          }
                        </CardContent>
                      </Card>


                    </div>

                  </div>

                </div>



              </Card >

            </div >
          )
      }
    </>
  )
}

export default ViewUserProfile