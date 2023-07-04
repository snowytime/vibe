import { DocsResult } from "./prepare-docs";

export const docModule = (docsData: DocsResult[]) => {
    let docsImport = "";

    docsData.forEach((doc) => {
        if (!doc.docPath) return;
        docsImport += `\n${`
	const ${doc.docId} = lazy(() => import('${doc.docPath}').then((module) => {
	        return { default: module.default };
	    })
	);
	`}`;
    });
    return docsImport;
};
