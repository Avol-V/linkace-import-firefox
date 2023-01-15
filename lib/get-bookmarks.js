/**
 * @typedef { import( '../types/firefox-bookmarks.js' ).Bookmarks } Bookmarks
 * @typedef { import( './get-bookmarks.types.js' ).ContainerWithTitles } ContainerWithTitles
 * @typedef { import( './get-bookmarks.types.js' ).BookmarkWithTitles } BookmarkWithTitles
 */

/**
 * @param { Bookmarks } bookmarks
 * @returns { Generator<BookmarkWithTitles, void, void> }
 */
export function* getBookmarks( bookmarks )
{
	/** @type { Array<ContainerWithTitles> } */
	const items = [bookmarks];
	/** @type { ContainerWithTitles | undefined } */
	let current;
	
	while ( (current = items.pop()) )
	{
		if ( current.children === undefined )
		{
			continue;
		}
		
		const currentTitles = [
			...(current.titles ?? []),
			current.title,
		];
		
		for ( const child of current.children )
		{
			if ( child.type === 'text/x-moz-place' )
			{
				if ( child.uri.startsWith( 'place:' ) )
				{
					continue;
				}
				
				/** @type { BookmarkWithTitles } */(child).titles = currentTitles;
				
				yield child;
			}
			else
			{
				/** @type { ContainerWithTitles } */(child).titles = currentTitles;
				
				items.push( child );
			}
		}
	}
}
