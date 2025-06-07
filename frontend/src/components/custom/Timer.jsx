
import { useEffect, useState } from "react"
import { Progress } from "../ui/progress";



const Timer = ({ currTime, maxTime }) => {

  const [currPercent, setCurrPercent] = useState(0)

  useEffect(() => {
    if (currTime > 0) {
      setCurrPercent((currTime / maxTime) * 100)
    } else {
      setCurrPercent(0)
    }
  }, [currTime, maxTime])

  return (
    <div className="flex flex-col items-center justify-center min-h-[10vh] w-full">
      <Progress value={currPercent} className={`w-[70%]`} indicatorClassName={`transition-colors ${currPercent < 25
        ? 'bg-red-400'
        : currPercent < 50
          ? 'bg-orange-400'
          : currPercent < 75
            ? 'bg-yellow-400'
            : 'bg-green-400'
        }`
      } />
      <p className="text-lg font-semibold text-center">
        {`Time Left: ${Math.floor(currTime / 60)}:${currTime % 60 < 10 ? `0${currTime % 60}` : currTime % 60}`}
      </p>
    </div>
  )
}

export default Timer