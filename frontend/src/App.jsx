import { RouterProvider } from "react-router-dom"
import { logStatements } from "./utilities/utilityMethods"
import useMyRouter from "./hooks/useRouter"

function App() {

  const router = useMyRouter();

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
