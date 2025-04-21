
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { Check, Edit, Globe, Info, Mail, Plus, Save, Trash } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Github from '@/assets/github.svg';
import Linkedin from '@/assets/linkedin.svg';
import Twitter from '@/assets/twitter.svg';
import { set } from 'zod';
import { toast } from 'sonner';


const SocialExtraLink = ({ id, value, name, type, onChange, placeholder, isDisabled, icon = null, IconJSX, isRequired, handleRemove }) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className={"capitalize"}>{name}{isRequired && <span className="w-fit">*</span>}</Label>
            <div className="flex items-center gap-2">
                {icon ? <img src={icon} alt={name} className="h-4 w-4 text-muted-foreground" /> : IconJSX}
                <Input
                    id={id}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={isDisabled}
                />
                {
                    (!isDisabled && name?.startsWith("ExtraLink-")) ?
                        (
                            <Button type="button" variant="destructive" onClick={handleRemove}>
                                <Trash className="h-4 w-4" />
                            </Button>
                        )
                        :
                        null
                }
            </div>
        </div>
    )
}



const LinksContacts = ({ userLinksData, submitChanges }) => {


    const [isDisabled, setIsDisabled] = useState(true);

    console

    const [preferredEmail, setPreferredEmail] = useState(userLinksData?.preferredEmail || "");
    const [website, setWebsite] = useState(userLinksData?.website || "");
    const [github, setGithub] = useState(userLinksData?.github || "");
    const [linkedin, setLinkedin] = useState(userLinksData?.linkedin || "");
    const [twitter, setTwitter] = useState(userLinksData?.twitter || "");

    const [otherLinks, setOtherLinks] = useState(userLinksData?.extraLinks || []);

    const requiredFields = [preferredEmail, github, linkedin]


    const handleAddLink = () => {
        setOtherLinks((prev) => [...prev, { linkTo: "", linkOf: "" }]);
    }

    const handleRemoveLink = (index) => {
        setOtherLinks((prev) => prev.filter((_, i) => i !== index));
        setOtherLinks((prev) => {
            const updatedLinks = [...prev];
            updatedLinks?.map((link, index) => {
                link.linkOf = `ExtraLink-${index + 1}`;
            })
            return updatedLinks;
        });
    }

    const handleProfileChange = (e) => {

        e.preventDefault();
        setIsDisabled(true);
        requiredFields.forEach((field) => {
            if (!field) {
                toast.error("Please fill all the required fields", {
                    description: "Required fields are marked with * symbol",
                    duration: 3000,
                });
                return;
            }
        });

        const links = {
            preferredEmail: preferredEmail,
            website: website,
            github: github,
            linkedin: linkedin,
            twitter: twitter,
            extraLinks: otherLinks
        }

        console.log("Data to update:", links);
        submitChanges({ links });
    }


    return (
        <div className="w-full">
            <Card>
                <CardHeader className={"mb-2"}>
                    <div className='flex items-center justify-between'>
                        <CardTitle>Contact Information</CardTitle>
                        <Button type="button" variant={isDisabled ? "outline" : "secondary"} className="mt-2" onClick={() => { if (isDisabled) setIsDisabled(false); else return; }}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Button>
                    </div>
                    <CardDescription>Manage your contact details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <SocialExtraLink
                                id="email"
                                name="email"
                                value={preferredEmail}
                                onChange={e => setPreferredEmail(e.target.value)}
                                placeholder="Enter your preferred email address for contact"
                                isDisabled={isDisabled}
                                IconJSX={<Mail className="h-4 w-4 text-muted-foreground" />}
                                isRequired={true}
                            />
                            <p className="text-xs text-muted-foreground flex items-center">
                                <Info className="inline mr-1" size={16} />
                                This email will be visible to other users and can be used for contact purposes.
                            </p>
                        </div>

                        <SocialExtraLink
                            id="website"
                            name="website"
                            value={website}
                            onChange={e => setWebsite(e.target.value)}
                            placeholder="Enter your personal website URL"
                            isDisabled={isDisabled}
                            IconJSX={<Globe className="h-4 w-4 text-muted-foreground" />}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Social Links</CardTitle>
                    <CardDescription>Connect your social media accounts</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <SocialExtraLink
                            id="github"
                            name="github"
                            value={github}
                            onChange={e => setGithub(e.target.value)}
                            placeholder="github.com/username"
                            isDisabled={isDisabled}
                            icon={Github}
                            isRequired={true}
                        />

                        <SocialExtraLink
                            id="linkedin"
                            name="linkedin"
                            value={linkedin}
                            onChange={e => setLinkedin(e.target.value)}
                            placeholder="linkedin.com/in/username"
                            isDisabled={isDisabled}
                            icon={Linkedin}
                            isRequired={true}
                        />
                        <SocialExtraLink
                            id="twitter"
                            name="twitter"
                            value={twitter}
                            onChange={e => setTwitter(e.target.value)}
                            placeholder="twitter.com/username"
                            isDisabled={isDisabled}
                            icon={Twitter}
                        />

                        {otherLinks.length > 0 &&
                            (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">Other Links</h3>
                                    <p className="text-xs text-muted-foreground flex items-center">
                                        <Info className="inline mr-1" size={16} />
                                        You can add any other social links here. Please make sure to include the full URL.
                                    </p>

                                    {otherLinks.map((link, index) => (
                                        <div key={index} className="flex flex-row gap-2 items-center">
                                            <SocialExtraLink
                                                id={`otherLink-${index}`}
                                                name={`ExtraLink-${index + 1}`}
                                                value={otherLinks[index].linkTo}
                                                onChange={e => {
                                                    const updatedLinks = [...otherLinks];
                                                    updatedLinks[index].linkTo = e.target.value;
                                                    updatedLinks[index].linkOf = e.target.name;
                                                    setOtherLinks(updatedLinks);
                                                }
                                                }
                                                placeholder="Enter your other social link"
                                                isDisabled={isDisabled}
                                                handleRemove={() => handleRemoveLink(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )
                        }

                        <div>
                            <div>

                                <Button variant={isDisabled ? "outline" : "secondary"} className="my-2" onClick={handleAddLink} disabled={isDisabled}>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add More Social Links
                                </Button>
                                <p className="text-xs text-muted-foreground flex items-center -ml-2">
                                    <Info className="inline mr-1" size={16} />
                                    You can add any other social links here. Please make sure to include the full URL.
                                </p>
                            </div>
                            <div className='flex flex-row items-center justify-end'>
                                <Button
                                    disabled={isDisabled} className="mt-2"
                                    onClick={handleProfileChange}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Apply Changes
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
export default LinksContacts;