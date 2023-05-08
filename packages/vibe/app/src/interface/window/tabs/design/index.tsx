import React, { useState } from "react";
import { useSettings } from "../../../../controls";
import { Loader } from "../../../ui/loader";

import styles from "./styles.module.scss";

export const Design = ({ dragging }: { dragging: boolean }) => {
    const { story } = useSettings();
    const [loading, setLoading] = useState(true);
    return (
        <>
            {loading && (
                <div className={styles.loading}>
                    <Loader />
                </div>
            )}
            <div className={styles.frame} data-loaded={!loading}>
                {!dragging && (
                    <iframe
                        style={{
                            outline: "none",
                            border: "none",
                            flexGrow: 1,
                        }}
                        title='Design frame'
                        onLoad={() => setLoading(false)}
                        width='100%'
                        src={story.design}
                    />
                )}
            </div>
        </>
    );
};
