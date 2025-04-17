import { Code} from "lucide-react"

const Footer = () => {
  return (
    <footer className="w-full border-t bg-background py-6">
        <div className="w-full flex flex-col items-center justify-between gap-4 md:flex-row px-8">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            <span className="text-lg font-bold">Talent & Skills Alliance</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Talent & Skills Alliance. All rights reserved.
          </p>
        </div>
      </footer>
  )
}

export default Footer