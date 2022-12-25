import { Button, ButtonProps } from "./button.js";
import React from "react";

export default {
	meta: {
		platform: ["ios", "macos"]
	},
	component: Button,
	decorators: [
		(Story) => (
			<div style={{ background: "green", padding: "60px" }}>
				<Story />
			</div>
		)
	]
};

const Template = (args: ButtonProps) => <Button {...args} />;

export const Basic = Template.bind({});
(Basic.args as ButtonProps) = {
	children: "click me now!"
};
Basic.meta = {
	device: "ios now"
};

const ComplexTemplate = (args: ButtonProps) => {
	return (
		<div>
			<Template {...args} />
		</div>
	);
};
export const ComplexStory = ComplexTemplate.bind({});
(ComplexStory.args as ButtonProps) = {
	children: "click me"
};
ComplexStory.storyName = "Complex Button Example";
