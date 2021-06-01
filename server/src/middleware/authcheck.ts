import * as jwt from 'jsonwebtoken';

class Middleware{
    static async authCheck(req,res, next){
        try {
            const token:any = req.headers.authorization.split(" ")[1];
            const isCustomAuth:any  = token.length<500;
            let decodedData:any;
            if(token && isCustomAuth){
                decodedData = jwt.verify(token,'test');
                req.userId = decodedData?.id;
            }else {
                decodedData = jwt.decode(token);
                req.userId = decodedData?.sub;
            }
            next();
        }catch (e) {
            console.log(e);
        }
    }
}

export default Middleware;