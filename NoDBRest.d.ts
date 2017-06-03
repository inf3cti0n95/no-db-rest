/// <reference types="express" />
import { Request, Response, NextFunction } from 'express';
export declare function NoDBRest(filepath: string): (request: Request, response: Response, next: NextFunction) => void;
