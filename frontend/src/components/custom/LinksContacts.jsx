
import { Card, CardTitle, CardHeader, CardDescription, CardContent } from '@/components/ui/card';
import { Github, Globe, Linkedin, Mail, Plus, Twitter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
const LinksContacts = () => {
    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Manage your contact details</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                // value={profile.email}
                                // onChange={handleProfileChange}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Your email will be visible to others.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="website">Personal Website</Label>
                            <div className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="website"
                                    name="website"
                                    // value={profile.website}
                                // onChange={handleProfileChange}
                                // placeholder="https://yourwebsite.com"
                                />
                            </div>
                        </div>
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
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub</Label>
                            <div className="flex items-center gap-2">
                                <Github className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="github"
                                    name="github"
                                    // value={profile.github}
                                    // onChange={handleProfileChange}
                                    placeholder="github.com/username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="linkedin">LinkedIn</Label>
                            <div className="flex items-center gap-2">
                                <Linkedin className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="linkedin"
                                    name="linkedin"
                                    // value={profile.linkedin}
                                    // onChange={handleProfileChange}
                                    placeholder="linkedin.com/in/username"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <div className="flex items-center gap-2">
                                <Twitter className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="twitter"
                                    name="twitter"
                                    // value={profile.twitter}
                                    // onChange={handleProfileChange}
                                    placeholder="twitter.com/username"
                                />
                            </div>
                        </div>

                        <Button variant="outline" className="mt-2">
                            <Plus className="mr-2 h-4 w-4" />
                            Add More Social Links
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default LinksContacts