using Microsoft.AspNetCore.Mvc;
using SimpleMicroservice.Services;
using System.IO;
using System.Threading.Tasks;

namespace SimpleMicroservice.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class S3Controller : ControllerBase
    {
        private readonly S3Service _s3Service;

        public S3Controller(S3Service s3Service)
        {
            _s3Service = s3Service;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is empty or not provided.");
            }

            using (var stream = file.OpenReadStream())
            {
                var result = await _s3Service.UploadFileAsync("your-bucket-name", file.FileName, stream);
                return Ok(new { ETag = result });
            }
        }
    }
}