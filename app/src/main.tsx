import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { stories, storyTree, storyUrls, config, Entry, Context } from "virtual:vibe";

export { Context };

const Main = () => {
    const storyPoints = React.useMemo(() => ({ stories, storyTree, config, storyUrls }), []);
    return (
        <BrowserRouter>
            <Context.Provider value={storyPoints}>
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
                    {Object.values(stories).map((story) => {
                        return (
                            <Route
                                key={story.id}
                                path={story.url}
                                element={
                                    <React.Suspense>
                                        <Entry>{React.createElement(story.component)}</Entry>
                                    </React.Suspense>
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
            </Context.Provider>
        </BrowserRouter>
    );
};

export default Main;
