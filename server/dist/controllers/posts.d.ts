export declare class Posts {
    static getPost(req: any, res: any): Promise<void>;
    static createPost(req: any, res: any): Promise<void>;
    static updatePost(req: any, res: any): Promise<any>;
    static likePost(req: any, res: any): Promise<any>;
    static deletePost(req: any, res: any): Promise<any>;
}
