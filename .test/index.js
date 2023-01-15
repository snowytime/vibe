const main = (html) => {
    html = html.replace("m", "meep");
    return html;
};
const val = main("m allo");
console.log(val);
