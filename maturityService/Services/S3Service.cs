using Amazon.S3;
using Amazon.S3.Model;
using System.IO;
using System.Threading.Tasks;

namespace SimpleMicroservice.Services
{
    public class S3Service
    {
        private readonly IAmazonS3 _s3Client;

        public S3Service(IAmazonS3 s3Client)
        {
            _s3Client = s3Client;
        }

        public async Task<string> UploadFileAsync(string bucketName, string key, Stream fileStream)
        {
            var putRequest = new PutObjectRequest
            {
                BucketName = bucketName,
                Key = key,
                InputStream = fileStream
            };

            var response = await _s3Client.PutObjectAsync(putRequest);
            return response.ETag;
        }
    }
}