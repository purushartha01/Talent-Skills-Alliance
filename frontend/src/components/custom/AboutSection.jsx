import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { AuthContext } from "@/context/AuthContext";
import { ImageIcon, MapPin, Save, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Textarea } from '@/components/ui/textarea';

const AboutSection = () => {
    const [isAboutEditable, setIsAboutEditable] = useState(false)

    const user = useContext(AuthContext).getCurrAuth();

    console.log(user)
    return (
        <div className="w-full">
            <Card className={" bg-gray-100"}>
                <CardHeader className={"flex flex-col justify-between p-4 rounded-t-md"}>
                    <div className="w-full flex flex-row items-center justify-between">
                        <h2 className="text-2xl font-semibold">About</h2>
                        <Button variant="outline" className="text-sm" onClick={(e) => { e.preventDefault; if (!isAboutEditable) setIsAboutEditable(true); else return; }}>Edit</Button >
                    </div>
                    <CardDescription>
                        In this section, you can write about yourself so as to introduce yourself to other users.
                    </CardDescription>
                </CardHeader>
                <CardContent className={"space-y-6"}>
                    <div className="space-y-2">
                        <Label>
                            Cover Image
                        </Label>
                        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-300">
                            <img
                                src={user?.coverImg || "https://www.cloud10.it/wp-content/uploads/2022/01/placeholder-768x512.png"}
                                alt="Cover Image"
                                className="h-full w-full"
                            />
                            <Button size={"sm"} className={"absolute bottom-2 right-2 cursor-pointer"} onClick={() => { }}>
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Change Cover
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Profile Picture</Label>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={user?.userImg || "https://cdn.vectorstock.com/i/2000v/28/66/profile-placeholder-image-gray-silhouette-vector-21542866.avif"} alt={user?.username} />
                                    <AvatarFallback className="text-2xl">
                                        {user?.username
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                                >
                                    <Upload className="h-4 w-4" />
                                    <span className="sr-only">Upload avatar</span>
                                </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p>Upload a square image, at least 400x400px.</p>
                                <p>JPG, PNG or GIF. Max size 2MB.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your basic profile information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" name="name"
                                // value={profile.name} onChange={handleProfileChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username"
                                // value={profile.username} onChange={handleProfileChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Professional Title</Label>
                                <Input id="title" name="title"
                                // value={profile.title} onChange={handleProfileChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <Input id="location" name="location"
                                    // value={profile.location} onChange={handleProfileChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    rows={8}
                                    // value={profile.bio}
                                    // onChange={handleProfileChange}
                                    placeholder="Tell others about yourself, your experience, and what you're interested in."
                                />
                                <p className="text-xs text-muted-foreground">{user?.bio?.length}/500 characters</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="flex justify-end mr-4">
                    <Button
                        // onClick={saveProfileChanges}
                    >
                        <Save className="mr-2 h-4 w-4 " />
                        Save Changes
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default AboutSection