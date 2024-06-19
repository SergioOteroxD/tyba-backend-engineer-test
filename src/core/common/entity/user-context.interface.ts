export interface IuserContext {
  readonly accountId: string;
  readonly sessionId: string;
  readonly exp: number;
  readonly iat: number;
}
