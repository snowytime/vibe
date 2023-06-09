import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Badge, BadgeVariant } from "../../../interface/ui/badge";

const EmptySvg = () => (
    <svg height='100' viewBox='0 0 478 487' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
            d='M90.24 142.592s-21.673 8.573-24.86 29.398c-3.187 20.825 46.061 81.827 46.061 81.827l151.874-81.84-48.018-84.268L90.24 142.592Z'
            fill='#C7DCF9'
        />
        <path
            d='M123.819 162.275s-15.98 16.408-20.882 34.562c-4.902 18.154-5.533 50.574-4.717 62.717 23.84 22.061 118.071 3.576 118.071 3.576L307.1 156.309s-15.394-29.226-23.209-37.239c-7.815-8.012-33.147-17.975-62.373-6.215-17.153 24.344-97.699 49.42-97.699 49.42Z'
            fill='#E1ECFF'
        />
        <path
            d='M116.687 170.76s35.256 11.314 74.942-4.016c39.687-15.33 46.877-58.51 46.877-58.51l-17.007 4.628-97.68 49.413-7.132 8.485Z'
            fill='#E1ECFF'
        />
        <path
            d='M260.21 303.211s44.576.287 57.101 3.487c12.526 3.2 45.679 78.232 59.396 85.415 13.717 7.184 25.37-4.748 40.483-13.609 15.114-8.86 28.965-19.582 29.398-24.056.434-4.475-5.985-22.355-11.537-25.963-5.552-3.608-21.673-3.863-30.272 1.645-12.633-34.421-30.596-84.619-47.067-91.529-16.472-6.909-66.389-10.199-66.389-10.199l-31.113 74.809Z'
            fill='#E1ECFF'
        />
        <path
            d='M307.1 270.358s36.295 3.971 46.322 17.478c10.026 13.508 29.895 96.157 52.135 98.114.357 26.772-45.704 36.441-45.704 36.441L249.444 299.712l57.656-29.354Z'
            fill='#E1ECFF'
            opacity='.51'
        />
        <path
            d='M140.45 296.442s27.409 57.489 52.269 73.17c24.86 15.681 69.901 14.412 82.324 24.681 12.424 10.269 9.798 59.6 22.215 72.667 12.417 13.068 29.889 21.074 46.22 19.601 16.331-1.472 29.398-9.306 29.564-16.656.165-7.349-.491-13.723-8.166-17.644-7.674-3.92-18.485-7.183-18.951-11.754-.465-4.57-9.147-74.152-12.748-93.065-3.602-18.912-31.572-45.219-67.619-58.471-34.134-28.582-86.563-16.337-86.563-16.337l-38.545 23.808Z'
            fill='#E1ECFF'
        />
        <path
            d='M148.424 311.823s31.457 1.606 59.708-10.805c-5.399-28.748-22.055-37.238-22.055-37.238l-45.627 32.662 7.974 15.381Z'
            fill='#E1ECFF'
        />
        <path
            d='M191.954 11.6C167.318-1.59 115.686-6.038 83.814 33.49c-31.871 39.526-15.986 80.519-2.594 99.604 14.023 20.028 62.226 50.637 113.673 21.889s56.84-111.371-2.939-143.383Z'
            fill='#E1ECFF'
        />
        <path
            d='M187.715 35.771c21.883 5.227 36.098 35.932 28.749 65.33-7.35 29.398-32.669 49.165-61.085 49.325-28.417.159-56.674-19.244-56.521-55.527.153-34.867 41.337-70.474 88.857-59.128Z'
            fill='#1C3177'
        />
        <path
            d='M124.667 265.412c28.512-13.233 7.184-43.448 35.607-50.319 37.475 5.329 47.839 3.416 47.839 3.416s-71.692 62.966-83.446 46.903Z'
            fill='#E1ECFF'
        />
        <path
            d='m148.424 184.598 47.45 122.1 67.128-1.6 61.41-38.871 18.294-55.532-44.422-133.274-21.564 62.391-55.858 44.423-72.438.363Z'
            fill='#FF97C9'
        />
        <path
            d='M124.667 265.412c15.732-1.275 23.744-11.519 28.512-16.064 2.429-2.32 1.945-4.353.721-11.046-1.224-6.693 3.021-13.558 8.822-16.497 3.187 8.573 7.101 10.199 10.122 9.797 3.022-.401 6.126-18.453 16.006-18.294 9.88.159 17.803 13.233 19.123 19.76 1.319 6.528-5.061 25.147-13.067 38.214-8.007 13.068-19.302 29.246-44.729 34.307-25.427 5.061-39.884-7.923-48.215-24.337-2.811-5.54-3.825-13.195-3.735-21.724 0 0 5.692 7.515 26.44 5.884Zm188.915-142.09s3.028 9.848.988 13.686c-2.039 3.837-4.819 7.011-6.858 11.926-2.04 4.915.981 23.438 9.963 26.619 8.981 3.181 16.414-5.144 18.785-9.963 2.371-4.819 1.058-17.472-2.454-26.294-3.513-8.822-10.116-16.662-20.424-15.974Z'
            fill='#E1ECFF'
        />
        <path
            d='m323.909.961 2.014 4.08a1.694 1.694 0 0 0 1.275.93l4.506.638a1.701 1.701 0 0 1 .944 2.906l-3.257 3.188a1.691 1.691 0 0 0-.491 1.504l.765 4.462a1.705 1.705 0 0 1-1.552 1.987 1.701 1.701 0 0 1-.915-.19l-4.035-2.116a1.692 1.692 0 0 0-1.581 0l-4.035 2.116a1.701 1.701 0 0 1-2.473-1.797l.771-4.462a1.686 1.686 0 0 0-.491-1.505l-3.257-3.187a1.708 1.708 0 0 1-.434-1.747 1.696 1.696 0 0 1 1.377-1.16l4.507-.637a1.69 1.69 0 0 0 1.275-.93l2.014-4.08A1.711 1.711 0 0 1 322.372 0a1.705 1.705 0 0 1 1.537.961ZM108.253 432.686l1.69 3.423a1.401 1.401 0 0 0 1.07.778l3.78.548a1.424 1.424 0 0 1 1.152.972 1.428 1.428 0 0 1-.361 1.463l-2.735 2.664a1.419 1.419 0 0 0-.408 1.275l.638 3.761a1.442 1.442 0 0 1-1.304 1.666 1.448 1.448 0 0 1-.768-.155l-3.378-1.779a1.443 1.443 0 0 0-1.326 0l-3.366 1.766a1.425 1.425 0 0 1-1.989-.729 1.422 1.422 0 0 1-.082-.782l.637-3.761a1.446 1.446 0 0 0-.414-1.275l-2.728-2.664a1.425 1.425 0 0 1 .075-2.113 1.43 1.43 0 0 1 .715-.322l3.773-.548a1.428 1.428 0 0 0 1.078-.778l1.689-3.423a1.427 1.427 0 0 1 2.562.013Z'
            fill='#FEC272'
        />
        <path
            d='M168.614 72.422c15.687-3.457 27.412-10.759 26.189-16.307-1.223-5.55-14.931-7.244-30.618-3.787-15.687 3.458-27.413 10.76-26.19 16.308 1.223 5.549 14.932 7.244 30.619 3.786Z'
            fill='#fff'
            opacity='.48'
        />
        <path
            d='M204.34 251.375s-18.046-16.127-21.316-16.127c-3.27 0-11.977 12.749-10.014 16.127 1.963 3.379 12.047 14.445 23.119 17.848 3.589-6.846 8.211-17.848 8.211-17.848Z'
            fill='#E1ECFF'
        />
        <path
            d='m220.862 184.235 42.14 120.863 61.41-38.871-47.692-126.415-55.858 44.423Z'
            fill='#FF97C9'
            opacity='.5'
        />
        <path
            d='M336.791 370.53a78.42 78.42 0 0 1-21.035 12.475c-7.146 2.753-9.561 8.388-7.401 18.727 2.161 10.339 3.372 26.46 7.834 30.705 4.462 4.246 19.812 1.989 27.767-7.878-2.493-19.442-7.165-54.029-7.165-54.029Zm41.592-105.412s-8.924 3.889-8.076 10.091c.848 6.202 9.963 36.18 13.558 38.883 3.595 2.703 14.234-2.091 14.234-2.091-10.925-30.953-19.716-46.883-19.716-46.883Z'
            fill='#E1ECFF'
        />
        <path
            d='M1.79 336.855c-7.095-14.712 16.025-30.457 35.696-29.322 19.671 1.135 27.938 19.295 34.906 26.071 14.552 14.138 14.093 27.97 4.015 33.917-10.077 5.948-65.228-11.206-74.617-30.666Zm396.838-227.913c-5.737-5.023.166-28.634 13.718-34.16 13.551-5.527 30.38.516 33.975 9.988 3.595 9.473-35.932 34.46-47.693 24.172Zm66.408 12.634c-2.939 4.187-4.896 16.114 1.306 18.236 6.203 2.123 10.894-10.147 8.714-16.535-2.18-6.387-8.057-4.5-10.02-1.701Z'
            fill='#99ADF9'
        />
        <path
            opacity='.44'
            d='M469.498 24.795c-4.628 2.18-12.258 11.55-7.924 16.477 4.335 4.928 14.489-3.397 15.77-10.02 1.282-6.623-4.755-7.91-7.846-6.457ZM34.337 398.756c-4.003-3.188-15.776-5.897-18.288.165-2.511 6.062 9.447 11.474 15.936 9.727 6.489-1.746 5.017-7.763 2.352-9.892Z'
            fill='#99ADF9'
        />
        <path
            d='M68.905 329.569c-7.12 1.339-5.973 7.706-3.69 13.475 2.281 5.769 10.313 7.413 15.98 2.142-3.678-8.752-12.29-15.617-12.29-15.617Zm-40.929-9.606c-5.1.567-9.256 7.949-5.66 13.934 3.594 5.986 10.447 10.346 14.367 8.714 3.92-1.632 4.577-10.454 1.746-16.115-2.83-5.66-5.552-7.081-10.454-6.533ZM430.41 79.868c-2.798.893-5.634 3.92-5.386 7.19.249 3.27 3.104 6.126 6.202 5.737 3.098-.388 5.737-5.392 5.1-8.987-.638-3.595-3.78-4.615-5.916-3.94Zm-29.634 6.375s3.825 3.824 3.188 8.165c-.638 4.341-7.229 3.94-7.229 3.94s.982-7.401 4.041-12.105Z'
            fill='#99ADF9'
            opacity='.64'
        />
    </svg>
);

const Empty = () => {
    return (
        <div className={styles.empty_container}>
            <p className={styles.empty_title}>Nothing here...yet</p>
            <EmptySvg />
        </div>
    );
};

export const Panel = ({ log }) => {
    return (
        <>
            {log.length ? (
                log.map((en, i) => {
                    return (
                        <div className={styles.entry} key={i}>
                            {en.count > 1 ? (
                                <Badge size='small' variant={BadgeVariant.secondary} contrast>
                                    {en.count}
                                </Badge>
                            ) : (
                                ""
                            )}
                            <RenderPrimitive>{en.message}</RenderPrimitive>
                        </div>
                    );
                })
            ) : (
                <Empty />
            )}
        </>
    );
};

const RenderPrimitive = ({ children }: { children: unknown }) => {
    switch (typeof children) {
        case "boolean":
            return <Boolean>{children}</Boolean>;
        case "string":
            return <String>{children}</String>;
        case "number":
            return <Number>{children}</Number>;
        case "undefined":
            return <Undefined />;
        case "object":
            if (children === null) return <Null />;
            return (
                <>
                    {Array.isArray(children) ? (
                        <ArrayObject>{children}</ArrayObject>
                    ) : (
                        <ObjectObject>{children}</ObjectObject>
                    )}
                </>
            );
        default:
            throw new Error();
    }
};

const Boolean = ({ children }: { children: boolean }) => (
    <p className={styles.boolean}>{children.toString()}</p>
);
const String = ({ children }: { children: string }) => (
    <p className={styles.string}>&quot;{children.toString()}&quot;</p>
);
const Number = ({ children }: { children: number }) => (
    <p className={styles.number}>{children.toString()}</p>
);
const Null = () => <p className={styles.null}>null</p>;
const Undefined = () => <p className={styles.undefined}>undefined</p>;

const Arrow = ({ expanded }: { expanded: boolean }) => (
    <div className={styles.arrow} data-expanded={expanded}>
        <svg viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M0.952381 13C1.11111 13 1.2619 12.9718 1.40476 12.9155C1.54762 12.8643 1.69841 12.7927 1.85714 12.7005L11.1111 7.5251C11.4444 7.3357 11.6746 7.16932 11.8016 7.02599C11.9339 6.87753 12 6.70092 12 6.49616C12 6.2914 11.9339 6.11735 11.8016 5.97401C11.6746 5.82556 11.4444 5.65918 11.1111 5.4749L1.85714 0.29179C1.69841 0.204765 1.54762 0.135657 1.40476 0.0844654C1.2619 0.0281551 1.11111 0 0.952381 0C0.661376 0 0.428571 0.0998228 0.253968 0.299468C0.0846561 0.499114 0 0.765308 0 1.09805V11.8943C0 12.227 0.0846561 12.4932 0.253968 12.6929C0.428571 12.8976 0.661376 13 0.952381 13Z'
                fill='currentColor'
            />
        </svg>
    </div>
);

const ArrayObject = ({ children }: { children: unknown[] }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div>
            <div
                className={styles.array_header}
                tabIndex={0}
                role='button'
                onClick={() => setExpanded((s) => !s)}
            >
                {children.length > 0 && <Arrow expanded={expanded} />}
                <div className={styles.array_description}>Array ({children.length}) [</div>
                <div className={styles.array_internal}>
                    {children.map((c, i) => (
                        <>
                            {c !== null && typeof c === "object" ? (
                                Array.isArray(c) ? (
                                    <p className={styles.array_description} key={i}>
                                        ({c.length}) [...]
                                    </p>
                                ) : (
                                    <p className={styles.array_description} key={i}>
                                        {"{...}"}
                                    </p>
                                )
                            ) : (
                                <RenderPrimitive key={i}>{c}</RenderPrimitive>
                            )}

                            {i === children.length - 1 ? null : (
                                <span className={styles.array_description}>, </span>
                            )}
                        </>
                    ))}
                </div>
                <div className={styles.array_description}>]</div>
            </div>
            {expanded && children.length > 0 ? (
                <div className={styles.expanded}>
                    {children.map((c, i) => (
                        <div className={styles.array_row} key={i}>
                            <div className={styles.tnum}>{i}:</div>
                            <RenderPrimitive>{c}</RenderPrimitive>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
const ObjectObject = ({ children }: { children: any }) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <div>
            <div
                className={styles.array_header}
                tabIndex={0}
                role='button'
                onClick={() => setExpanded((s) => !s)}
            >
                <Arrow expanded={expanded} />
                <div className={styles.array_description}>Object {"{ "}</div>
                <div className={styles.array_internal}>
                    {Object.entries(children).map((c, i) => (
                        <>
                            {c[1] !== null && typeof c[1] === "object" ? (
                                Array.isArray(c[1]) ? (
                                    <>
                                        <div className={styles.array_description}>{c[0]}:</div>
                                        <p className={styles.array_description}>
                                            ({c[1].length}) [...]
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.array_description}>{c[0]}:</div>
                                        <p className={styles.array_description}>{"{...}"}</p>
                                    </>
                                )
                            ) : (
                                <>
                                    <div className={styles.array_description}>{c[0]}:</div>
                                    <RenderPrimitive key={i}>{c[1]}</RenderPrimitive>
                                </>
                            )}

                            {i === Object.entries(children).length - 1 ? null : (
                                <span className={styles.array_description}>, </span>
                            )}
                        </>
                    ))}
                </div>
                <div className={styles.array_description}>{" }"}</div>
            </div>
            {expanded ? (
                <div className={styles.expanded}>
                    {Object.entries(children).map((c, i) => (
                        <div className={styles.array_row} key={i}>
                            <div>{c[0]}:</div>
                            <RenderPrimitive>{c[1]}</RenderPrimitive>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};
