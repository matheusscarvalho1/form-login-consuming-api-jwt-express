"use client"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"

interface ProgressLoadingProps {
  isAuthenticated: boolean
}

const ProgressLoading = ({ isAuthenticated }: ProgressLoadingProps) => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 gap-6">
    
    { isAuthenticated 
    ? <>
        <h2 className="text-lg sm:text-xl font-medium text-[#c2c2ff] animate-pulse"> Carregando dados do usuário...</h2>
        <Progress
          value={progress}
          className="w-3/4 max-w-md h-3 rounded-full bg-[#2b2b3d] border border-[#44445a]"
        />
    </>
    
    
    
    : <Progress
        value={progress}
        className="w-3/4 max-w-md h-3 rounded-full bg-[#2b2b3d] border border-[#44445a]"
      /> }
    

    

  </div>
  )

}
export default ProgressLoading
