export function getUserId()
{
	return process.env.LINKACE_USER_ID ? Number( process.env.LINKACE_USER_ID ) : 1;
}
