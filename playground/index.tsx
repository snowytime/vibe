export default {
    path: "atoms/buttons",
    status: "beta",
    active: false,
    number: 110,
    text: "Hello World",
    data: { foo: "bar" },
    nestedArray: [{ foo: "bar" }, { foo: "bar" }, { foo: "bar" }],
    arr: [1, 2, 3],
    name: "123",
};

export const Thing = () => {};
Thing.story = {
    name: "custom story name",
    number: 110,
    storySpecificData: { foo: "bar" },
};
