import { useCallback, useState, MouseEvent } from "react";
import { useSettings } from "../../../internals/settings";

export const useTabs = (ref: HTMLDivElement) => {
    const { updateTabHeight, tabHeight, tabDragging, updateTabDragging } = useSettings();
    const [initialPos, setInitialPos] = useState(0);

    const minHeight = 200;

    // handlers
    const onMouseUp = useCallback(() => {
        updateTabDragging(false);
        updateTabHeight(tabHeight, true);
    }, [tabHeight, updateTabDragging, updateTabHeight]);

    const onMouseDown = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
            updateTabDragging(true);
            setInitialPos(e.clientY);
        },
        [updateTabDragging],
    );

    const onMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!ref) return;
            if (!tabDragging) return;
            const currentHeight = ref.getBoundingClientRect().height;
            const deltaY = e.clientY - initialPos;
            const proposedY = currentHeight - deltaY;
            if (proposedY < minHeight) {
                return;
            }
            updateTabHeight(proposedY, false);
            // ref.style.height = `${proposedY}px`;
            setInitialPos(e.clientY);
        },
        [initialPos, ref, tabDragging, updateTabHeight],
    );

    return {
        dragProps: {
            onMouseDown: (e: MouseEvent<HTMLDivElement>) => onMouseDown(e),
            // onMouseMove: (e: MouseEvent<HTMLDivElement>) => onMouseMove(e),
            role: "button",
            tabIndex: 0,
        },
        wrapperProps: {
            onMouseUp,
            onMouseMove,
            role: "button",
            tabIndex: 0,
        },
        dragging: tabDragging,
    };
};
