import AboutSection from "@/components/custom/AboutSection"
import LinksContacts from "@/components/custom/LinksContacts"
import SkillsSection from "@/components/custom/SkillsSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { AuthContext } from "@/context/AuthContext"
import { serverAxiosInstance } from "@/utilities/config"
import { TabsList } from "@radix-ui/react-tabs"
import { useContext, useState } from "react"
import { toast } from "sonner"
import { ContactIcon, FolderOpenDotIcon, UserRoundPenIcon } from "lucide-react"



// This component is used to display the user profile page where the user can edit their profile information, skills, and contact details.
// It uses the AuthContext to get the current user authentication details and allows the user to update their profile information through various sections.
// The component consists of a tabbed interface where each tab represents a different section of the profile that can be edited.

// TODO: Add a loading state while the profile is being updated


const UserProfile = () => {

    const { getCurrAuth, setCurrAuth } = useContext(AuthContext);

    const user = getCurrAuth();

    const [currTab, setCurrTab] = useState("contact")

    const [isSkillsEditable, setIsSkillsEditable] = useState(false)
    const [isContactEditable, setIsContactEditable] = useState(false);


    const tabs = [
        {
            name: "About",
            value: "about",
            icon: <UserRoundPenIcon />,
        },
        {
            name: "Skills & Projects",
            value: "skills",
            icon: <FolderOpenDotIcon />,
        },
        {
            name: "Contact & Links",
            value: "contact",
            icon: <ContactIcon />,
        },
    ]

    const handleSubmit = async (data) => {
        // Handle form submission logic here
        // You can access the form data using e.target.elements
        // and send it to your backend API for processing
        let result = false;
        const body = {
            id: user?.id || user?._id,
            dataToUpdate: data
        }

        console.log("Form submitted:", body, user);


        await serverAxiosInstance.put("/user/profile", body)
            .then((res) => {
                if (res.status === 200) {
                    toast.success("Profile updated successfully!", {
                        description: "Your profile has been updated.",
                        duration: 3000,
                    });
                    const updatedUser = res.data.updatedUser;
                    setCurrAuth(updatedUser);
                }
                result = true;
            })
            .catch((err) => {
                toast.error("Error updating profile!", {
                    description: err.response.data.message,
                    duration: 3000,
                });
            });

        return result;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="flex flex-col space-y-8">
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl font-bold">Edit Profile</h1>
                    <p className="text-muted-foreground">Update your profile information.</p>
                </div>
                <Tabs defaultValue="about" value={currTab} onValueChange={setCurrTab} className={"space-y-6"}>
                    <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-4 p-2">
                        {tabs.map((tab) => (
                            <TabsTrigger key={tab.value} value={tab.value} className="text-lg cursor-pointer bg-foreground/10 font-semibold text-center p-4 hover:bg-gray-200 rounded-md flex flex-row items-center justify-center">
                                {tab.icon}
                                <span className="inline-block ml-2">
                                    {tab.name}
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="about" className={"space-y-6"}>
                        <AboutSection userAboutData={user} submitChanges={handleSubmit} />
                    </TabsContent>
                    <TabsContent value="skills" className={"space-y-6"}>
                        <SkillsSection userSkillsData={user?.expertise} submitChanges={handleSubmit} />
                    </TabsContent>
                    <TabsContent value="contact" className={"space-y-6"}>
                        <LinksContacts userLinksData={user?.links} submitChanges={handleSubmit} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


export default UserProfile