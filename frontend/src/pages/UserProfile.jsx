import AboutSection from "@/components/custom/AboutSection"
import LinksContacts from "@/components/custom/LinksContacts"
import SkillsSection from "@/components/custom/SkillsSection"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@radix-ui/react-tabs"
import { useState } from "react"

const UserProfile = () => {

    const [currTab, setCurrTab] = useState("about")

    const [isSkillsEditable, setIsSkillsEditable] = useState(false)
    const [isContactEditable, setIsContactEditable] = useState(false);

    const tabs = [
        {
            name: "About",
            value: "about",
        },
        {
            name: "Skills",
            value: "skills",
        },
        {
            name: "Contact & Links",
            value: "contact",
        },
    ]

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
                            <TabsTrigger key={tab.value} value={tab.value} className="text-lg cursor-pointer bg-foreground/10 font-semibold text-center p-4 hover:bg-gray-200 rounded-md">
                                {tab.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="about" className={"space-y-6"}>
                        <AboutSection />
                    </TabsContent>
                    <TabsContent value="skills" className={"space-y-6"}>
                        <SkillsSection />
                    </TabsContent>
                    <TabsContent value="contact" className={"space-y-6"}>
                        <LinksContacts />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


export default UserProfile