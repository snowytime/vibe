import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Badge } from "../../../ui/badge";

export const Console = ({ log }: { log: { message: string; count: number }[] }) => {
    return (
        <div>
            {log.map((en, i) => {
                return (
                    <div className={styles.entry} key={i}>
                        {en.count > 1 ? <Badge size='small'>{en.count}</Badge> : ""}
                        <RenderPrimitive>{en.message}</RenderPrimitive>
                    </div>
                );
            })}
        </div>
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
        case "object":
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
    <p className={styles.string}>{children.toString()}</p>
);
const Number = ({ children }: { children: number }) => (
    <p className={styles.number}>{children.toString()}</p>
);

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
                            {typeof c === "object" ? (
                                Array.isArray(c) ? (
                                    <p className={styles.array_description}>({c.length}) [...]</p>
                                ) : (
                                    <p className={styles.array_description}>{"{...}"}</p>
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
                            {typeof c[1] === "object" ? (
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
