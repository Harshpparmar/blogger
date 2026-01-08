import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { prisma } from "../lib/prisma.js";

const checkPostOwnership = (post, userId, userRole) => {
    if (userRole !== "ADMIN" && post.authorId !== userId) {
        throw new ApiError(403, "You are not authorized to perform this action");
    }
};

const validateSlug = (slug) => {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
};


const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await prisma.post.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                posts,
                "Posts fetched successfully"
            )
        );
});

const getPostBySlug = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const post = await prisma.post.findFirst({
        where: { slug }
    });

    if (!post) {
        throw new ApiError("Post not found", 404);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                post,
                "Post fetched successfully"
            )
        );
});

const createPost = asyncHandler(async (req, res) => {
    const { title, content, slug } = req.body;
    const authorId = req.user.id;

    if (!title?.trim() || !slug?.trim() || !content?.trim()) {
        throw new ApiError(400, "Title, slug and content are required");
    }

    if (title.length > 200) {
        throw new ApiError(400, "Title must be less than 200 characters");
    }

    if (!validateSlug(slug)) {
        throw new ApiError(400, "Slug must be lowercase alphanumeric with hyphens only");
    }

    if (slug.length > 100) {
        throw new ApiError(400, "Slug must be less than 100 characters");
    }

    const existingPost = await prisma.post.findFirst({
        where: { slug }
    });

    if (existingPost) {
        throw new ApiError(400, "Post with this slug already exists");
    }

    const post = await prisma.post.create({
        data: {
            title: title.trim(),
            slug: slug.trim(),
            content: content.trim(),
            authorId,
            published: false
        }
    });

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                post,
                "Post created successfully"
            )
        );
});

const updatePost = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, content, slug } = req.body;

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    });

    if (!post) {
        throw new ApiError("Post not found", 404);
    }

    checkPostOwnership(post, req.user.id, req.user.role);

    // Check if new slug conflicts with existing post
    if (slug && slug !== post.slug) {
        const existingPost = await prisma.post.findFirst({
            where: { slug }
        });

        if (existingPost) {
            throw new ApiError("Slug already exists", 400);
        }
    }

    const updatedPost = await prisma.post.update({
        where: { id },
        data: {
            ...(title && { title }),
            ...(content && { content }),
            ...(slug && { slug })
        }
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedPost,
                "Post updated successfully"
            )
        );
});

const deletePost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    });

    if (!post) {
        throw new ApiError("Post not found", 404);
    }

    checkPostOwnership(post, req.user.id, req.user.role);

    await prisma.post.delete({
        where: {
            id
        }
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Post deleted successfully"
            )
        );
});

const publishPost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    });

    if (!post) {
        throw new ApiError("Post not found", 404);
    }

    // checkPostOwnership(post, req.user.id, req.user.role);

    const publishedPost = await prisma.post.update({
        where: {
            id
        },
        data: {
            published: true
        }
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                publishedPost,
                "Post published successfully"
            )
        );
});

const unpublishPost = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
        where: {
            id
        }
    });

    if (!post) {
        throw new ApiError("Post not found", 404);
    }

    // checkPostOwnership(post, req.user.id, req.user.role);

    const unpublishedPost = await prisma.post.update({
        where: {
            id
        },
        data: {
            published: false
        }
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                unpublishedPost,
                "Post unpublished successfully"
            )
        );
});

export {
    getAllPosts,
    getPostBySlug,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    unpublishPost
}