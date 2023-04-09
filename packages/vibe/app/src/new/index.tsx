import React, { useState } from "react";
import "./styles.scss";
import { useDomRef } from "@snowytime/react-magic/hooks";
import { Transition } from "@snowytime/react-magic/components";
import { Stories } from "./tree";
import { useVibeContext } from "../context";

import { useResize } from "../interface/hooks/useResize";

const SidebarIcon = () => (
    <svg width='40%' viewBox='0 0 19 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M10.193 12.5801H15.8978C16.1503 12.5801 16.3302 12.5231 16.4377 12.409C16.5505 12.2949 16.6069 12.1075 16.6069 11.8468V3.16133C16.6069 2.9006 16.5505 2.7132 16.4377 2.59913C16.3302 2.48506 16.1503 2.42803 15.8978 2.42803H10.193C9.94049 2.42803 9.75785 2.48506 9.64504 2.59913C9.5376 2.7132 9.48388 2.9006 9.48388 3.16133V11.8468C9.48388 12.1075 9.5376 12.2949 9.64504 12.409C9.75785 12.5231 9.94049 12.5801 10.193 12.5801ZM2.74767 7.49593C2.74767 7.64259 2.7987 7.77295 2.90076 7.88702C3.0082 7.99565 3.13175 8.04997 3.27142 8.04997H5.52757L6.7201 8.00109L6.05131 8.64476L5.18109 9.51657C5.07902 9.61434 5.02799 9.74199 5.02799 9.89951C5.02799 10.0462 5.07096 10.1684 5.15691 10.2662C5.24823 10.3585 5.36373 10.4047 5.50339 10.4047C5.58397 10.4047 5.6538 10.3884 5.71289 10.3558C5.77735 10.3232 5.83644 10.2743 5.89016 10.2091L8.0335 7.89517C8.15168 7.7648 8.21077 7.63172 8.21077 7.49593C8.21077 7.36013 8.15168 7.22705 8.0335 7.09669L5.89016 4.78273C5.83644 4.72298 5.77735 4.67681 5.71289 4.64422C5.6538 4.61162 5.58397 4.59533 5.50339 4.59533C5.36373 4.59533 5.24823 4.64422 5.15691 4.74199C5.07096 4.83433 5.02799 4.95383 5.02799 5.10049C5.02799 5.25258 5.07902 5.38023 5.18109 5.48343L6.05131 6.34709L6.7201 6.99077L5.52757 6.95003H3.27142C3.13175 6.95003 3.0082 7.00435 2.90076 7.11298C2.79333 7.22162 2.7423 7.34927 2.74767 7.49593ZM2.53011 15H16.4699C17.3186 15 17.9525 14.7882 18.3715 14.3645C18.7905 13.9462 19 13.3188 19 12.4823V2.5258C19 1.6893 18.7905 1.05921 18.3715 0.635524C17.9525 0.211841 17.3186 0 16.4699 0H2.53011C1.68674 0 1.05287 0.211841 0.628499 0.635524C0.2095 1.05378 0 1.68387 0 2.5258V12.4823C0 13.3188 0.2095 13.9462 0.628499 14.3645C1.05287 14.7882 1.68674 15 2.53011 15ZM2.54623 13.6882C2.14334 13.6882 1.83446 13.5823 1.61959 13.3705C1.40472 13.1532 1.29729 12.8327 1.29729 12.409V2.59913C1.29729 2.17545 1.40472 1.85497 1.61959 1.6377C1.83446 1.42042 2.14334 1.31179 2.54623 1.31179H16.4538C16.8513 1.31179 17.1575 1.42042 17.3724 1.6377C17.5926 1.85497 17.7027 2.17545 17.7027 2.59913V12.409C17.7027 12.8327 17.5926 13.1532 17.3724 13.3705C17.1575 13.5823 16.8513 13.6882 16.4538 13.6882H2.54623Z'
            fill='hsl(var(--accent-300))'
        />
    </svg>
);

const VibeLogo = () => (
    <svg width='30' height='34' viewBox='0 0 30 34' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M21.2858 5.70289C19.5749 4.26268 17.8069 2.77442 16.019 1.00348L15.001 0L14.003 1.0049C10.7893 4.20191 9.26946 9.11191 8.61076 12.0573C8.1053 11.2815 7.7302 10.4295 7.50009 9.5345L6.89129 7.22084L5.13333 8.85609C2.05511 11.7224 0.000593402 14.5646 0.000593402 19.1156C-0.0290037 22.3996 1.04932 25.5992 3.06425 28.2061C8.61412 35.3863 20.047 35.7372 26.1139 29.1075C28.6167 26.3724 30.0022 22.8112 30 19.1185C30 13.0382 25.9608 9.63909 21.2858 5.70289Z'
            fill='url(#paint0_linear_102_6)'
        />
        <defs>
            <linearGradient
                id='paint0_linear_102_6'
                x1='15'
                y1='0'
                x2='15'
                y2='33.8462'
                gradientUnits='userSpaceOnUse'
            >
                <stop stopColor='#EC9F05' />
                <stop offset='1' stopColor='#E73827' />
            </linearGradient>
        </defs>
    </svg>
);

const Close = ({ onClick }: { onClick: () => void }) => (
    <div className='action-button' onClick={onClick}>
        <svg height='45%' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0.649063 9.35237C0.717147 9.41672 0.794687 9.46025 0.881684 9.48296C0.96868 9.50568 1.05568 9.50568 1.14267 9.48296C1.22967 9.46025 1.30532 9.41672 1.36962 9.35237L5.00077 5.7183L8.63193 9.35237C8.69623 9.41672 8.77188 9.46025 8.85887 9.48296C8.94587 9.50568 9.03287 9.50568 9.11986 9.48296C9.21064 9.46404 9.28818 9.4205 9.35248 9.35237C9.41679 9.28801 9.45839 9.2123 9.47731 9.12524C9.5 9.03817 9.5 8.9511 9.47731 8.86404C9.45839 8.77697 9.41679 8.70126 9.35248 8.63691L5.72133 4.99716L9.35248 1.36309C9.41679 1.29874 9.46028 1.22303 9.48298 1.13596C9.50567 1.0489 9.50567 0.96183 9.48298 0.874763C9.46028 0.787697 9.41679 0.711987 9.35248 0.647634C9.2844 0.579495 9.20686 0.535962 9.11986 0.517035C9.03287 0.494322 8.94587 0.494322 8.85887 0.517035C8.77188 0.535962 8.69623 0.579495 8.63193 0.647634L5.00077 4.2817L1.36962 0.647634C1.30532 0.579495 1.22778 0.535962 1.137 0.517035C1.05 0.494322 0.963006 0.494322 0.87601 0.517035C0.789014 0.535962 0.713365 0.579495 0.649063 0.647634C0.584761 0.711987 0.541263 0.787697 0.518568 0.874763C0.499656 0.96183 0.499656 1.0489 0.518568 1.13596C0.541263 1.22303 0.584761 1.29874 0.649063 1.36309L4.28022 4.99716L0.649063 8.63691C0.584761 8.70126 0.541263 8.77697 0.518568 8.86404C0.495874 8.9511 0.493982 9.03817 0.512895 9.12524C0.535589 9.2123 0.580979 9.28801 0.649063 9.35237Z'
                fill='var(--fill)'
                stroke='var(--fill)'
                strokeWidth='0.8'
            />
        </svg>
    </div>
);

const Delete = ({ onClick }: { onClick: () => void }) => (
    <svg
        onClick={onClick}
        height='40%'
        viewBox='0 0 10 10'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M0.649063 9.35237C0.717147 9.41672 0.794687 9.46025 0.881684 9.48296C0.96868 9.50568 1.05568 9.50568 1.14267 9.48296C1.22967 9.46025 1.30532 9.41672 1.36962 9.35237L5.00077 5.7183L8.63193 9.35237C8.69623 9.41672 8.77188 9.46025 8.85887 9.48296C8.94587 9.50568 9.03287 9.50568 9.11986 9.48296C9.21064 9.46404 9.28818 9.4205 9.35248 9.35237C9.41679 9.28801 9.45839 9.2123 9.47731 9.12524C9.5 9.03817 9.5 8.9511 9.47731 8.86404C9.45839 8.77697 9.41679 8.70126 9.35248 8.63691L5.72133 4.99716L9.35248 1.36309C9.41679 1.29874 9.46028 1.22303 9.48298 1.13596C9.50567 1.0489 9.50567 0.96183 9.48298 0.874763C9.46028 0.787697 9.41679 0.711987 9.35248 0.647634C9.2844 0.579495 9.20686 0.535962 9.11986 0.517035C9.03287 0.494322 8.94587 0.494322 8.85887 0.517035C8.77188 0.535962 8.69623 0.579495 8.63193 0.647634L5.00077 4.2817L1.36962 0.647634C1.30532 0.579495 1.22778 0.535962 1.137 0.517035C1.05 0.494322 0.963006 0.494322 0.87601 0.517035C0.789014 0.535962 0.713365 0.579495 0.649063 0.647634C0.584761 0.711987 0.541263 0.787697 0.518568 0.874763C0.499656 0.96183 0.499656 1.0489 0.518568 1.13596C0.541263 1.22303 0.584761 1.29874 0.649063 1.36309L4.28022 4.99716L0.649063 8.63691C0.584761 8.70126 0.541263 8.77697 0.518568 8.86404C0.495874 8.9511 0.493982 9.03817 0.512895 9.12524C0.535589 9.2123 0.580979 9.28801 0.649063 9.35237Z'
            fill='hsl(var(--accent-300))'
        />
    </svg>
);

const Resize = ({ onClick, enabled }: { onClick: () => void; enabled: boolean }) => (
    <div className='action-button' onClick={onClick}>
        <svg
            width='75%'
            viewBox='0 0 18 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            style={{ "--fill": enabled ? "hsl(var(--blue-400))" : "hsl(var(--accent-300))" }}
        >
            <path
                d='M7.6071 5.90268C7.6071 5.76241 7.56329 5.64843 7.47569 5.56076C7.39159 5.47308 7.28121 5.42925 7.14455 5.42925H3.55979L2.5138 5.46607L4.24836 3.78801C4.29391 3.74242 4.3272 3.68981 4.34823 3.63019C4.36925 3.57058 4.37976 3.51096 4.37976 3.45134C4.37976 3.31808 4.33421 3.20936 4.2431 3.1252C4.1555 3.03752 4.04687 2.99369 3.91721 2.99369C3.85414 2.99369 3.79282 3.00596 3.73325 3.03051C3.67368 3.05506 3.61761 3.09363 3.56505 3.14624L1.16294 5.54498C1.11389 5.59758 1.07359 5.65369 1.04205 5.71331C1.01402 5.77293 1 5.83605 1 5.90268C1 5.96581 1.01402 6.02718 1.04205 6.0868C1.07359 6.14641 1.11389 6.20252 1.16294 6.25513L3.56505 8.65387C3.61761 8.70647 3.67368 8.74505 3.73325 8.76959C3.79282 8.79414 3.85414 8.80642 3.91721 8.80642C4.04687 8.80642 4.1555 8.76433 4.2431 8.68017C4.33421 8.59249 4.37976 8.48203 4.37976 8.34876C4.37976 8.28564 4.36925 8.22427 4.34823 8.16465C4.3272 8.10503 4.29391 8.05418 4.24836 8.0121L2.5138 6.3393L3.55979 6.37086H7.14455C7.28121 6.37086 7.39159 6.32702 7.47569 6.23935C7.56329 6.15167 7.6071 6.03945 7.6071 5.90268ZM9 11C9.13666 11 9.2488 10.9562 9.3364 10.8685C9.424 10.7808 9.46781 10.6686 9.46781 10.5318V1.45765C9.46781 1.32439 9.424 1.21568 9.3364 1.13151C9.2488 1.04384 9.13666 1 9 1C8.86334 1 8.74945 1.04384 8.65834 1.13151C8.57074 1.21568 8.52694 1.32439 8.52694 1.45765V10.5318C8.52694 10.6686 8.57074 10.7808 8.65834 10.8685C8.74945 10.9562 8.86334 11 9 11ZM10.3929 5.90268C10.3929 6.03945 10.435 6.15167 10.5191 6.23935C10.6067 6.32702 10.7188 6.37086 10.8555 6.37086H14.435L15.4862 6.3393L13.7516 8.0121C13.7061 8.05418 13.6728 8.10503 13.6518 8.16465C13.6307 8.22427 13.6202 8.28564 13.6202 8.34876C13.6202 8.48203 13.664 8.59249 13.7516 8.68017C13.8392 8.76433 13.9479 8.80642 14.0775 8.80642C14.1441 8.80642 14.2072 8.79414 14.2668 8.76959C14.3263 8.74505 14.3824 8.70647 14.435 8.65387L16.8371 6.25513C16.8861 6.20252 16.9247 6.14641 16.9527 6.0868C16.9842 6.02718 17 5.96581 17 5.90268C17 5.83605 16.9842 5.77293 16.9527 5.71331C16.9247 5.65369 16.8861 5.59758 16.8371 5.54498L14.435 3.14624C14.3824 3.09363 14.3263 3.05506 14.2668 3.03051C14.2072 3.00596 14.1441 2.99369 14.0775 2.99369C13.9479 2.99369 13.8392 3.03752 13.7516 3.1252C13.664 3.20936 13.6202 3.31808 13.6202 3.45134C13.6202 3.51096 13.6307 3.57058 13.6518 3.63019C13.6728 3.68981 13.7061 3.74242 13.7516 3.78801L15.4862 5.46607L14.435 5.42925H10.8555C10.7188 5.42925 10.6067 5.47308 10.5191 5.56076C10.435 5.64843 10.3929 5.76241 10.3929 5.90268Z'
                fill='var(--fill)'
                stroke='var(--fill)'
                strokeWidth='0.3'
            />
        </svg>
    </div>
);

const Theme = () => {
    const { theme, dispatch } = useVibeContext();
    const themeToggle = () =>
        dispatch({
            type: "setTheme",
            payload: theme === "light" ? "dark" : "light",
        });
    return (
        <>
            {theme}
            <div className='vibe-theme-toggle-wrapper' onClick={themeToggle}>
                <div className={`theme-track ${theme}`}>
                    <div>🌜</div>
                    <div className='vibe-toggle-thumb' />
                    <div>🌞</div>
                </div>
            </div>
        </>
    );
};

const SearchIcon = () => (
    <svg height='40%' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M0 4.44906C0 5.06234 0.116342 5.63845 0.349025 6.17739C0.581708 6.71262 0.904462 7.18466 1.31729 7.59351C1.73011 8.00237 2.20683 8.32201 2.74725 8.55246C3.29143 8.7829 3.87314 8.89812 4.49238 8.89812C4.98026 8.89812 5.44563 8.82379 5.88847 8.67511C6.33132 8.52644 6.73664 8.32201 7.10443 8.06183L9.87411 10.8104C9.94167 10.8736 10.0148 10.9201 10.0937 10.9498C10.1762 10.9833 10.2625 11 10.3526 11C10.4802 11 10.5928 10.9703 10.6904 10.9108C10.788 10.855 10.863 10.777 10.9156 10.6766C10.9719 10.5763 11 10.4648 11 10.3421C11 10.2529 10.9831 10.1693 10.9493 10.0912C10.9193 10.0132 10.8743 9.94442 10.8142 9.88495L8.06144 7.14192C8.35041 6.77023 8.57559 6.3558 8.73697 5.89863C8.9021 5.44146 8.98466 4.95827 8.98466 4.44906C8.98466 3.83578 8.86832 3.26153 8.63564 2.72631C8.40296 2.18736 8.0802 1.71346 7.66738 1.30461C7.25455 0.895759 6.77605 0.576111 6.23187 0.345666C5.69144 0.115222 5.11161 0 4.49238 0C3.87314 0 3.29143 0.115222 2.74725 0.345666C2.20683 0.576111 1.73011 0.895759 1.31729 1.30461C0.904462 1.71346 0.581708 2.18736 0.349025 2.72631C0.116342 3.26153 0 3.83578 0 4.44906ZM0.962633 4.44906C0.962633 3.96587 1.0527 3.51428 1.23285 3.09427C1.41674 2.67055 1.67015 2.29887 1.99291 1.97922C2.31941 1.65585 2.69471 1.40497 3.11879 1.22656C3.54663 1.04443 4.00449 0.953371 4.49238 0.953371C4.98026 0.953371 5.43624 1.04443 5.86033 1.22656C6.28816 1.40497 6.66346 1.65585 6.98621 1.97922C7.30897 2.29887 7.56229 2.67055 7.74619 3.09427C7.93008 3.51428 8.02203 3.96587 8.02203 4.44906C8.02203 4.93225 7.93008 5.38571 7.74619 5.80943C7.56229 6.22943 7.30897 6.59926 6.98621 6.91891C6.66346 7.23855 6.28816 7.48944 5.86033 7.67157C5.43624 7.85369 4.98026 7.94475 4.49238 7.94475C4.00449 7.94475 3.54663 7.85369 3.11879 7.67157C2.69471 7.48944 2.31941 7.23855 1.99291 6.91891C1.67015 6.59926 1.41674 6.22943 1.23285 5.80943C1.0527 5.38571 0.962633 4.93225 0.962633 4.44906Z'
            fill='hsl(var(--accent-300))'
        />
    </svg>
);

const Search = ({ search, setSearch }) => {
    return (
        <div className='search'>
            <SearchIcon />
            {search ? <Delete onClick={() => setSearch("")} /> : null}
            <div className='search-input'>
                <input
                    value={search}
                    placeholder='search for story...'
                    onChange={(e) => setSearch(e.target.value)}
                    type='text'
                    style={{ width: "max-content" }}
                />
            </div>
        </div>
    );
};

export const Ui = ({ children, stories }) => {
    const [bounds, setBounds] = React.useState({ width: 0, height: null });
    const [resize, setResize] = useState(false);
    const [ref, setRef] = useDomRef<HTMLDivElement>();

    React.useEffect(() => {
        if (!ref) return;
        const handleResize = () => {
            setBounds({
                width: ref.getBoundingClientRect().width,
                height: ref.getBoundingClientRect().height,
            });
        };
        // set initial bounds on mount
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [ref, resize]);
    const [search, setSearch] = React.useState("");
    const [sidebarOpen, setSidebarOpen] = React.useState(true);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [dragging, setDragging] = useState(false);
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
    React.useEffect(() => {
        // if window is resized disable the resize state
        const handleResize = () => {
            if (resize) {
                setResize(false);
                setWidth("");
                setHeight("");
            }
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [resize]);
    const handleMouseDown = (e: MouseEvent) => {
        setDragging(true);
        setInitialPos({ x: e.clientX, y: e.clientY });
    };
    const handleMouseUp = () => {
        setDragging(false);
    };
    const toggleResize = React.useCallback(() => {
        if (!ref) return;
        setResize((r) => {
            if (r) {
                setWidth("");
                setHeight("");
            } else {
                setWidth(`${ref.getBoundingClientRect().width - 60}px`);
                setHeight(`${ref.getBoundingClientRect().height - 30 - 30 - 20 - 20}px`);
            }
            return !r;
        });
    }, [ref]);
    const handleMouseMove = React.useCallback(
        (e, direction) => {
            if (!ref) return;
            if (!dragging) return;
            const deltaX = e.clientX - initialPos.x;
            const deltaY = e.clientY - initialPos.y;
            if (direction === "right") {
                const proposedValue = parseFloat(width) + deltaX * 2;
                if (proposedValue > bounds.width) return;
                setWidth((w) => `${parseFloat(w) + deltaX * 2}px`);
            }
            if (direction === "bottom") {
                const proposedValue = parseFloat(height) + deltaY * 2;
                if (proposedValue > bounds.height) return;
                setHeight((h) => `${parseFloat(h) + deltaY * 2}px`);
            }
            if (direction === "left") {
                const proposedValue = parseFloat(width) - deltaX * 2;
                if (proposedValue > bounds.width) return;
                setWidth((w) => `${parseFloat(w) - deltaX * 2}px`);
            }
            if (direction === "top") {
                const proposedValue = parseFloat(height) - deltaY * 2;
                if (proposedValue > bounds.height) return;
                setHeight((h) => `${parseFloat(h) - deltaY * 2}px`);
            }
            setInitialPos({ x: e.clientX, y: e.clientY });
        },
        [bounds.height, bounds.width, dragging, height, initialPos.x, initialPos.y, ref, width],
    );
    return (
        <main className='vibe-main'>
            <Transition
                show={sidebarOpen}
                enter='sidebar-transition'
                leave='sidebar-transition'
                enterFrom='sidebar-close'
                enterTo='sidebar-open'
                leaveFrom='sidebar-open'
                leaveTo='sidebar-close'
            >
                <div className='vibe-sidebar'>
                    <div className='header'>
                        <VibeLogo />
                        <Close onClick={() => setSidebarOpen(false)} />
                    </div>
                    <Search search={search} setSearch={setSearch} />
                    <div className='stories'>
                        <Stories data={stories} search={search} />
                    </div>
                    <div className='footer'>
                        <div className='feature-bar'>
                            <Theme />
                            <Resize enabled={resize} onClick={toggleResize} />
                        </div>
                    </div>
                </div>
            </Transition>
            <div className={`vibe-window ${resize && "resize"}`}>
                {!sidebarOpen ? (
                    <div
                        onClick={() => setSidebarOpen(true)}
                        className='float-open'
                        tabIndex={0}
                        role='button'
                    >
                        <SidebarIcon />
                    </div>
                ) : null}
                {resize && (
                    <div className='resize-meta'>
                        <div className='size-box'>
                            width
                            <div className='size'>{width}</div>
                        </div>
                        <div className='size-box'>
                            height
                            <div className='size'>{height}</div>
                        </div>
                    </div>
                )}
                <div className='panel'>
                    <div className='vibe-content' style={{ width, height }} ref={setRef}>
                        {resize ? (
                            <div
                                className='window-dragger right'
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={(e) => handleMouseMove(e, "right")}
                                tabIndex={0}
                                role='button'
                            >
                                <div />
                            </div>
                        ) : null}
                        {resize ? (
                            <div
                                className='window-dragger top'
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={(e) => handleMouseMove(e, "top")}
                                tabIndex={0}
                                role='button'
                            >
                                <div />
                            </div>
                        ) : null}
                        <div>
                            <div>{children}</div>
                        </div>
                        {resize ? (
                            <div
                                className='window-dragger bottom'
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={(e) => handleMouseMove(e, "bottom")}
                                tabIndex={0}
                                role='button'
                            >
                                <div />
                            </div>
                        ) : null}
                        {resize ? (
                            <div
                                className='window-dragger left'
                                onMouseDown={handleMouseDown}
                                onMouseUp={handleMouseUp}
                                onMouseMove={(e) => handleMouseMove(e, "left")}
                                tabIndex={0}
                                role='button'
                            >
                                <div />
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </main>
    );
};
