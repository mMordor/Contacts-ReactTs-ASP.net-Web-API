import type React from "react"



function Container({children}:{children : React.ReactNode}) {
  return (
    <div className="bg-[#f5dd56] h-[calc(100%-100px)] flex flex-col justify-center items-center gap-4">
        {
            children
        }
    </div>
  )
}

export default Container