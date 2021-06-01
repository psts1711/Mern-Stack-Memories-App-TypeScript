export declare class Posts {
    static getPosts(req: any, res: any): Promise<void>;
    static getPost(req: any, res: any): Promise<void>;
    static createPost(req: any, res: any): Promise<void>;
    static updatePost(req: any, res: any): Promise<any>;
    static likePost(req: any, res: any): Promise<any>;
    static deletePost(req: any, res: any): Promise<any>;
    static getPostsBySearchAndTags(req: any, res: any): Promise<void>;
}
