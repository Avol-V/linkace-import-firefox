import type {
	ItemContainer,
	ItemPlace,
} from '../types/firefox-bookmarks.js';

export type ContainerWithTitles = ItemContainer & {
	titles?: Array<string>,
};

export type BookmarkWithTitles = ItemPlace & {
	titles?: Array<string>,
};
