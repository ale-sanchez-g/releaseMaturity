using Amazon.S3;
using Amazon.S3.Transfer;
using System.IO;
using System.Threading.Tasks;

namespace SimpleMicroservice.Services
{
    public class S3Service
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public S3Service(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];
        }

        public async Task UploadFileAsync(string key, Stream fileStream)
        {
            var fileTransferUtility = new TransferUtility(_s3Client);

            await fileTransferUtility.UploadAsync(fileStream, _bucketName, key);
        }

        // Additional methods like DownloadFileAsync, DeleteFileAsync can be added here
    }
}
