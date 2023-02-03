db = new (require("@prisma/client").PrismaClient)();

const TABLE_NAMES = ["blogger", "blog", "comment"];

const TABLES = {
  blogger: db.blogger,
  blog: db.blog,
  comment: db.comment,
};

async function deleteRecords() {
  for (let i of TABLE_NAMES.reverse()) {
    const v = await TABLES[i].deleteMany();
    console.log("delete records in ", i);
  }
}

async function getDefaultObject(name, i) {
  switch (name) {
    case "blogger":
      return {
        blogger_name: "blogger_" + i,
        first_name: "john_" + i,
        last_name: "doe_" + i,
        email: "john" + i + "@example.com",
        pw_hash: "jhfsdfk_" + i,
      };
    case "blog":
      return {
        blogger_id: await getBlogger(),
        title: "asjhdslsd",
        content: {
          heading: "doid",
          main: "SDKhg",
        },
      };
    case "comment":
      return {
        blogger_id: await getBlogger(),
        blog_id: await getBlog(),
        content: "dfhksdvdfhjvgk",
      };
  }
}

async function getBlogger() {
  const blogger = await TABLES['blogger'].findFirst();
  return blogger.blogger_id;
}

async function getBlog() {
  const blog = await TABLES['blog'].findFirst();
  return blog.blog_id;
}

async function createRecords(name) {
  let table = TABLES[name];
  const records = await table.findMany();
  if (records.length > 0) return;
  for (let i = 0; i < 10; i++) {
    const data = await getDefaultObject(name, i);
    const t = await table.create({
      data: data,
    });
  }
}

async function insertRecords() {
  for (let i of TABLE_NAMES) {
    const x = await createRecords(i);
    console.log(`Records for ${i}`);
  }
}

const arg = process.argv.slice(1)[1];

async function handleArgs(arg) {
  console.log(`${arg}`);
  if (arg === "create"){
    console.log(`Records creating`);
    const v = await insertRecords(); 
    console.log(`Records created `);
  }
  if (arg === 'delete') {
    const v = await deleteRecords();
    console.log(`Records deleted`);
  }
  return 0;
} 

handleArgs(arg);