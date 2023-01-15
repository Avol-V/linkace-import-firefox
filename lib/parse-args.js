/**
 * @typedef { import( './parse-args.types.js' ).ParsedArgs } ParsedArgs
 */

/**
 * @param { ReadonlyArray<string> } args
 */
export function parseArgs( args )
{
	/** @type { ParsedArgs } */
	const parsed = Object.create( null );
	
	parsed._ = [];
	
	for ( const arg of args )
	{
		const matches = /^--(\w+)=(.*)/.exec(arg);
		
		if ( !matches )
		{
			parsed._.push( arg );
			
			continue;
		}
		
		const [, key = '', value = ''] = matches;
		
		parsed[key] = value;
	}
	
	return parsed;
}
