import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { stories, storyTree, storyUrls, config, Entry } from "virtual:vibe";

import { Ui } from "../src/ui/index.js";

import "@snowytime/css/fonts/visby/all.css";
import "@snowytime/css/presets/visby.css";

import { Context } from "./context.js";
import { Story } from "./story/story.js";

const Main = () => {
    const memoized = React.useMemo(() => ({ stories, storyTree, config, storyUrls }), []);
    return (
        <BrowserRouter>
            <Context.Provider value={memoized}>
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
                                    <Ui title='css-stuff' tree={storyTree}>
                                        <Entry>
                                            <Story active={!!story}>
                                                <React.Suspense fallback={<>loading...</>}>
                                                    {React.createElement(story.component)}
                                                </React.Suspense>
                                            </Story>
                                        </Entry>
                                    </Ui>
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
