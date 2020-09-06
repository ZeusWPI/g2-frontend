import { Route, VueRouter } from "vue-router/types/router";

export class SearchUtil {
    /**
     * Open the search page for a given set of options.
     * @param router Current router instance.
     * @param options Object with options. Strings can also contain search items in string form, such as 'Project:"Haldis"'
     */
    static async openSearch(
        router: VueRouter,
        options: { strings: string; keywords: string[]; projects: string[]; tags: string[] }
    ): Promise<Route> {
        let query = "";

        // Add the strings to the query.
        query += options.strings ? `${options.strings} ` : "";

        // Add the strings to the query.
        query += options.keywords ? `${options.keywords.join()} ` : "";

        // Add the projects to the query.
        query += options.projects ? `${options.projects.map(s => `project:"${s}"`).join()} ` : "";

        // Add the tags to the query.
        query += options.tags ? `${options.tags.map(s => `tag:"${s}"`).join()} ` : "";

        // Clean up the query, cleaning start & end spaces + double spaces.
        query = query.trim();
        query = query.replace(/ {2,}/g, " ");

        // Open the search page.
        return this.openSearchString(router, query);
    }

    /**
     * Open the search page for a given string containing options.
     * @param router Current router instance.
     * @param query Options as a string.
     */
    static async openSearchString(router: VueRouter, query: string): Promise<Route> {
        // Open the search page.
        return router.push({
            name: "Search",
            query: {
                q: encodeURI(query)
            }
        });
    }
}
