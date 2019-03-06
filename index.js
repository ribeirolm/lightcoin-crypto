let balance = 500.00;


class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    for (let t of this.transactions) {
      balance += t.value;
    };
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}


class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (!this.isAllowed()) {
      return false
    } else {
      this.time = new Date();
      this.account.addTransaction(this);
      return true;
    }


  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    return (this.account.balance - this.amount >=0);
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}







// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account("billybob");

console.log('Starting balance: ', myAccount.balance);


const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account balance:', myAccount.balance);

const t2 = new Deposit(1.11, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account balance:', myAccount.balance);


const t3 = new Withdrawal(1.11, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending balance: ', myAccount.balance);

console.log('Account transaction history:', myAccount.transactions);

// const myAccount = new Account("snow-patrol");

// t1 = new Withdrawal(50.25, myAccount);
// t1.commit();
// console.log('Transaction 1:', t1);

// t2 = new Withdrawal(9.99), myAccount;
// t2.commit();
// console.log('Transaction 2:', t2);

// console.log('Balance:', balance);

// t3 = new Deposit(120.00, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3);
