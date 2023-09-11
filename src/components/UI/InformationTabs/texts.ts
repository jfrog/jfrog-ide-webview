export const eosSuppressExample = `\`\`\`javascript 
// Javascript Example 
export: (req, res) => {
    res = set_cors(req, res)
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    payload = Buffer.from(req.body.data, "base64");
    // jfrog-ignore
    var data = serialize.unserialize(payload.toString());
\`\`\``
export const secretsSuppressExample =
	'```javascript \n// jfrog-ignore \nconst api_key = "2VTHzn1mKZ..."'
