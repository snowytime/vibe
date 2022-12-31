export const Base = () => {
	return (
    <>
      But why not this thing
      <Avatar />
    </>
  );
}
Base.config = {
  storyName: 'Base Avatar',
  description: 'base avatar example with basic configuration',
  path: 'atoms/avatar',
  version: '1',
  arguments: {
    src: 'google.com/images/random-pic',
    loading: false,
    name: 'Adam West'
  },
  decorators: [
    ({ Component }) => <Component />
  ]
}

export const Base2 = () => {
  return (
    <>
      {" "}
      hi there
      <Avatar />
    </>
  );
};