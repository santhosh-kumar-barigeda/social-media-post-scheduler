# API Contract

Mock REST API served by json-server. Base URL: `http://localhost:3001`. JSON in, JSON out. No authentication.

## Post

```ts
{
  id: string;
  content: string;
  platforms: ('x' | 'instagram' | 'tiktok' | 'facebook')[];
  platformsKey?: string; // e.g. ",x,facebook,": lets the server filter by platform
  mediaUrl?: string | null;
  scheduledAt: string; // ISO 8601, UTC
  status: 'scheduled' | 'published' | 'failed';
  errorMessage?: string | null;
}
```

## Endpoints

### List posts

`GET /posts`

**Query params**

| Param       | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| `_page`     | Page number, starting at 1                                  |
| `_per_page` | Items per page                                              |
| `_sort`     | Field to sort by, ascending (the app uses `scheduledAt`)    |
| `_where`    | URL-encoded JSON filter object (all filters go in this one) |

`_where` example (every key is optional, `or` matches any listed platform):

```json
{
  "status": { "eq": "failed" },
  "content": { "contains": "launch" },
  "scheduledAt": { "gte": "2026-10-15T00:00:00.000Z", "lte": "2026-10-15T23:59:59.999Z" },
  "or": [
    { "platformsKey": { "contains": ",x," } },
    { "platformsKey": { "contains": ",facebook," } }
  ]
}
```

**Response** `200`

```json
{
  "first": 1,
  "prev": null,
  "next": 2,
  "last": 4,
  "pages": 4,
  "items": 36,
  "data": [/* Post[] */]
}
```

### Get a post

`GET /posts/:id`

**Response** `200`: a `Post`. `404` if not found.

### Create a post

`POST /posts`

**Request body**

```json
{
  "content": "Hello",
  "platforms": ["x"],
  "platformsKey": ",x,",
  "scheduledAt": "2030-01-01T10:00:00.000Z",
  "status": "scheduled",
  "mediaUrl": "https://example.com/image.jpg"
}
```

`mediaUrl` is optional.

**Response** `201`: the created `Post`, with a server-generated `id`.

### Update a post

`PATCH /posts/:id`

**Request body**: any subset of the `Post` fields (send `null` to clear one).

```json
{ "content": "Updated", "mediaUrl": null, "status": "scheduled", "errorMessage": null }
```

**Response** `200`: the updated `Post`. `404` if not found.

### Delete a post

`DELETE /posts/:id`

**Response** `200`: the deleted `Post`. `404` if not found.

## Not an endpoint

- **Retry a failed post** is simulated in the client: wait 1 second, fail 20% of the time, otherwise `PATCH /posts/:id` with `{ "status": "scheduled", "errorMessage": null }`.
- **Status counts** are three `GET /posts?status=<status>&_page=1&_per_page=1` requests; the count is `items` in each response.
