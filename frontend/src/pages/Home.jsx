import { Button } from "@/components/ui/button"
import { ArrowRight, Code, MessageSquare, Users, Zap } from "lucide-react"
import landing from '@/assets/landing.svg'
// import github from '@/assets/github.svg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { toast } from "sonner";

const Home = () => {

  const { getCurrAuth } = useContext(AuthContext);
  const currAuth = getCurrAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(currAuth).length > 0) {
      if (!currAuth?.about) {
        toast.error("Incomplete profile.", {
          description: "Please complete your profile to access all features.",
          duration: 3000,
        });
        navigate("/user/profile");
      }
    }
  }, [currAuth, navigate]);


  return (
    <div className="min-h-[90dvh] w-full flex flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                    Connect, Collaborate, and Code with Fellow Tech Enthusiasts
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join a vibrant community of developers, designers, and tech profesionals. Share ideas, find
                    collaborators, and build your next big project together.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" variant="default" className={" sm:w-1/2 md:w-full"}>
                    <Link to="/signup" className="w-full flex items-center justify-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="inline-block h-8 w-8 rounded-full bg-muted overflow-hidden border-2 border-background"
                      >
                        <img
                          src={`/placeholder.svg?height=32&width=32&text=${i}`}
                          alt={`User ${i}`}
                          width={32}
                          height={32}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground">
                    Join <span className="font-medium text-foreground">2,000+</span> tech professionals
                  </div>
                </div>
              </div>
              {/* TODO: Add suitable image for this project */}
              <div className="flex items-center justify-center">
                <img src={landing} alt="" />
              </div>
            </div>
          </div>

        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need to Connect</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to share your work, find collaborators, and grow your
                  network in the tech community.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Tech Discussions</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Engage in meaningful conversations about the latest technologies, frameworks, and industry trends.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Share Your Projects</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Showcase your work with rich code snippets, demos, and detailed descriptions to get feedback.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Skill Matching</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Our intelligent algorithm connects you with people who complement your skill set.
                  </p>
                </div>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Find Collaborators</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Connect with like-minded professionals for your next project or startup idea.
                  </p>
                </div>
                {/* <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">Private Messaging</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Discuss collaboration details privately with secure, end-to-end encrypted messaging.
                  </p>
                </div> */}
                {/* <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <img src={github} className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-bold">GitHub Integration</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Seamlessly connect your GitHub repositories to showcase your contributions and projects.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </section>



        <section id="community" className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Community
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Join a Thriving Tech Ecosystem</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform brings together diverse tech professionals from around the world.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Developers</h3>
                <p className="text-center text-muted-foreground">
                  From frontend wizards to backend gurus, connect with coders who share your passion.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Designers</h3>
                <p className="text-center text-muted-foreground">
                  UI/UX designers, graphic artists, and creative minds bringing ideas to life.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Entrepreneurs</h3>
                <p className="text-center text-muted-foreground">
                  Startup founders and product managers looking for technical co-founders and team members.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our platform.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                </TabsList>
                <TabsContent value="general" className="mt-6 space-y-4">
                  {[
                    {
                      question: "What is Talent & Skills Alliance?",
                      answer:
                        "Talent & Skills Alliance is a social platform designed specifically for tech professionals looking to build innovative applications, providing them with the facility to share ideas, showcase projects, and find collaborators for new projects all at the same place.",
                    },
                    {
                      question: "Who can join Talent & Skills Alliance?",
                      answer:
                        "Our platform is open to all tech professionals, including developers, designers, product managers, and entrepreneurs interested in technology and collaboration. Whether you are an experienced professional or a budding talent looking to learn while gaining hands-on experience, you are welcome to join.",
                    },
                    {
                      question: "How do I get started?",
                      answer:
                        "Simply head to the Login page or create a new account, complete your profile with your skills and interests, and start exploring the community. You may then share your ideas or projects, look for team members at your own pace.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">{item.question}</h3>
                      <p className="mt-2 text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="features" className="mt-6 space-y-4">
                  {[
                    {
                      question: "How do I find collaborators?",
                      answer:
                        "You can browse through the community and go through the posts available to you. You can also post your project ideas and invite others to collaborate. The process is simple, simple generate a new alert and interested users may apply to join your project. You can then review their profiles and decide who to collaborate with.",
                    },
                    {
                      question: "How does the collaboration matching work?",
                      answer:
                        "Our algorithm analyzes your skills, interests, and project history to suggest potential collaborators who complement your expertise or share similar interests.",
                    },
                    {
                      question: "Is there a mobile app?",
                      answer:
                        "We currently offer a responsive web application that works well on mobile devices. A native mobile app is currently on our To Do list, and we will keep you updated on its progress.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="rounded-lg border p-4">
                      <h3 className="text-lg font-medium">{item.question}</h3>
                      <p className="mt-2 text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>



      </main>
    </div>
  )
}

export default Home