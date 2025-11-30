import React, { useCallback, useMemo, useState} from "react"
import { PageToggleContext } from "../constants";
import type { pageToggleContextInterface } from "../Types";

function PageToggleProvider ({children}:{children : React.ReactNode}){
    const [iseformPage , setIsEditMode] = useState<boolean>(false);

    const setPageToggleValue = useCallback((v:boolean) => {setIsEditMode(v)},[])
    

    const contextValue: pageToggleContextInterface = useMemo(
    () => ({
      iseformPage,
      setPageToggleValue
    }),
    [iseformPage, setPageToggleValue],
    );

    return (<PageToggleContext.Provider value={contextValue}>
        {
            children
        }
    </PageToggleContext.Provider> 
    )
}

export default PageToggleProvider





