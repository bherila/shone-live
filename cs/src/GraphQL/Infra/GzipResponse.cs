using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Shone.GraphQL.Infra {
  public static class GzipResponse {
    public static HttpResponseMessage CompressedJson(HttpRequest req, object value) {
      var res = new HttpResponseMessage(HttpStatusCode.OK);
      var encodingsAccepted = req.Headers["Accept-Encoding"];
      MemoryStream mem;
      string encoding;
      Stream compress;
      if (encodingsAccepted.Any(e => e.ToLower().Contains("gzip"))) {
        mem = new MemoryStream();
        compress = new GZipStream(mem, CompressionMode.Compress);
        encoding = "gzip";
      }
      else if (encodingsAccepted.Any(e => e.ToLower().Contains("deflate"))) {
        mem = new MemoryStream();
        compress = new DeflateStream(mem, CompressionMode.Compress);
        encoding = "deflate";
      }
      else {
        res.Content = new StringContent(JsonConvert.SerializeObject(value));
        res.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
        return res;
      }

      var writer = new StreamWriter(compress);
      writer.Write(JsonConvert.SerializeObject(value));
      writer.Flush();
      mem.Seek(0, SeekOrigin.Begin);
      res.Content = new StreamContent(mem);
      res.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
      res.Content.Headers.ContentEncoding.Clear();
      res.Content.Headers.ContentEncoding.Add(encoding);
      return res;
    }
  }
}
