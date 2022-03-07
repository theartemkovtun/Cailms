using System;

namespace Cailms.Http.Exceptions
{
    public class HttpException : Exception
    {
        public HttpException(string message) : base(message) {}
        
        public HttpException() {}
    }
}