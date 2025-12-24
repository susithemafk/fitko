// Add this helper hook outside of your Cards component
import { useEffect, useCallback } from "react"

const useGlowPointer = () => {
    // Function to update the CSS variables
    const UPDATE = useCallback((client: any) => {
        const { clientX, clientY } = client
        // Set the mouse X and Y coordinates on the root element
        document.documentElement.style.setProperty("--x", `${clientX}px`)
        document.documentElement.style.setProperty("--y", `${clientY}px`)
    }, [])

    useEffect(() => {
        // Add event listener on mount
        document.body.addEventListener("pointermove", UPDATE)
        // Clean up event listener on unmount
        return () => {
            document.body.removeEventListener("pointermove", UPDATE)
        }
    }, [UPDATE])

    return null // The hook just sets global styles
}

export default useGlowPointer
