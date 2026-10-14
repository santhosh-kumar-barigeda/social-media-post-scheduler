# API Contract

REST API for posts. JSON in, JSON out, no authentication. Base path: `/api`.

The API is mocked in the browser with MSW (see [ARCHITECTURE.md](ARCHITECTURE.md#mock-api)), so there is no server. The frontend is written against this contract, so a real backend could replace the mock without changing the app.

## Post

```ts
{
  id: string;
  content: string;
  platforms: ('x' | 'instagram' | 'tiktok' | 'facebook')[];
  mediaUrl?: string | null;
  scheduledAt: string; // ISO 8601, UTC
  status: 'scheduled' | 'published' | 'failed';
  errorMessage?: string | null;
}
```

## Endpoints

### List posts

`GET /api/posts`

Returns the posts that match all the filters given, oldest `scheduledAt` first.

**Query params** (all optional)

| Param      | Description                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| `page`     | Page number, starting at 1 (default `1`)                                             |
| `perPage`  | Items per page (default `10`)                                                        |
| `status`   | `scheduled`, `published` or `failed`                                                 |
| `q`        | Search text, matched against `content` (case-insensitive)                            |
| `platform` | Repeat for several: `platform=x&platform=facebook`. Matches posts on **any** of them |
| `from`     | Only posts scheduled at or after this UTC ISO timestamp                              |
| `to`       | Only posts scheduled at or before this UTC ISO timestamp                             |

**Response** `200`

```json
{
  "data": [/* Post[] */],
  "page": 1,
  "perPage": 10,
  "total": 36,
  "totalPages": 4,
  "nextPage": 2
}
```

`total` counts all matching posts, not just this page. `nextPage` is `null` on the last page. A `page` past the last one returns the last page.

### Status counts

`GET /api/posts/stats`

**Response** `200`

```json
{ "total": 36, "scheduled": 32, "published": 2, "failed": 2 }
```

Counts cover all posts, regardless of any filters.

### Get a post

`GET /api/posts/:id`

**Response** `200`: a `Post`. `404` if not found.

### Create a post

`POST /api/posts`

**Request body**

```json
{
  "content": "Hello",
  "platforms": ["x"],
  "scheduledAt": "2030-01-01T10:00:00.000Z",
  "status": "scheduled",
  "mediaUrl": "https://example.com/image.jpg"
}
```

`mediaUrl` is optional.

**Response** `201`: the created `Post`, with a server-generated `id`. `400` if the body is not a JSON object.

### Update a post

`PATCH /api/posts/:id`

**Request body**: any subset of the `Post` fields (send `null` to clear one).

```json
{ "content": "Updated", "mediaUrl": null, "status": "scheduled", "errorMessage": null }
```

**Response** `200`: the updated `Post`. `400` if the body is not a JSON object, `404` if not found.

### Delete a post

`DELETE /api/posts/:id`

**Response** `200`: the deleted `Post`. `404` if not found.

## Not an endpoint

**Retry a failed post** is simulated in the client: wait 1 second, fail 20% of the time, otherwise `PATCH /api/posts/:id` with `{ "status": "scheduled", "errorMessage": null }`.

## Errors

Error responses have the body `{ "error": "<message>" }`. The client turns a failure into an `Error` with a readable message, such as `Request failed (404)`.
