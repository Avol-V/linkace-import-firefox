/**
 * @typedef { import( 'pg' ).Client } Client
 */

/**
 * @param { Client } client
 * @param { number } linkId
 * @param { number } tagId
 */
export async function insertLinkTag( client, linkId, tagId )
{
	await client.query(
		'INSERT INTO link_tags(link_id, tag_id) VALUES ($1, $2)',
		[linkId, tagId],
	);
}
