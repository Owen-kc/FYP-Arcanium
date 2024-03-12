const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// Initialize the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Function to generate a pre-signed URL for uploads
async function generateUploadURL(fileName, fileType) {
  const bucketName = process.env.AWS_BUCKET_NAME;
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: fileType,
  });

  // Generate the pre-signed URL
  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // expires in 1 hour
  return uploadURL;
}

module.exports = { s3Client, generateUploadURL };
