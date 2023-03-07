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
                                        <Ui title='css-stuff' tree={storyTree} sidebar>
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
                    <Ui title='css-stuff' tree={storyTree} sidebar={false}>
                        <Entry>
                            <Story framed={false}>
                                <NoStory />
                            </Story>
                        </Entry>
                    </Ui>
                )}
            </Context.Provider>
        </BrowserRouter>
    );
};

export default Main;
