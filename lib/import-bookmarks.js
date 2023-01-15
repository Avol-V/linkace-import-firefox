import { getBookmarks } from './get-bookmarks.js';
import { insertLinkList } from './db/insert-link-list.js';
import { insertLinkTag } from './db/insert-link-tag.js';
import { insertLink } from './db/insert-link.js';
import { insertList } from './db/insert-list.js';
import { insertTag } from './db/insert-tag.js';
import { selectLists } from './db/select-lists.js';
import { selectTags } from './db/select-tags.js';

/**
 * @typedef { import( 'pg' ).Client } Client
 * @typedef { import( '../types/firefox-bookmarks.js' ).Bookmarks } Bookmarks
 */

/**
 * @param { Client } client
 * @param { Bookmarks } bookmarks
 * @param { string } [fromUrl]
 */
export async function importBookmarks( client, bookmarks, fromUrl )
{
	const tags = await selectTags( client );
	const lists = await selectLists( client );
	let counter = 0;
	let skipMode = Boolean( fromUrl );
	
	for ( const bookmark of getBookmarks( bookmarks ) )
	{
		if ( skipMode )
		{
			if ( bookmark.uri !== fromUrl )
			{
				continue;
			}
			
			skipMode = false;
		}
		
		console.log( '→', bookmark.uri );
		
		const linkId = await insertLink(
			client,
			{
				url: bookmark.uri,
				title: bookmark.title,
				icon: bookmark.iconUri,
				createdAt: new Date( bookmark.dateAdded / 1000 ),
				updatedAt: new Date( bookmark.lastModified / 1000 ),
			},
		);
		
		const list = bookmark.titles?.join( '/' ) || '';
		
		if ( !lists.has( list ) )
		{
			const listId = await insertList( client, list );
			
			lists.set( list, listId );
		}
		
		const listId = lists.get( list );
		
		if ( listId )
		{
			await insertLinkList( client, linkId, listId );
		}
		
		const linkTags = bookmark.tags?.split( ',' ).map( ( item ) => item.trim() ) ?? [];
		
		for ( const tag of linkTags )
		{
			if ( !tags.has( tag ) )
			{
				const tagId = await insertTag( client, tag );
				
				tags.set( tag, tagId );
			}
			
			const tagId = tags.get( tag );
			
			if ( tagId )
			{
				await insertLinkTag( client, linkId, tagId );
			}
		}
		
		counter++;
	}
	
	return counter;
}
