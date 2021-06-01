declare class Middleware {
    static authCheck(req: any, res: any, next: any): Promise<void>;
}
export default Middleware;
