import { Client } from "@notionhq/client"



interface NotionPost {
    id: string;
    title: string;
    tags: Array<string>;
    date: string;
    thumbnail: string;
}

interface Tag {
    name: string;
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const getTags = (tags: Array<Tag>) => {
    const allTags = tags.map((tag) => {
        return tag.name;
    });
    return allTags;
}

export async function getAllPosts(): Promise<NotionPost[]> {
    // console.log("process.env.DATABASE_ID")
    // console.log(process.env.DATABASE_ID)
    const posts = await notion.databases.query({
        database_id: `${process.env.DATABASE_ID}`,
        page_size: 100,
    });

    const allPosts = posts.results;
    console.log("allPosts")
    console.log(allPosts)
    // const allPostsMetadata = allPosts.map((post: any) => {
    //     return {
    //         id: post.id,
    //         title: post.pro,
    //         tags: ["a","a"],
    //         date: "string",
    //         thumbnail: "string"
    //     }
    // })

    // const postMetadata = allPosts.map((post: NotionPost) => )
    return (
        [{id: "string",
        title: "string",
        tags: ["a","a"],
        date: "string",
        thumbnail: "string"},
        {id: "string",
        title: "string",
        tags: ["a","a"],
        date: "string",
        thumbnail: "string",}]
    )
    
}
