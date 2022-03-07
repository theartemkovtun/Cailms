namespace Cailms.Http.Models
{
    public class HttpRequestParameter
    {
        public HttpRequestParameter() {}
        public HttpRequestParameter(string name, string value)
        {
            Name = name;
            Value = value;
        }
        
        public string Name { get; set; }
        public string Value { get; set; }
    }
}