const ctx = require("express-http-context");
const router = require("express").Router();

router.get('/', async (req, res, next) => {
    const db = ctx.get('db');
    const blogId = req.query.blog_id;

    const record = await db.blog.findFirst({
        where: {
            blog_id: blogId
        }
    });

    if (record == null) {
        res.status(404);
        res.send({
            status: 404,
            isError: true,
            message: 'No blog found'
        });
        return next();
    }

    res.status(200);
    res.send({
        ...record
    });
    return next();
});

module.exports = {
    router: router
}