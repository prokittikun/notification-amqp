export interface IMailhogService {
  sendMail(to: string[], subject: string, body: string): Promise<void>;
}
