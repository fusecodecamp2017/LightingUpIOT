var config = new AWS.Config({
  credentials: new AWS.Credentials({
    accessKeyId: '<access_key_id>',
    secretAccessKey: '<access_key>'
  }),
  region: 'us-east-1'
});