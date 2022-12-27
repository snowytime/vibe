# ⚡️ Vibe.js

`core`

The core module is the main building block of the Vibe environment that handles
all the hassle of parsing, preparing, nd delivering story data that is then used
to make a rendering environment via addons (custom or pre-made)

### How to use

`import ... from '@snowytime/vibe'` to get the functions you need and use them
within your custom addon. For actual usage of the cli (i.e. starting the dev
env) you'll need to `npm i @snowytime/vibe` and use the
`npx vibe dev/build/start` commands. Note that the `.vibe/vibe.config.mjs` is
required to get started as without an addon there will be no way to display your
stories

### Authoring addons

Vibe exposes a couple of neat things that make it easy to work with the api when
designing an api.

`basic structure`

```ts
export const customAddon: AddonDeclaration = () => ({
	dev: async () => {
		return {
			local: "",
			network: ""
		};
	},
	build: async () => {
		return {
			status: "",
			duration: 0,
			destination: ""
		};
	},
	start: async () => {
		return {
			local: "",
			network: ""
		};
	}
});
```

The main premise of the addon construction is that you want to create a function
that returns the addon object (dev, build, start, create functions are
returned). These functions are called by the `core` module cli and then you do
all the fun stuff within the addon an in accordance with the appropriate
framework.

`custom addon usage`

```ts
// config.vibe.mjs
import customAddon from "custom-vibe-addon";
export default {
	// .. some other config things
	// you can pass arguments into the addon and vibe will
	// trickle them down to your addon declaration where
	// you can do with them as you'd like (ui, etc.)
	addons: [customAddon()]
};
```
