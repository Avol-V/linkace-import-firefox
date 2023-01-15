import { getUserId } from '../get-user-id.js';

/**
 * @typedef { import( 'pg' ).Client } Client
 */

/**
 * @param { Client } client
 */
export async function selectTags( client )
{
	const userId = getUserId();
	const result = await client.query(
		'SELECT id, name FROM tags WHERE user_id = $1',
		[userId],
	);
	
	/** @type { Map<string, number> } */
	const tags = new Map();
	
	for ( const row of result.rows )
	{
		tags.set( row.name, row.id );
	}
	
	return tags;
}
