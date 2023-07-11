# 🔥 Vibe

#### 👋 Intro

Vibe is the newest member of the web dev tools that help you develop components in isolation. It takes a simple and modern take on the process, favouring speed and simplicity, over complexity and bulky built in features.

#### ⚡️ Features

-   💨 Super fast story parsing
-   👩‍🎨 Completely isolated styles
-   🛠️ Server is powered by Vite
-   💪 Written completely in typescript
-   🧩 Highly customizable
-   🔮 Persistent app state serialized to url for easy sharing.

#### 👩‍🎨 Frameworks

Vibe is still in its early stages, and during the alpha stages of development when the goal for a proof of concept, the only framework supported was React. This was purely because I am far more familiar with advanced React than other frameworks. The proposal to make the standard Vibe system agnostic and have plugins for frameworks is added to the roadmap bellow.

#### 🧩 Addons

THe idea of Vibe has always been and always be focused on simplicity and ease of use. The addons system adheres to this principle, and is super important to keep Vibe extremely customizable to whatever your project might need.

In general addons have the following available to them:

-   an optional space in the toolbar
-   an optional space in the panels
-   an optional space in the panel header
-   context to provide state to the app

Addons can use two main hooks provided by Vibe: `useManager` and `useStore`. These hooks are vital to be able to participate in the Vibe addon ecosystem. The manager hook provides all sorts of helpers that you addon will need to keep to date with the Vibe state. The store hook allows the addon to tap into the custom url serializer and data memoizing mechanism.

Vibe comes shipped with a few powerful addons who are disabled by default:

-   Controls
-   Console
-   Design
-   Theme
-   Outline
-   Resize
-   Layer
-   Font Lens

In order to use these addons, make a `.vibe/addons.{js,ts,mjs}` file, and import the addons you'd like to use

```ts
import {
    outline,
    theme,
    resize,
    layers,
    console,
    design,
    controls,
    fontLens,
} from "@snowytime/vibe/client";

export default [
    outline(),
    theme({ directive: "class" }),
    resize({
        devices: [
            {
                name: "mobile",
                size: [400, 1000],
            },
        ],
    }),
    layers(),
    console(),
    design(),
    controls(),
    fontLens(),
];
```

#### 🧩 Authoring an addon

Athoring Vibe addons is super easy, and allow you to customize your Vibe experience completely. When it comes to addons there are a few things to keep in mind:

-   Addons must use React
-   When declaring styles for your addon (if it uses them) you need to add a pseudo-property to every scope: `use: vibe;`, or `use: universal;` for addons that are accessible within the story scope.

#### 🔌 Plugins

As part of the roadmap for `beta v2.0.0` plugins will be supported to customize the vibe internal story parsing and generation.

The idea behind the plugins is that they will allow for a plug and play ability to the internal vibe engine to work for all kinds of frameworks, not just React. The iframe isolates its children from the larger Vibe app that controls it.

#### 🚧 Roadmap

-   [ ] Add manager addon verification
-   [ ] Add error boundaries around stories and addon placements
-   [ ] Remove all legacy code
-   [ ] Transition all styles to use css modules
-   [ ] Allow custom logo to replace the Vibe logo
-   [ ] Update the useRegistry to be called `useManager` and update all the methods it returns.
-   [ ] Allow the useManager to return story metadata, such as config and current story data.
-   [ ] Update all types that are missing, and optimize the root files such as `Args, etc.` that are not currently using the best type support.
-   [ ] Update the console addon to be able to show Dom nodes
-   [ ] Resize Addon
-   [ ] Layers addon w/ a lens attribute to show a panel with all computed styles.
-   [ ] Font preview Addon
-   [ ] Custom plugins for frameworks (not just focused on React)
-   [ ] Fix bug in the design addon where figma is not loading properly sometimes, and handle failed fetches, and provide a refresh option.
-   [ ] Support more design files other than figma
-   [ ] Update the controls addon to only start if the addon is initialized.

#### 📚 Docs

You can access the Vibe docs at [`snowy.sh/vibe/docs`](https://www.snowy.sh/vibe/docs). In the docs you can find guides, examples, and anything else related to Vibe.
