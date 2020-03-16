import { Middleware } from 'koa'
declare function mid(ctx: any, next: () => Promise<any>): Middleware
declare namespace mid {}
export = mid
