import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"

const CustomTooltip = (props) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger type="button" asChild className={"cursor-pointer flex items-center justify-center"}>
                    <Button variant={"ghost"} tabIndex={"0"}>
                        <Info className="text-gray-500" size={16} />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top" avoidCollisions={true} className={"backdrop-blur-lg supports-[backdrop-filter]:bg-background/65 [&>span]:hidden"}>
                    <div className="text-sm font-medium text-foreground/70">
                        <ul type="none" className="list-disc list-inside">
                            {props.tipContent.map((content, index) => (
                                <li key={index} className="max-w-[80vw] h-fit break-words whitespace-normal overflow-visible">{content}</li>
                            ))}
                        </ul>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default CustomTooltip