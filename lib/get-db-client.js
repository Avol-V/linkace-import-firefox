import pg from 'pg';

export function getDbClient()
{
	if ( process.env.DB_CONNECTION !== 'pgsql' )
	{
		throw new Error( 'Only PostgreSQL database supported' );
	}
	
	return new pg.Client({
		host: process.env.DB_HOST,
		port: process.env.DB_PORT ? Number( process.env.DB_PORT ) : undefined,
		database: process.env.DB_DATABASE,
		user: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
	});
}
