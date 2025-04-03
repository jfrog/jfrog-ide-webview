import { PageType } from '../../../model'

const sastSuppressExample = `\`\`\`javascript 
// Javascript Example 
export: (req, res) => {
    res = set_cors(req, res)
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    payload = Buffer.from(req.body.data, "base64");
    // jfrog-ignore
    var data = serialize.unserialize(payload.toString());
\`\`\``
const secretsSuppressExample = '```javascript \n// jfrog-ignore \nconst api_key = "2VTHzn1mKZ..."'

const iacSuppressExample = `\`\`\`hcl
// kms_key_id is not set example
# jfrog-ignore
resource "aws_cloudtrail" "vulnerable_example" {
  s3_bucket_name = "dummy"
  name           = "dummy"
}
\`\`\``

export const suppressionExamplesDict: Partial<Record<PageType, string>> = {
	[PageType.Sast]: sastSuppressExample,
	[PageType.Secrets]: secretsSuppressExample,
	[PageType.IaC]: iacSuppressExample
}
