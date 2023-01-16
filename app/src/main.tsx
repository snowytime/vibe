import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { stories, storyTree, storyUrls, config, Entry } from "virtual:vibe";

export const Context = React.createContext(undefined);

const Main = () => {
    const storyPoints = React.useMemo(() => ({ stories, storyTree, config, storyUrls }), []);
    return (
        <BrowserRouter>
            <Context.Provider value={storyPoints}>
                <Entry>
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
                                            {React.createElement(story.component)}
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
                </Entry>
            </Context.Provider>
        </BrowserRouter>
    );
};

export default Main;
