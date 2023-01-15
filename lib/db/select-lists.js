import { getUserId } from '../get-user-id.js';

/**
 * @typedef { import( 'pg' ).Client } Client
 */

/**
 * @param { Client } client
 */
export async function selectLists( client )
{
	const userId = getUserId();
	const result = await client.query(
		'SELECT id, name FROM lists WHERE user_id = $1',
		[userId],
	);
	
	/** @type { Map<string, number> } */
	const lists = new Map();
	
	for ( const row of result.rows )
	{
		lists.set( row.name, row.id );
	}
	
	return lists;
}
