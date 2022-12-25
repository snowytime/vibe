import { Avatar, AvatarProps } from "./avatar.js";
import React from "react";

export default {
	title: "atoms/avatar",
	meta: {
		platform: ["ios", true, 12],
		update: "2022-12-22"
	},
	component: Avatar,
	decorators: [
		(Story) => (
			<div style={{ background: "orange" }}>
				hi
				<Story />
			</div>
		)
	]
};

const Template = (args: AvatarProps) => <Avatar {...args} />;

export const Basic = Template.bind({});
(Basic.args as AvatarProps) = {
	name: "Some name",
	src: "google.com",
	alt: "some name"
};
Basic.storyName = "Basic Example";
Basic.meta = {
	device: "ios",
	items: ["ios", true, 12]
};

const ComplexTemplate = (args: AvatarProps) => {
	return (
		<div>
			<Template {...args} />
		</div>
	);
};
export const Complex = ComplexTemplate.bind({});
(Complex.args as AvatarProps) = {
	name: "Some name",
	src: "google.com",
	alt: "some names"
};
Complex.storyName = "Complex examples";
