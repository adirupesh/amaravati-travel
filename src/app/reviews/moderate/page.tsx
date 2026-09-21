import { env } from "cloudflare:workers";
import { PageIntro } from "@/components/page-intro";
import { ReviewModeration } from "@/components/review-moderation";
import { chatGPTSignInPath, getChatGPTUser } from "@/app/chatgpt-auth";
import { PendingReview } from "@/lib/reviews";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Review moderation",
  robots: { index: false, follow: false },
};

export default async function ModerateReviews() {
  const user = await getChatGPTUser();
  if (!user)
    return (
      <>
        <PageIntro
          eyebrow="PRIVATE MODERATION"
          title="Review approvals"
          description="Sign in to manage submitted traveller reviews."
        />
        <section className="section container moderation-gate">
          <a
            className="button"
            href={chatGPTSignInPath("/reviews/moderate/")}
            target="_top"
          >
            Sign in with ChatGPT
          </a>
        </section>
      </>
    );
  const adminId = (env as unknown as { REVIEW_ADMIN_USER_ID?: string })
    .REVIEW_ADMIN_USER_ID;
  if (!adminId || user.userId !== adminId)
    return (
      <>
        <PageIntro
          eyebrow="PRIVATE MODERATION"
          title="Access unavailable"
          description="This moderation page is restricted to the site owner."
        />
      </>
    );
  let reviews: PendingReview[] = [];
  if (env.DB) {
    const result = await env.DB.prepare(
      "SELECT id, package_slug AS packageSlug, reviewer_name AS reviewerName, reviewer_email AS reviewerEmail, rating, title, body, travel_month AS travelMonth, created_at AS createdAt FROM reviews WHERE status = 'pending' ORDER BY created_at ASC LIMIT 100",
    ).all<PendingReview>();
    reviews = result.results;
  }
  return (
    <>
      <PageIntro
        eyebrow="PRIVATE MODERATION"
        title="Review approvals"
        description="Approve genuine traveller experiences before they appear on the public reviews page."
      />
      <section className="section container">
        <ReviewModeration initialReviews={reviews} />
      </section>
    </>
  );
}
