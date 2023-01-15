import { getUserId } from '../get-user-id.js';

/**
 * @typedef { import( 'pg' ).Client } Client
 */

/**
 * @param { Client } client
 * @param { string } name
 */
export async function insertList( client, name )
{
	const userId = getUserId();
	const result = await client.query(
		'INSERT INTO lists(user_id, name) VALUES ($1, $2) RETURNING id',
		[userId, name],
	);
	
	return Number( result.rows[0].id );
}
