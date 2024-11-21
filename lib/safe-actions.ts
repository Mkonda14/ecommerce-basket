import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from "next-safe-action";

import { currentUser } from "@/actions/auth";
import { db } from "./db";
import { z } from "zod";

export class ActionError extends Error {}

export const actionClient = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return {
        serverError: e.message
      };
    }

    return {
      serverError: DEFAULT_SERVER_ERROR_MESSAGE
    };
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
});

export const authAdminAction = actionClient.use(async ({ next }) => {
  try {
    const session = await currentUser();
    if (!session?.id) {
      throw new ActionError("Invalid session");
    }

    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (user?.role !== "ADMIN") {
      throw new ActionError("Action allowed for admin only");
    }

    return next({ ctx: { userId: user.id } });
  } catch (error) {
    console.error("Middleware error:", error);
    throw new ActionError(`${error}`);
  }
});
