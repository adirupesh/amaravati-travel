export type PublicReview = {
  id: number;
  packageSlug: string;
  reviewerName: string;
  rating: number;
  title: string;
  body: string;
  travelMonth: string | null;
  createdAt: string;
};

export type PendingReview = PublicReview & { reviewerEmail: string };

export function stars(rating: number) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

export function displayReviewDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
