import React from "react";
import { Category } from "@snowytime/vibe";
import { useVibeContext } from "@snowytime/vibe/client";
import {
    BookIcon,
    BookmarkIcon,
    FolderIcon,
    MinusSquareIcon,
    PlusSquareIcon,
} from "@snowytime/iconly-react/ui";

const Nest = ({ category }: { category: Category }) => {
    const { useNavigate, useLocation } = useVibeContext();
    const navigate = useNavigate();
    const location = useLocation();
    return category.type === "file" ? (
        <div
            data-toggled={location.pathname === category.path}
            className='header'
            onClick={() => navigate(category.path || "/")}
        >
            <div style={{ height: "10px", width: "10px", marginRight: "5px" }} />
            <div>
                <BookmarkIcon />
            </div>
            {category.name}
        </div>
    ) : (
        <Folder category={category} />
    );
};

export const Tree = ({ data }: { data: Category[] }) => {
    return (
        <div>
            {data.map((category) => (
                <Nest category={category} />
            ))}
        </div>
    );
};

const Folder = ({ category }: { category: Category }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <div>
            <div className='header' onClick={() => setOpen((o) => !o)}>
                <div style={{ height: "10px", width: "10px", marginRight: "5px" }}>
                    {open ? <MinusSquareIcon /> : <PlusSquareIcon />}
                </div>
                <div>
                    {category.children.some((i) => i.type === "file") ? (
                        <BookIcon />
                    ) : (
                        <FolderIcon />
                    )}
                </div>
                {category.name}
            </div>
            {open && (
                <div style={{ marginLeft: "14px", borderLeft: "1px solid hsl(var(--accent-100))" }}>
                    {category.children.map((child) => (
                        <Nest category={child} />
                    ))}
                </div>
            )}
        </div>
    );
};
