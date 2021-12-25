﻿using System;

namespace Cailms.Domain.Helpers.Attributes
{
    public class QueryParamNameAttribute : Attribute
    {
        public string Name { get; set; }

        public QueryParamNameAttribute(string name)
        {
            Name = name;
        }
    }
}