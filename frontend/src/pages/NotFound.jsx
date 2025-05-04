import NotFoundImg from "@/assets/NotFound.jpg"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom";



const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-full">
      <img src={NotFoundImg} alt="Not Found" className="w-1/4 h-auto" />
      {/* <h1 className="text-4xl font-bold text-gray-800 mt-4">Page Not Found</h1> */}
      <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Button className={"mt-4"} variant="primary" onClick={() => window.history.length > 2 ? navigate(-1) : navigate('/')}>
        Go Back
      </Button>
    </div>
  )
}

export default NotFound