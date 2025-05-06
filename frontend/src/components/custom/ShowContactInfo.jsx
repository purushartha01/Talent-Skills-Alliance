
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Check, CopyCheckIcon, CopyIcon, MailSearch } from 'lucide-react';
import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthContext } from '@/context/AuthContext';


const ShowContactInfo = ({ user }) => {

    const [open, setOpen] = useState(false)
    const [isCopied, setIsCopied] = useState(false)
    console.log("User: ", user)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-gray-500 hover:bg-gray-100"
                    onClick={() => setOpen(true)}
                >
                    <span className=''>
                        <MailSearch className="h-4 w-4" />
                    </span>
                    <span className='hidden sm:inline-flex'>
                        Get in Touch
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Contact Information</DialogTitle>
                </DialogHeader>
                <DialogDescription className={"flex flex-col gap-2"}>
                    <div className='flex flex-row items-center gap-1'>
                        The contact information of
                        <span className='font-semibold text-gray-800 capitalize'>
                            {user?.about?.name}
                        </span>
                        is as follows:
                    </div>
                    <div className='flex flex-row items-center justify-between gap-1'>
                        <div className='flex gap-2'>
                            Email:
                            <span className='text-foreground font-semibold'>
                                {user?.email}
                            </span>
                        </div>
                        <div className='flex gap-2'>
                            <Button variant="outline" size="icon" onClick={(e) => {
                                e.preventDefault();
                                navigator.clipboard.writeText(user?.email);
                                setIsCopied(true);
                                setTimeout(() => {
                                    setIsCopied(false);
                                }, 1000);
                            }}
                                title={isCopied ? "Copied" : "Copy Email"}
                            >
                                {
                                    isCopied ?
                                        <Check className='h-4 w-4 text-green-600' />
                                        :
                                        <CopyIcon className='h-4 w-4' />
                                }
                            </Button>
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ShowContactInfo