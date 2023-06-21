<style>
.badge {
    padding: 0 8px;
    border: 2px solid currentColor;
    border-radius: 200px;
    font-size: 12px;
    align-self: flex-start;
    position: absolute;
    left: 100%;
    white-space: nowrap;
}
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 6px;
    position: relative;
}
.title {
    font-size: clamp(30px, 40px, 40px);
    font-weight: 900;
}
</style>

<section style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
    <img src="./vibe.svg" style="width: 60px;">
    <div class="container">
        <div class="title">Vibe</div>
    <div class="badge">alpha</div>
    </div>
</section>

<!-- Start docs -->

### 👋 I'm Vibe

### ⚡️ Features

### 📕 Why not Storybook?

### ⚠️ Heads-up

Vibe is written completely in esm and so if you are using it in a commonjs project there may be some issues experienced. This is not a sure thing but a minor possibility. For more info on esm and esm only development check out this article.

### 🧩 Addons

### 👩‍🎨 Frameworks

Vibe is still in its early stages, and during the alpha stages of development when the goal for a proof of concept, the only framework supported was React. This was purely because I am far more familiar with advanced React than other frameworks. The proposal to make the standard Vibe system agnostic and have plugins for frameworks is added to the roadmap bellow.

### 🔌 Plugins

As part of the roadmap for `beta v2.0.0` plugins will be supported to customize the vibe internal story parsing and generation.

### 🚧 Roadmap

### 📚 Docs

You can access the Vibe docs at [`snowy.sh/vibe/docs`](https://www.snowy.sh/vibe/docs). In the docs you can find guides, examples, and anything else related to Vibe.
