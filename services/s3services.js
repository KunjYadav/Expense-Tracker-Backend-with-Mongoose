const AWS = require('aws-sdk');

const uploadToS3 = (data, filename) => {
    const BUCKET_NAME = 'expensetracking143';
    const IAM_USER_KEY = process.env.IAM_KEY_ID;
    const IAM_USER_SECRET = process.env.IAM_SECRET_KEY;

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,
    })

    var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL: 'public-read'
    }

    return new Promise((resolve, reject) => {
        s3Bucket.upload(params, (err, s3response) => {
            if (err) {
                console.log("Something went wrong", err);
                reject(err);
            } else {
                // console.log("success", s3response);
                resolve(s3response.Location);
            }
        })
    })
};

module.exports = {
    uploadToS3
}