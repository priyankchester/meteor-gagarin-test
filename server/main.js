import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {

});

Meteor.publish("categoriesList", () => {
  return Categories.find();
});

Meteor.publish("categoriesOwnedByName", (owner) => {
  check(owner, String);
  return Categories.find({
    name: "Jon"
  });
});

Meteor.publish("categoriesOwnedByNames", (owner1, owner2) => {
  check(owner1, String);
  check(owner2, String);
  return Categories.find({
    $or: [
      {name: owner1},
      {name: owner2},
    ]
  });
});

Meteor.publish("categoriesOwnedByMaster", (owner) => {
  check(owner, String);
  return Categories.find({
    master: owner
  });
});

Meteor.publish("categoriesOwnedByOwnerOrMaster", (owner) => {
  check(owner, String);
  return Categories.find({
    $or: [
      {name: owner},
      {master: owner}
    ]
  });
});
