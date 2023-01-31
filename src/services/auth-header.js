export default function authHeader(currAccToken) {
    if (currAccToken) {
        const splitToken = currAccToken.split('|')
        const accessToken = splitToken[1]
        return {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Access-Control-Origin': '*.js*'
            }
        }
    } else {
        return {
            headers: {
                'Authorization': null,
                'Access-Control-Origin': '*.js*'
            }
        };
    }
}