const db = new (require('@prisma/client').PrismaClient)();

async function createBlogs() {
    for (var i = 0; i < 10; i++) {
        const d = await db.blog.create({
            data: {
                blogger_id: 'f5e48cb8-6d8a-4465-ae0c-624ebb2c0efc',
                title: "hello world",
                subtitle: "hello world",
                content: {name: "ninn"}
            }
        })
    }
}
createBlogs();