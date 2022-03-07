using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Http.Contracts;
using Cailms.Http.Exceptions;
using Cailms.Http.Models;
using Newtonsoft.Json;
using RestSharp;

namespace Cailms.Http.Clients
{
    public class HttpClient : IHttpClient
    {
         private static IRestClient _client;
        
        public HttpClient()
        {
            _client = new RestClient();
        }
        
        public async Task<string> GetAsync(string url, IEnumerable<HttpRequestParameter> queryParameters = null, IEnumerable<HttpRequestParameter> headers = null)
        {
            var request = new RestRequest(url, Method.GET);
            if (queryParameters != null)
            {
                foreach (var parameter in queryParameters)
                {
                    request.AddParameter(parameter.Name, parameter.Value, ParameterType.QueryString);
                }
            }

            if (headers != null)
            {
                foreach (var header in headers)
                {
                    request.AddParameter(header.Name, header.Value, ParameterType.HttpHeader);
                }
            }
            
            return await _client.GetAsync<string>(request);
        }

        public async Task<T> GetAsync<T>(string url, IEnumerable<HttpRequestParameter> queryParameters = null, IEnumerable<HttpRequestParameter> headers = null)
        {
            var json = await GetAsync(url, queryParameters, headers);
            if (json == null)
            {
                return default;
            }

            return JsonConvert.DeserializeObject<T>(json);
        }

        public async Task<T> PostAsync<T>(string url, object body, IEnumerable<HttpRequestParameter> headers = null)
        {
            var request = new RestRequest(url, Method.POST) {RequestFormat = DataFormat.Json};
            request.AddJsonBody(body);
            
            if (headers != null)
            {
                foreach (var header in headers)
                {
                    request.AddParameter(header.Name, header.Value, ParameterType.HttpHeader);
                }
            }

            var response = await _client.ExecuteAsync<T>(request);

            if (!response.IsSuccessful)
            {
                throw new Exception(response.ErrorMessage);
            }

            return response.Data;

        }
        
        public async Task PostAsync(string url, object body, IEnumerable<HttpRequestParameter> headers = null)
        {
            var request = new RestRequest(url, Method.POST) {RequestFormat = DataFormat.Json};
            request.AddJsonBody(body);
            
            if (headers != null)
            {
                foreach (var header in headers)
                {
                    request.AddParameter(header.Name, header.Value, ParameterType.HttpHeader);
                }
            }

            var response = await _client.ExecuteAsync(request);

            if (response != null && !response.IsSuccessful)
            {
                throw new HttpException($"Post request has failed: url - {url}, reason - {response.ErrorMessage}");
            }
        }
    }
}