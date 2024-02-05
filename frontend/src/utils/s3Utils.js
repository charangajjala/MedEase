function generateS3ImageUrl(imageKey) {
  const bucketName = "medeaseportal-bucket";
  const region = "us-east-2";

  return `https://${bucketName}.s3.${region}.amazonaws.com/${imageKey}`;
}

export default generateS3ImageUrl;
