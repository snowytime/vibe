export default {
    path: 'atoms/avatars',
    name: 'snaer',
    age: 24,
    active: false,
    tags: [1, true, 'nee', null, { name: 'Noi' }],
    decorator: ({ Component }) => (
        <>
            <h6>Family Decorator</h6>
            <Component />
        </>
    ),
    meta: {
        name: 'Snaer',
        details: {
            age: 25
        }
    }
}

// story
export const First = () => {
    return (
        <>
            <h1>Hello world</h1>
        </>
    )
}
First.vibe = {
    name: 'First Example',
    active: true,
    decorator: ({ Component }) => (
        <>
            <h6>Story specific decorator</h6>
            <Component />
        </>
    )
}

export const Second = () => {
    return (
        <>
            <h1>Hello world 2</h1>
        </>
    )
}
Second.vibe = {
    name: 'Second Example',
    decorator: ({ Component }) => (
        <>
            <h6>Story specific decorator #2</h6>
            <Component />
        </>
    )
}