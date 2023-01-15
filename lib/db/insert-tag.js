import { getUserId } from '../get-user-id.js';

/**
 * @typedef { import( 'pg' ).Client } Client
 */

/**
 * @param { Client } client
 * @param { string } tag
 */
export async function insertTag( client, tag )
{
	const userId = getUserId();
	const result = await client.query(
		'INSERT INTO tags(user_id, name) VALUES ($1, $2) RETURNING id',
		[userId, tag],
	);
	
	return Number( result.rows[0].id );
}
