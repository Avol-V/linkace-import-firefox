import { getUserId } from '../get-user-id.js';

/**
 * @typedef { import( 'pg' ).Client } Client
 * @typedef { import( './insert-link.types.js' ).LinkRecord } LinkRecord
 */

/**
 * @param { Client } client
 * @param { LinkRecord } link
 */
export async function insertLink( client, link )
{
	const userId = getUserId();
	const icon = (
		(
			link.icon
			&& ( link.icon.length < 191 )
		)
		? link.icon
		: null
	);
	const result = await client.query(
		`INSERT INTO
			links(user_id, url, title, created_at, updated_at, icon)
		VALUES
			($1, $2, $3, $4, $5, $6)
		RETURNING id`,
		[userId, link.url, link.title, link.createdAt, link.updatedAt, icon],
	);
	
	return Number( result.rows[0].id );
}
