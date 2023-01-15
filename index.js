import { readFile } from 'node:fs/promises';
import dotenv from 'dotenv';
import { parseArgs } from './lib/parse-args.js';
import { getDbClient } from './lib/get-db-client.js';
import { importBookmarks } from './lib/import-bookmarks.js';

/**
 * @typedef { import( './types/firefox-bookmarks.js' ).Bookmarks } Bookmarks
 */

async function main()
{
	const args = parseArgs( process.argv.slice( 2 ) );
	
	const bookmarksPath = args.bookmarks || args._[0];
	
	if ( !bookmarksPath )
	{
		console.log(
			`Usage:
With LinkAce .env in current working directory:
	${process.argv[0]} ${process.argv[1]} bookmarks.json
Or:
	${process.argv[0]} ${process.argv[1]} --bookmarks=bookmarks.json

With path to LinkAce .env file:
	${process.argv[0]} ${process.argv[1]} --env=/path/to/.env bookmarks.json
Or:
	${process.argv[0]} ${process.argv[1]} --env=/path/to/.env --bookmarks=bookmarks.json

To start from specific URL:
	${process.argv[0]} ${process.argv[1]} bookmarks.json --from=https://example.com
`,
		);
		
		process.exit( 1 );
	}
	
	const jsonData = await readFile( bookmarksPath, 'utf8' );
	/** @type { Bookmarks } */
	const bookmarks = JSON.parse( jsonData );
	
	bookmarks.title = 'Firefox';
	
	dotenv.config({
		path: args.env,
	});
	
	const client = getDbClient();
	
	await client.connect();
	
	try
	{
		const importedCount = await importBookmarks( client, bookmarks, args.from );
		
		console.log( `Imported ${importedCount} bookmarks` );
	}
	finally
	{
		await client.end();
	}
}

main()
	.catch(
		( error ) =>
		{
			console.error( error );
			process.exit( 1 );
		},
	);
