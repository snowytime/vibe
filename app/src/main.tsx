import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { stories, storyTree, storyUrls, config, Entry } from "virtual:vibe";

import { Context } from "./context.js";

const Main = () => {
    return (
        <BrowserRouter>
            {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
            <Context.Provider value={{ stories, storyTree, config, storyUrls }}>
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
