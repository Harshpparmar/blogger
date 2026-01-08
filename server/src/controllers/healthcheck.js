import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { prisma } from "../lib/prisma.js";

const healthcheck = asyncHandler(async (req, res) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {
                        status: "ok",
                        database: "connected",
                        timestamp: new Date().toISOString()
                    },
                    "Server is healthy"
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(
                new ApiResponse(
                    500,
                    {
                        status: "error",
                        database: "disconnected",
                        timestamp: new Date().toISOString()
                    },
                    "Database connection failed"
                )
            );
    }
});

export { healthcheck };