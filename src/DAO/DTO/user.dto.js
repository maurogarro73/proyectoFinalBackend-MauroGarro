export class userDTO {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.isAdmin = user.isAdmin;
    this.premium = user.premium;
  }
}
