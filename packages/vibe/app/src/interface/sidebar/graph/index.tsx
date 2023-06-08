import React, { useId } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Category } from "../../../types";

import styles from "./styles.module.scss";
import { useSettings } from "../../../controls/use-settings";

const colorCategories = ["#20B9FD", "#17CC14", "#FF83AA", "#20B9FD", "#17CC14", "#FF83AA"];

const FolderIcon = () => (
    <svg
        style={{ overflow: "visible" }}
        height='50%'
        viewBox='0 0 14 11'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M2.29745 11H11.8743C12.3857 11 12.7845 10.8437 13.0707 10.5311C13.3569 10.2226 13.5 9.75774 13.5 9.13661V2.96339C13.5 2.34627 13.3493 1.88142 13.0478 1.56885C12.7463 1.25628 12.2979 1.1 11.7026 1.1H6.20718C6.01255 1.1 5.84845 1.07395 5.71488 1.02186C5.58131 0.965756 5.44202 0.873588 5.29701 0.745355L4.94782 0.444809C4.82188 0.332605 4.69976 0.244444 4.58146 0.180328C4.46697 0.116211 4.33913 0.0701275 4.19793 0.0420765C4.06055 0.0140255 3.89836 0 3.71136 0H2.07992C1.57618 0 1.18692 0.150273 0.912153 0.45082C0.637384 0.751366 0.5 1.20419 0.5 1.80929V9.13661C0.5 9.75774 0.648833 10.2226 0.946499 10.5311C1.24798 10.8437 1.6983 11 2.29745 11ZM2.30889 10.0322C2.02268 10.0322 1.80324 9.9541 1.65059 9.79781C1.49795 9.63752 1.42162 9.40109 1.42162 9.08852V1.86339C1.42162 1.56685 1.49413 1.34244 1.63915 1.19016C1.78416 1.03789 1.99406 0.961749 2.26882 0.961749H3.47666C3.66747 0.961749 3.82776 0.9898 3.95751 1.0459C4.09108 1.102 4.23037 1.19417 4.37539 1.3224L4.72457 1.62896C4.84669 1.73716 4.9669 1.82332 5.0852 1.88743C5.20351 1.95155 5.33326 1.99763 5.47446 2.02568C5.61566 2.05373 5.77976 2.06776 5.96675 2.06776H11.6854C11.9678 2.06776 12.1872 2.14791 12.3437 2.3082C12.5001 2.46849 12.5784 2.70492 12.5784 3.01749V9.09453C12.5784 9.4031 12.5001 9.63752 12.3437 9.79781C12.1872 9.9541 11.9678 10.0322 11.6854 10.0322H2.30889ZM1.06099 4.26776H12.9333V3.36011H1.06099V4.26776Z'
            fill='var(--fill)'
        />
    </svg>
);

const StoryIcon = () => (
    <svg
        style={{ overflow: "visible" }}
        height='55%'
        viewBox='0 0 9 13'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
    >
        <path
            d='M0.77558 13C0.925344 13 1.06679 12.9495 1.19991 12.8485C1.33304 12.7515 1.54104 12.5697 1.82393 12.303L4.26384 9.9697C4.30128 9.92929 4.33872 9.92929 4.37616 9.9697L6.81608 12.303C7.09896 12.5657 7.30489 12.7475 7.43385 12.8485C7.56698 12.9495 7.7105 13 7.86443 13C8.07243 13 8.23468 12.9354 8.35116 12.8061C8.46764 12.6768 8.52589 12.4949 8.52589 12.2606V1.73939C8.52589 1.16162 8.3782 0.727273 8.08283 0.436364C7.78746 0.145455 7.34649 0 6.75991 0H1.88009C1.29351 0 0.852542 0.145455 0.557173 0.436364C0.261805 0.727273 0.11412 1.16162 0.11412 1.73939V12.2606C0.11412 12.4949 0.172362 12.6768 0.288846 12.8061C0.405329 12.9354 0.567574 13 0.77558 13ZM1.28727 11.3636C1.24151 11.404 1.19783 11.4182 1.15623 11.4061C1.11879 11.398 1.10007 11.3636 1.10007 11.303V1.75152C1.10007 1.48889 1.16871 1.29091 1.306 1.15758C1.44744 1.02424 1.65545 0.957576 1.93001 0.957576H6.71623C6.98664 0.957576 7.19049 1.02424 7.32777 1.15758C7.46921 1.29091 7.53994 1.48889 7.53994 1.75152V11.303C7.53994 11.3636 7.51914 11.398 7.47753 11.4061C7.44009 11.4182 7.39849 11.404 7.35273 11.3636L4.65073 8.81818C4.55089 8.72525 4.44065 8.67879 4.32 8.67879C4.19936 8.67879 4.08912 8.72525 3.98927 8.81818L1.28727 11.3636Z'
            fill='#E83D26'
        />
    </svg>
);

export const Graph = () => {
    const { search, filteredTree } = useSettings();
    const location = useLocation();
    const pathSegments = location.pathname.split("/");
    pathSegments.shift();
    const id = useId();

    return (
        <div className={styles.panel}>
            {filteredTree.map((category, i) => (
                <Nest
                    category={category}
                    key={`${id}-${i}`}
                    depth={category.level}
                    path={pathSegments}
                    expand={!!search}
                />
            ))}
        </div>
    );
};

const Row = ({
    title,
    type,
    level,
    onClick,
    active,
}: {
    title: string;
    type: "folder" | "file";
    level: number;
    onClick?: () => void;
    active?: boolean;
}) => {
    return (
        <div
            className={styles.row}
            onClick={onClick || (() => {})}
            role='button'
            data-active={active}
            tabIndex={0}
        >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <div className={styles.icon} style={{ "--fill": colorCategories[level] }}>
                {type === "folder" ? <FolderIcon /> : <StoryIcon />}
            </div>
            <div className={styles.title}>{title}</div>
        </div>
    );
};

const Nest = ({
    category,
    depth,
    path,
    expand,
}: {
    category: Category;
    depth: number;
    path: string[];
    expand: boolean;
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = () => {
        const newPath = category.path || "/";
        const searchParams = new URLSearchParams(location.search);

        // Loop through existing query parameters and append them to the new URL
        for (const [key, value] of searchParams.entries()) {
            searchParams.set(key, value);
        }

        const newUrl = `${newPath}?${searchParams.toString()}`;

        navigate(newUrl);
    };

    return category.type === "file" ? (
        <Row
            title={category.name}
            type='file'
            level={depth}
            active={location.pathname === category.path}
            onClick={handleNavigation}
        />
    ) : (
        <Folder category={category} depth={depth} path={path} expand={expand} />
    );
};

const Folder = ({
    category,
    depth,
    path,
    expand,
}: {
    category: Category;
    depth: number;
    path: string[];
    expand: boolean;
}) => {
    const [open, setOpen] = React.useState(path[depth] === category.name);
    const id = useId();
    return (
        <div>
            <Row
                title={category.name}
                type='folder'
                level={depth}
                onClick={() => setOpen((o) => !o)}
            />
            {open || expand ? (
                <div style={{ marginLeft: "12px" }}>
                    {category.children.map((child, i) => (
                        <Nest
                            category={child}
                            key={`${id}-${i}`}
                            depth={child.level}
                            path={path}
                            expand={expand}
                        />
                    ))}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
