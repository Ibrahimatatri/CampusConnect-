export function getRecommendedEvents(events, user) {
  if (!user) return events.slice(0, 3);

  return [...events]
    .map((event) => {
      let score = 0;
      if (user.interests.includes(event.category)) score += 3;
      if (user.preferredSize === event.size) score += 2;
      if (event.today) score += 1;
      return { event, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.event)
    .slice(0, 4);
}
