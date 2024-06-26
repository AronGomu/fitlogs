export function dispatchPossiblyModalEvent(dispatch: Function, isInModal: boolean, type: string, detail: any): void {
	if (isInModal) {
		dispatch(
		    "bubbleToModal", 
		    {type: type, detail: detail}
		)
	    } else {
		dispatch(type, detail)
	    }
}
