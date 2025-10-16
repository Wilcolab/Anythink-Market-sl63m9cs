/**
 * @file routes/api/comments.js
 * @module routes/api/comments
 *
 * Express router handling comment-related API endpoints.
 * Uses the Mongoose "Comment" model (mongoose.model('Comment')) to access comment documents.
 *
 * Routes:
 *   GET /         - Fetch all comments
 *     @name GetComments
 *     @route GET /
 *     @returns {Object[]} 200 - Array of comment objects
 *     @throws {500} Internal Server Error - Failed to fetch comments
 *
 *   DELETE /:id   - Delete a single comment by its ID
 *     @name DeleteComment
 *     @route DELETE /:id
 *     @param {string} id.path - Mongoose ObjectId string identifying the comment to delete
 *     @returns {void} 204 - No Content when deletion succeeds
 *     @returns {Object} 404 - { error: "Comment not found" } when no document matches the provided id
 *     @throws {500} Internal Server Error - Failed to delete comment
 *
 * Export:
 *   @exports {Router} - Express Router configured with the above routes
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

router.get("/", async (req, res) => {
    try {
        const comments = await Comment.find();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

//add another endpoint for deleting a comment
router.delete("/:id", async (req, res) => {
    try { 
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

module.exports = router;
