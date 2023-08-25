import {Injectable, Logger, NestMiddleware} from "@nestjs/common";
import {NextFunction} from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');
    use(req: Request, res: Response, next: NextFunction) {
        const { method, url, body } = req;
        this.logger.log(`[REQ] ${method} ${url} ${JSON.stringify(body)}`);

        next();
    }
}
