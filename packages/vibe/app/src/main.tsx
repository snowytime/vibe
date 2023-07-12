import React, { useState } from "react";
import { ErrorPayload } from "vite";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { stories, storyTree, storyUrls, config, Entry, addons } from "virtual:vibe";

import { Vibe } from "./interface/index.js";

import { Story } from "./interface/components/frame/story/index.js";
import { NoStory } from "./interface/components/frame/no-story/index.js";
import { Loader } from "./interface/ui/loader";
import { ContextStore } from "./context/context.js";
import { VibeSettings } from "./internals/settings";
import { Manager } from "./internals/manager/index.js";
import { HOC } from "./hoc.js";
import { ErrorBoundary } from "./ui/index.js";

const Wait = () => {
    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "hsl(var(--background))",
            }}
        >
            <Loader />
        </div>
    );
};

const Main = () => {
    const [viteError, setViteError] = useState<ErrorPayload | null>(null);
    if (import.meta.hot) {
        import.meta.hot.on("vite:error", (error) => {
            setViteError(error);
            import.meta.hot.send("vibe:error");
        });
        import.meta.hot.on("vite:afterUpdate", () => {
            import.meta.hot.send("vibe:refresh");
        });
    }
    return (
        <>
            <BrowserRouter>
                <ContextStore
                    stories={stories}
                    storyTree={storyTree}
                    config={config}
                    urlMap={storyUrls}
                >
                    {Object.values(stories).length > 0 ? (
                        <Routes>
                            <Route
                                path='/'
                                element={
                                    <Navigate
                                        replace
                                        to={
                                            config.defaultStory
                                                ? config.defaultStory
                                                : Object.values(stories)[0].url
                                        }
                                    />
                                }
                            />
                            {/* no story case */}
                            {Object.values(stories).map((story) => {
                                return (
                                    <Route
                                        key={story.id}
                                        path={story.url}
                                        element={
                                            <Manager
                                                addons={addons}
                                                config={config}
                                                viteError={viteError}
                                            >
                                                <VibeSettings storyTree={storyTree} story={story}>
                                                    <Vibe>
                                                        <ErrorBoundary>
                                                            <Story>
                                                                <React.Suspense fallback={<Wait />}>
                                                                    <Entry
                                                                        story={story}
                                                                        stories={stories}
                                                                        storyTree={storyTree}
                                                                        storyUrls={storyUrls}
                                                                        config={config}
                                                                    >
                                                                        <HOC story={story} />
                                                                    </Entry>
                                                                </React.Suspense>
                                                            </Story>
                                                        </ErrorBoundary>
                                                    </Vibe>
                                                </VibeSettings>
                                            </Manager>
                                        }
                                    />
                                );
                            })}
                            <Route
                                path='*'
                                element={
                                    <Navigate
                                        replace
                                        to={
                                            config.defaultStory
                                                ? config.defaultStory
                                                : Object.values(stories)[0].url
                                        }
                                    />
                                }
                            />
                        </Routes>
                    ) : (
                        <Vibe>
                            <NoStory />
                        </Vibe>
                    )}
                </ContextStore>
            </BrowserRouter>
        </>
    );
    // return (
    //     <BrowserRouter>
    //         <Context.Provider value={memoized}>
    // {Object.values(stories).length > 0 ? (
    //     <Routes>
    //         <Route
    //             path='/'
    //             element={
    //                 <Navigate
    //                     replace
    //                     to={
    //                         config.defaultStory
    //                             ? config.defaultStory
    //                             : Object.values(stories)[0].url
    //                     }
    //                 />
    //             }
    //         />
    //         {/* no story case */}
    //         {Object.values(stories).map((story) => {
    //             return (
    //                 <Route
    //                     key={story.id}
    //                     path={story.url}
    //                     element={
    //                         <Ui
    //                             title={config.project}
    //                             tree={storyTree}
    //                             sidebar
    //                             repo={config.repo}
    //                             website={config.website}
    //                         >
    //                             <Story
    //                                 framed={!!story && config.mode === "development"}
    //                             >
    //                                 <Entry
    //                                     story={story}
    //                                     stories={stories}
    //                                     storyTree={storyTree}
    //                                     storyUrls={storyUrls}
    //                                     config={config}
    //                                 >
    //                                     <React.Suspense fallback={<>loading...</>}>
    //                                         {React.createElement(story.component)}
    //                                     </React.Suspense>
    //                                 </Entry>
    //                             </Story>
    //                         </Ui>
    //                     }
    //                 />
    //             );
    //         })}
    //         <Route
    //             path='*'
    //             element={
    //                 <Navigate
    //                     replace
    //                     to={
    //                         config.defaultStory
    //                             ? config.defaultStory
    //                             : Object.values(stories)[0].url
    //                     }
    //                 />
    //             }
    //         />
    //     </Routes>
    // ) : (
    //     <Ui
    //         title={config.project}
    //         tree={storyTree}
    //         sidebar={false}
    //         repo={config.repo}
    //         website={config.website}
    //     >
    //         <Story framed={false}>
    //             <Entry>
    //                 <NoStory />
    //             </Entry>
    //         </Story>
    //     </Ui>
    // )}
    //         </Context.Provider>
    //     </BrowserRouter>
    // );
};

export default Main;
