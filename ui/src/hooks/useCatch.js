import { useCallback } from "react";
import { useAlert } from "../components/utils/GlobalAlert";

export default function useCatch() {
    const { setAlert } = useAlert()

    const cWrapper = useCallback((innerFunction) => {
        innerFunction()
            .catch((error) => {
                setAlert({
                    message: error.errorMessage ? error.errorMessage : 'Something went wrong. Please try again later',
                    status: 'danger'
                })
            })
    }, [setAlert])

    return {
        cWrapper
    }
}
