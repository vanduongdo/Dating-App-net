using System;
using System.Text.Json;

namespace API.Helpers;

public static class HttpExtensions
{
    public static void AddPaginationHeaer<T>(this HttpResponse response, PagedList<T> pagedList)
    {
        var paginationHeader = new PaginationHeader(pagedList.CurrentPage, pagedList.PageSize, pagedList.TotalCount, pagedList.TotalPages);
        var jsonOptions = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        response.Headers.Append("Pagination", JsonSerializer.Serialize(paginationHeader, jsonOptions));
        response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
    }
}
