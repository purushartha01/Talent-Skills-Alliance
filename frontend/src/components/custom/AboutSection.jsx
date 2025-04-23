import { forwardRef, useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { AuthContext } from "@/context/AuthContext";
import { Edit, ImageIcon, Info, Loader, Loader2, LoaderPinwheelIcon, MapPin, Save, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Textarea } from '@/components/ui/textarea';
import { IKImage, IKUpload } from "imagekitio-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { getUploadedImageUrl } from "@/utilities/authenticator";
import { set } from "zod";

// const ConfirmationDialog = forwardRef(({ setIsConfirmed }, modalRef) => {
//     const [isOpen, setIsOpen] = useState(false);
//     useImperativeHandle(modalRef, () => ({
//         openDialog: () => setIsOpen(true),
//         closeDialog: () => setIsOpen(false),
//     }));
//     return (
//         <Dialog open={isOpen} onOpenChange={setIsOpen}>
//             <DialogTrigger asChild>
//                 <Button variant="outline" ref={modalRef} className="hidden" onClick={() => setIsOpen(true)}>
//                     Open Dialog
//                 </Button>
//             </DialogTrigger>
//             <DialogContent ref={modalRef}>
//                 <DialogTitle className="text-center text-2xl font-bold">
//                     Confirm Changes
//                 </DialogTitle>
//                 <DialogDescription className="text-center text-lg font-semibold">
//                     Are you sure you want to save the changes?
//                 </DialogDescription>
//                 <div className="flex justify-center mt-4">
//                     <Button
//                         variant="outline"
//                         className="mr-2"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             setIsOpen(false);
//                         }}
//                     >
//                         Cancel
//                     </Button>
//                     <Button
//                         variant="default"
//                         onClick={(e) => {
//                             e.preventDefault();
//                             setIsConfirmed(true);
//                             setIsOpen(false);
//                         }}
//                     >
//                         Confirm
//                     </Button>
//                 </div>
//             </DialogContent>
//         </Dialog>
//     );
// });
// ConfirmationDialog.displayName = "ConfirmationDialog";


const AboutSection = ({ userAboutData, submitChanges }) => {

    // TODO: Make sure to change disabled state to true
    const [isSectionDisabled, setIsSectionDisabled] = useState(true);


    // const { modalRef } = useRef(null);
    // const [isImgConfirmed, setIsImgConfirmed] = useState(false);

    // States for cover images
    const [coverImgPreview, setCoverImgPreview] = useState(userAboutData?.about?.coverImg || "https://www.cloud10.it/wp-content/uploads/2022/01/placeholder-768x512.png");
    const [coverFileName, setCoverFileName] = useState(userAboutData?.about?.coverImg || "https://www.cloud10.it/wp-content/uploads/2022/01/placeholder-768x512.png");
    const coverImgRef = useRef(null);
    const [isCoverLoading, setIsCoverLoading] = useState(false);

    const handleCoverImgChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setIsCoverLoading(true);
        setIsSectionDisabled(true);
        const fileUrl = await getUploadedImageUrl(file, `${userAboutData?.id}_cover`)
        setCoverImgPreview(fileUrl);
        setCoverFileName(fileUrl);
        setIsCoverLoading(false);
        setIsSectionDisabled(false);
    }

    //State for profile image
    const [profileImgPreview, setProfileImgPreview] = useState(userAboutData?.about?.profileImg || "https://cdn.vectorstock.com/i/2000v/28/66/profile-placeholder-image-gray-silhouette-vector-21542866.avif");
    const [profileFile, setProfileFile] = useState(userAboutData?.about?.profileImg || "https://cdn.vectorstock.com/i/2000v/28/66/profile-placeholder-image-gray-silhouette-vector-21542866.avif");
    const [isProfileLoading, setIsProfileLoading] = useState(false);
    const profileImgRef = useRef(null);

    const handleProfileImgChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setIsProfileLoading(true);
        setIsSectionDisabled(true);
        const fileUrl = await getUploadedImageUrl(file, `${userAboutData?.id}_profile`)
        setProfileImgPreview(fileUrl);
        setProfileFile(fileUrl);
        setIsProfileLoading(false);
        setIsSectionDisabled(false);
    }

    // States for user personal information
    const [fullName, setFullName] = useState(userAboutData?.about?.name || "");
    const [professionalTitle, setProfessionalTitle] = useState(userAboutData?.about?.title || "");
    const [location, setLocation] = useState(userAboutData?.about?.location || "");
    const [bio, setBio] = useState(userAboutData?.about?.bio || "");

    //state for showing loader while saving changes
    const [isSaving, setIsSaving] = useState(false);


    // handles the submission of changed data to the server
    const handleProfileSave = async () => {
        // Save profile changes logic here

        setIsSaving(true);
        setIsSectionDisabled(true);
        const about = {
            name: fullName,
            location: location,
            bio: bio,
            coverImg: coverFileName,
            profileImg: profileFile,
            title: professionalTitle,
        };

        console.log("About data: ", about);

        if (Object.keys(about).some((key) => about[key] === "")) {
            toast.error("Please fill all the fields.)", {
                description: "All fields marked with * are required.",
                duration: 3000,
            });
            setIsSaving(false);
            setIsSectionDisabled(false);
            return false;
        }


        about.title = professionalTitle;

        await submitChanges({ about });

        setIsSectionDisabled(true);
        setIsSaving(false);
    }

    return (
        <div className="w-full">
            <Card className={"bg-gray-100 mb-4"}>
                <CardHeader className={"flex flex-col justify-between p-4 rounded-t-md"}>
                    <div className="w-full flex flex-row items-center justify-between">
                        <CardTitle>About</CardTitle>
                        <Button variant="outline" className="text-sm" onClick={(e) => { e.preventDefault; if (isSectionDisabled) setIsSectionDisabled(false); else return; }}>
                            <Edit size={16} className="md:mr-1" />
                            <span className="hidden md:inline">Edit</span>
                        </Button >
                    </div>
                    <CardDescription>
                        In this section, you can write about yourself so as to introduce yourself to other users.
                    </CardDescription>
                </CardHeader>
                <CardContent className={"space-y-6"}>
                    {/* TODO: Make sure to upload file to the imagekit site when saving changes */}
                    <div className="space-y-2">
                        <Label>
                            Cover Image*
                        </Label>
                        <div className="relative h-48 w-full overflow-hidden rounded-lg border border-gray-300">
                            <img
                                src={coverImgPreview}
                                alt="Cover Image"
                                className="h-full w-full"
                            />
                            <Input type="file"
                                className="hidden"
                                ref={coverImgRef}
                                accept="image/*"
                                onChange={handleCoverImgChange}
                            />
                            {isCoverLoading && <Loader size={24} className="absolute text-red-600 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 animate-spin" />}
                            <Button size={"sm"} disabled={isSectionDisabled} className={"absolute bottom-2 right-2 cursor-pointer"} onClick={e => { e.preventDefault(); coverImgRef.current?.click() }}>
                                <ImageIcon className="mr-2 h-4 w-4" />
                                Change Cover
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Profile Picture*</Label>
                        <div className="flex items-center gap-4">
                            <div className="relative flex items-center justify-center rounded-full border border-gray-300">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage
                                        src={profileImgPreview}
                                        alt={userAboutData?.username}
                                    />
                                    <Input type="file"
                                        className="hidden"
                                        ref={profileImgRef}
                                        accept=".jpg,.jpeg,.png,.webp"
                                        onChange={handleProfileImgChange}
                                    />
                                    <AvatarFallback className="text-2xl">
                                        {userAboutData?.username
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                {isProfileLoading && <Loader size={24} className="absolute z-10 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 animate-spin text-red-500" />}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                                    onClick={(e) => { e.preventDefault(); profileImgRef.current?.click() }}
                                    disabled={isSectionDisabled}
                                >
                                    <Upload className="h-4 w-4" />
                                    <span className="sr-only">Upload avatar</span>
                                </Button>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                <p>Upload a square image, at least 400x400px.</p>
                                <p>JPG, JPEG, PNG or WEBP. Max size 5MB.</p>
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
                                <Label htmlFor="name">Full Name*</Label>
                                <Input id="name" name="name"
                                    disabled={isSectionDisabled}
                                    value={fullName} onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username"
                                    disabled
                                    value={userAboutData?.username}
                                />
                                <p className="text-xs text-muted-foreground">
                                    <Info className="h-4 w-4 inline-block mr-1" /> To change your username, please head over to Settings.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Email</Label>
                                <Input id="email" name="email"
                                    disabled
                                    value={userAboutData?.email}
                                // value={profile.username} onChange={handleProfileChange}
                                />

                                <p className="text-xs text-muted-foreground">
                                    <Info className="h-4 w-4 inline-block mr-1" /> This is your registered email address. It cannot be changed.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="title">Professional Title*</Label>
                                <Input id="title" name="title"
                                    placeholder="e.g. Student, Software Engineer, Data Scientist, etc."
                                    disabled={isSectionDisabled}
                                    value={professionalTitle} onChange={(e) => setProfessionalTitle(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location">Location*</Label>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <Input id="location" name="location"
                                        disabled={isSectionDisabled}
                                        value={location} onChange={(e) => setLocation(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio*</Label>
                                <Textarea
                                    id="bio"
                                    name="bio"
                                    rows={8}
                                    disabled={isSectionDisabled}
                                    value={bio} onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell others about yourself, your experience, and what you're interested in."
                                />
                                <p className="text-xs text-muted-foreground">{userAboutData?.bio?.length || 0}/500 characters</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <div className="flex justify-end mr-4">
                    <Button
                        variant={isSectionDisabled ? "outline" : "default"}
                        className="text-sm"
                        disabled={isSectionDisabled ? true : (isSaving)}
                        onClick={handleProfileSave}
                    // onClick={saveProfileChanges}
                    >{isSaving ?
                        <span className="flex flex-row items-center gap-1">
                            <Loader2 className="rotate-180 animate-spin" />
                            Saving...
                        </span>
                        :
                        <span className="flex flex-row items-center">
                            <Save className="mr-2 h-4 w-4 " />
                            Save Changes
                        </span>
                        }
                    </Button>
                </div>
            </Card>
            {/* <ConfirmationDialog setIsConfirmed={setIsImgConfirmed} modalRef={modalRef} /> */}
        </div>
    )
}

export default AboutSection