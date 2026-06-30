export function extractAgeRating(movieDetails: any): string {
  const br = movieDetails.find(
    (item: any) => item.iso_3166_1 === "BR"
  );

  return br?.release_dates?.[0]?.certification?.trim() ?? "";
}