import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { stories, storyTree, config, Entry, Context } from "virtual:vibe";
export { Context };

const Main = () => {
	return (
		<BrowserRouter>
			<Context.Provider value={{ stories, storyTree }}>
				<Entry>
					<Routes>
						<Route
							path="/"
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
											{React.createElement(
												story.component
											)}
										</React.Suspense>
									}
								/>
							);
						})}
					</Routes>
				</Entry>
			</Context.Provider>
		</BrowserRouter>
	);
};

export default Main;
