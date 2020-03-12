class User {
  //   constructor(name) {
  //     this._name = name;
  //   }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName.substr(0, 1).toUpperCase() + newName.substr(1);
  }
}

const user = new User('cat');
console.log(user.name);
user.name = 'dog';
console.log(user.name);

console.log(JSON.stringify('anton.synytsi"a@gmail.com'));
