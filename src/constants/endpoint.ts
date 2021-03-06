// Define ENDPOINT 
export const BASE_ENDPOINT = "/api";

export const SERVER_STATUS_ENDPOINT = BASE_ENDPOINT + "/server-status";

export const BOOKMARKS_ENDPOINT_BASE = BASE_ENDPOINT + "/bookmarks";

export const BOOKMARKS_ENDPOINT_ADD = BOOKMARKS_ENDPOINT_BASE + "/add";

export const BOOKMARKS_ENDPOINT_UPDATE = BOOKMARKS_ENDPOINT_BASE + "/update";

export const BOOKMARKS_ENDPOINT_DELETE = BOOKMARKS_ENDPOINT_BASE + "/delete/:id";

export const BOOKMARKS_ENDPOINT_GETBYTAG = BOOKMARKS_ENDPOINT_BASE + "/bytag/:tag";

export const BOOKMARKS_ENDPOINT_GETBYID = BOOKMARKS_ENDPOINT_BASE + "/:id";

export const TAGS_ENDPOINT_BASE = BASE_ENDPOINT + "/tags";

export const TAGS_ENDPOINT_SEARCH = TAGS_ENDPOINT_BASE + "/search/:substring";