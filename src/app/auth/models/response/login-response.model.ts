export class LoginResponseModel {
  public token: string;

  constructor(token: string) {
    this.token = token;
  }
}