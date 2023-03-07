import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { stories, storyTree, storyUrls, config, Entry } from "virtual:vibe";

import { Ui } from "../src/ui/index.js";

import "@snowytime/css/fonts/visby/all.css";
import "@snowytime/css/presets/visby.css";

import { Context } from "./context.js";
import { Story } from "./story/story.js";
import { NoStory } from "./story/no-story.js";

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
                                    Object.values(stories).length === 0
                                        ? "/"
                                        : config.defaultStory
                                        ? config.defaultStory
                                        : Object.values(stories)[0].url
                                }
                            />
                        }
                    />
                    {/* no story case */}
                    {Object.values(stories).length === 0 ? (
                        <Route
                            path='/'
                            element={
                                <Ui title='css-stuff' tree={storyTree} sidebar={false}>
                                    <Entry>
                                        <Story framed={false}>
                                            <NoStory />
                                        </Story>
                                    </Entry>
                                </Ui>
                            }
                        />
                    ) : (
                        Object.values(stories).map((story) => {
                            return (
                                <Route
                                    key={story.id}
                                    path={story.url}
                                    element={
                                        <Ui
                                            title='css-stuff'
                                            tree={storyTree}
                                            sidebar={Object.values(stories).length > 1}
                                        >
                                            <Entry>
                                                <Story
                                                    framed={
                                                        !!story && config.mode === "development"
                                                    }
                                                >
                                                    <React.Suspense fallback={<>loading...</>}>
                                                        {React.createElement(story.component)}
                                                    </React.Suspense>
                                                </Story>
                                            </Entry>
                                        </Ui>
                                    }
                                />
                            );
                        })
                    )}
                    <Route
                        path='*'
                        element={
                            <Navigate
                                replace
                                to={
                                    Object.values(stories).length === 0
                                        ? "/"
                                        : config.defaultStory
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
