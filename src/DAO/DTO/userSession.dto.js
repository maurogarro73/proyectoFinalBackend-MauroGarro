export class userSessionDTO {
  constructor(user) {
    this.email = user.email;
    this.isAdmin = user.isAdmin;
    this.premium = user.premium;
    this.cartID = user.cart;
  }
}
