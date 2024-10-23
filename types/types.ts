interface TagType {
    id: string;
    name: string;
}

interface TagArticleType {
    id: string;
    tag: TagType;
}

interface CommentType {
    id: string;
    text: string;
    userId: string;
    createdAt: Date;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ArticleWithTagsAndComments {
    id: string;
    title: string;
    createdAt: Date; // Accepter Date au lieu de string
    tags: TagArticleType[];
    text: string;
    slug: string;
    comments: CommentType[];
}