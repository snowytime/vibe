import React from "react";

export const composer = (module: any, storyName: any, data: any) => {
	let funcs: any[] = [];
	const props = {
		args: module[storyName].args,
		argTypes: module[storyName].argTypes,
		component: module[storyName],
		decorator: (Component) => <Component />
	};
	if (module[storyName] && Array.isArray(module[storyName].decorators)) {
		funcs = [...funcs, ...module[storyName].decorators];
	}
	if (module.default && Array.isArray(module.default.decorators)) {
		funcs = [...funcs, ...module.default.decorators];
	}
	// if there is no decorator or default export, just return the bare provider
	if (funcs.length === 0) {
		const ComposedDecorator = () => <ArgsProvider {...props} />;
		return ComposedDecorator;
	}
	// fun stuff
	const ComposedDecorator = () => (
		<ArgsProvider
			{...props}
			decorator={(component: React.FC) =>
				funcs.length === 1
					? funcs[0](component, data)
					: funcs.reduceRight(
							(accumulator, currentValue) => (Story: React.FC) =>
								accumulator(() => currentValue(Story, data))
					  )(component)
			}
		/>
	);
	return ComposedDecorator;
};

const ArgsProvider = ({
	component,
	decorator,
	args
}: {
	component: any;
	args: any;
	decorator: any;
}) => {
	return decorator(() => React.createElement(component, args));
};
