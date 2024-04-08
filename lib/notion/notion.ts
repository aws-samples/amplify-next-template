const { Client } = require("@notionhq/client")

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

interface NotionPost {
    id: string;
    title: string;
    tags: Array<string>;
    date: string;
    thumbnail: Array<string>;
}

interface Tag {
    name: string;
}


export async function getAllPosts(): Promise<NotionPost[]> {
    console.log("process.env.DATABASE_ID")
    console.log(process.env.DATABASE_ID)
    const response = await notion.databases.query({
        database_id: process.env.DATABASE_ID,
        sorts: [
            {
                property: 'date',
                direction: 'descending',
            },
        ]
    })

    const getTags = (tags: Array<Tag>) => {
        const allTags = tags.map((tag) => {
            return tag.name;
        });

        return allTags;
    }


    const posts = response.results
    const postsProperties = posts.map((post:any) => {
        return {
            id : post.id,
            title : post.properties.title.title[0]?.plain_text,
            tags: getTags(post.properties.tag.multi_select),
            date: post.properties.date.date.start,
            thumbnail: post.properties.thumbnail
        }
    })

    return postsProperties
}
