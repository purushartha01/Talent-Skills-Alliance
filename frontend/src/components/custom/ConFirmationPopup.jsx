import { Dialog, DialogTrigger } from "../ui/dialog"
import { Button } from '@/components/ui/button';
import { DialogDescription, DialogTitle, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { set } from "date-fns";
import { useState } from "react";

const ConFirmationPopup = ({ triggerTxt, triggerClass, Icon, description, onConfirm, disabled=false }) => {
    const [open, setOpen] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const handleConfirm = (e) => {
        setIsLoading(true)
        console.log("Confirmed")
        onConfirm(e)
        setIsLoading(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} portal={false}>
            <DialogTrigger asChild>
                <Button
                    variant={"outline"}
                    size="sm"
                    className={`${triggerClass}`}
                    onClick={() => setOpen(true)}
                    disabled={isLoading || disabled}
                >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline-flex">
                        {triggerTxt}
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold flex items-center gap-2">
                        Confirm your choice
                    </DialogTitle>
                    <DialogDescription className={"text-md font-semibold"}>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end space-x-2 pt-6">
                    <Button variant="destructive" onClick={() => setOpen(false)} disabled={isLoading}>
                        Not Sure
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className={`text-green-500 hover:bg-green-600 hover:text-white`}
                    >
                        Proceed
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ConFirmationPopup