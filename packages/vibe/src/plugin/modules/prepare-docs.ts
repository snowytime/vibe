import { arrangeDocs } from "#helpers/arrange-docs.js";
import { generateRandomId } from "#helpers/gen-id.js";
import { Story } from "#types/index";

export interface DocsResult {
    docId: string;
    docPath: string | undefined;
    storyPath: string;
}

const getFamilies = (stories: Story[]) =>
    stories.reduce((accumulator: Story[], currentObject) => {
        const existingObject = accumulator.find((obj) => obj.filePath === currentObject.filePath);

        if (!existingObject) {
            accumulator.push(currentObject);
        }

        return accumulator;
    }, []);

// return the mapping of stories to docs
export const prepareDocs = (stories: Story[], docs: string[]): DocsResult[] => {
    const families = getFamilies(stories);
    const familyDocs = arrangeDocs(
        families.map((s) => s.filePath),
        docs,
        true,
    );
    return familyDocs.map((doc) => ({
        docId: `doc_${generateRandomId()}`,
        docPath: doc.docPath,
        storyPath: doc.storyPath,
    }));
};
