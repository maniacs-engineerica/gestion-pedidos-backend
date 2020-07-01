import purchases from "../data/purchases.js";

export default class PurchaseHelper {
  static getOrCreate(user, id) {
    if (user.isAdmin || id >= 0){
      return purchases.find(p => p.id == id)
    }
    let purchase = purchases.find(p => p.client.id == user.id && p.status == 3);
    if (!purchase) {
      purchase = this.create(user)
      purchases.push(purchase);
    }
    return purchase;
  }
  static getCurrent(user) {
    let purchase = purchases.find(p => p.client.id == user.id && p.status == 3);
    if (purchase) {
      return purchase;
    }
    purchase = this.create(user);
    purchases.push(purchase);
    return purchase;
  }

  static create(user) {
    return {
      id: purchases.length,
      client: user,
      status: 3,
      items: []
    };
  }

}