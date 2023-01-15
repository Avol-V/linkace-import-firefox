/**
 * @typedef { import( 'pg' ).Client } Client
 */

/**
 * @param { Client } client
 * @param { number } linkId
 * @param { number } listId
 */
export async function insertLinkList( client, linkId, listId )
{
	await client.query(
		'INSERT INTO link_lists(link_id, list_id) VALUES ($1, $2)',
		[linkId, listId],
	);
}
