import Snoowrap from 'snoowrap';
import { RawItem } from '../types/index.js';

export class RedditSource {
  private reddit: Snoowrap;
  private subreddits = ['Teachers', 'EdTech', 'Professors', 'education'];

  constructor(config: {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
  }) {
    this.reddit = new Snoowrap({
      userAgent: 'zaza-trends/1.0.0 (educational content analysis)',
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      username: config.username,
      password: config.password,
    });

    // Rate limiting
    this.reddit.config({ requestDelay: 1000, continueAfterRatelimitError: true });
  }

  async fetchItems(hoursBack = 72): Promise<Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[]> {
    const items: Omit<RawItem, 'id' | 'sentimentScore' | 'sentimentLabel'>[] = [];
    const cutoffTime = new Date(Date.now() - hoursBack * 60 * 60 * 1000);

    console.log(`🔍 Fetching Reddit posts from last ${hoursBack} hours...`);

    for (const subreddit of this.subreddits) {
      try {
        console.log(`  📖 Processing r/${subreddit}...`);
        
        // Fetch hot posts
        const posts = await this.reddit.getSubreddit(subreddit).getHot({ limit: 50 });
        
        for (const post of posts) {
          if (new Date(post.created_utc * 1000) < cutoffTime) continue;
          
          // Main post
          items.push({
            source: 'reddit',
            sourceMeta: {
              subreddit: `r/${subreddit}`,
              permalink: `https://reddit.com${post.permalink}`,
              counts: {
                upvotes: post.ups,
                comments: post.num_comments,
              },
            },
            text: `${post.title}\n\n${post.selftext || ''}`.trim(),
            createdAt: new Date(post.created_utc * 1000).toISOString(),
            capturedAt: new Date().toISOString(),
            lang: 'en', // Assume English for education subreddits
          });

          // Top comments
          if (post.num_comments > 0) {
            try {
              const comments = await post.comments.fetchMore({ amount: 10, sort: 'top' });
              
              for (const comment of comments.slice(0, 5)) {
                if (comment.body && comment.body !== '[deleted]' && comment.body.length > 50) {
                  items.push({
                    source: 'reddit',
                    sourceMeta: {
                      subreddit: `r/${subreddit}`,
                      permalink: `https://reddit.com${post.permalink}${comment.id}`,
                      counts: {
                        upvotes: comment.ups,
                      },
                    },
                    text: comment.body,
                    createdAt: new Date(comment.created_utc * 1000).toISOString(),
                    capturedAt: new Date().toISOString(),
                    lang: 'en',
                  });
                }
              }
            } catch (commentError) {
              console.warn(`  ⚠️  Could not fetch comments for post: ${post.id}`);
            }
          }
        }

        console.log(`  ✅ Processed r/${subreddit}: ${posts.length} posts`);
      } catch (error) {
        console.error(`❌ Error fetching from r/${subreddit}:`, error);
      }
    }

    console.log(`🎯 Reddit: Collected ${items.length} total items`);
    return items;
  }
}