import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  users: defineTable({
    telegramId: v.string(),
    username: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    balance: v.number(),
    referralCode: v.string(),
    referredBy: v.optional(v.string()),
    referralCount: v.number(),
    lastDailyBonus: v.optional(v.number()),
    walletAddress: v.optional(v.string()),
    depositAmount: v.number(),
    isWalletActivated: v.boolean(),
    joinedAt: v.number(),
    isVerified: v.boolean(),
  })
    .index("by_telegram_id", ["telegramId"])
    .index("by_referral_code", ["referralCode"]),

  transactions: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("signup"), v.literal("referral"), v.literal("daily"), v.literal("deposit"), v.literal("withdrawal")),
    amount: v.number(),
    description: v.string(),
    timestamp: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_timestamp", ["timestamp"]),

  withdrawals: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    walletAddress: v.string(),
    status: v.union(v.literal("pending"), v.literal("completed"), v.literal("failed")),
    requestedAt: v.number(),
    processedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"]),

  adminMessages: defineTable({
    fromUserId: v.id("users"),
    message: v.string(),
    timestamp: v.number(),
    isRead: v.boolean(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_read_status", ["isRead"]),

  cryptoPrices: defineTable({
    symbol: v.string(),
    name: v.string(),
    price: v.number(),
    change24h: v.number(),
    lastUpdated: v.number(),
  })
    .index("by_symbol", ["symbol"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
