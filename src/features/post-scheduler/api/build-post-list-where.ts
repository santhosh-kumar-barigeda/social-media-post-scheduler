import { endOfDay, parseISO, startOfDay } from 'date-fns';
import type { PostFilters } from '../types/post';
import { toPlatformsKey } from '../utils/post-rules';

/**
 * json-server only lets `_where` combine conditions with `or`, and it cannot look inside the
 * `platforms` array, so platforms are matched against the `platformsKey` string instead.
 * `_where` replaces the plain query params, so every filter has to be expressed here.
 */
export function buildPostListWhere({ platforms, status, search, from, to }: PostFilters) {
  const where: Record<string, unknown> = {};

  if (status) where.status = { eq: status };
  if (search) where.content = { contains: search };
  if (from || to) {
    where.scheduledAt = {
      ...(from && { gte: startOfDay(parseISO(from)).toISOString() }),
      ...(to && { lte: endOfDay(parseISO(to)).toISOString() }),
    };
  }
  if (platforms?.length) {
    where.or = platforms.map((platform) => ({
      platformsKey: { contains: toPlatformsKey([platform]) },
    }));
  }

  return where;
}
