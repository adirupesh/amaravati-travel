CREATE TABLE `reviews` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`package_slug` text NOT NULL,
	`reviewer_name` text NOT NULL,
	`reviewer_email` text NOT NULL,
	`rating` integer NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`travel_month` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`submitter_key` text NOT NULL,
	`created_at` text NOT NULL,
	`moderated_at` text
);
--> statement-breakpoint
CREATE INDEX `idx_reviews_status_package_created` ON `reviews` (`status`,`package_slug`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_reviews_submitter_created` ON `reviews` (`submitter_key`,`created_at`);