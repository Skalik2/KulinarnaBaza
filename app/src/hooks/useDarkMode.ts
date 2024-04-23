import { useContext } from "react"
import { DarkModeContext } from "../context/DarkModeContext"

export default function useDarkMode(){
    const context = useContext(DarkModeContext)
    if(context === undefined) throw new Error('DarkModeContext was used outside DarkModeProvider')
    return context
}
