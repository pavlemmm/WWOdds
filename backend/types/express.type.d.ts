import { IJwtPayload } from "./jwtPayload.type";

declare global  {
    namespace Express {
        interface Request {
            user?: IJwtPayload;
        }
    }
}
