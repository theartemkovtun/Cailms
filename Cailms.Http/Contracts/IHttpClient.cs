using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Http.Models;

namespace Cailms.Http.Contracts
{
    public interface IHttpClient
    {
        Task<string> GetAsync(string url, IEnumerable<HttpRequestParameter> queryParameters = null, IEnumerable<HttpRequestParameter> headers = null);
        Task<T> GetAsync<T>(string url, IEnumerable<HttpRequestParameter> queryParameters = null, IEnumerable<HttpRequestParameter> headers = null);
        Task<T> PostAsync<T>(string url, object body, IEnumerable<HttpRequestParameter> headers = null);
        Task PostAsync(string url, object body, IEnumerable<HttpRequestParameter> headers = null);
    }
}