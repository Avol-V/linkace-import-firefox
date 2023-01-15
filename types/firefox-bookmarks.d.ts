export type ItemCommon = {
	guid: string,
	title: string,
	index: number,
	dateAdded: number,
	lastModified: number,
	id: number,
	typeCode: number,
};

export type ItemContainer = ItemCommon & {
	type: 'text/x-moz-place-container',
	root: string,
	children?: Array<Item>,
};

export type ItemPlace = ItemCommon & {
	type: 'text/x-moz-place',
	uri: string,
	tags?: string,
	iconUri?: string,
};

export type Item = ItemContainer | ItemPlace;

export type Bookmarks = ItemContainer;
