import { useCallback, useState, MouseEvent } from "react";
import { useSettings } from "../../../controls";

export const useTabs = (ref: HTMLDivElement) => {
    const { updateTabHeight, tabHeight } = useSettings();
    const [dragging, setDragging] = useState(false);
    const [initialPos, setInitialPos] = useState(0);

    const minHeight = 200;

    // handlers
    const onMouseUp = useCallback(() => {
        setDragging(false);
        updateTabHeight(tabHeight, true);
    }, [tabHeight, updateTabHeight]);

    const onMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setDragging(true);
        setInitialPos(e.clientY);
    }, []);

    const onMouseMove = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (!ref) return;
            if (!dragging) return;
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
        [dragging, initialPos, ref, updateTabHeight],
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
        dragging,
    };
};
