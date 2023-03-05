// @ts-nocheck
import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { stories, storyTree, storyUrls, config, Entry } from "virtual:vibe";

import { Ui } from "../src/ui/index.js";

import "../vibe.scss";
import "@snowytime/css/fonts/visby/all.css";
import "@snowytime/css/presets/visby.css";

import { Context } from "./context.js";

const Main = () => {
    const memoized = React.useMemo(() => ({ stories, storyTree, config, storyUrls }), []);
    return (
        <Ui title='css-stuff' tree={storyTree}>
            <BrowserRouter>
                <Context.Provider value={memoized}>
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
                                            <React.Suspense fallback={<>loading...</>}>
                                                {React.createElement(story.component)}

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
        </Ui>
    );
};

export default Main;
