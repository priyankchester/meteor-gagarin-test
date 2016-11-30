describe("categories publication", function() {
  var app = meteor({flavor: 'fiber'});
  var client = ddp(app, {flavor: 'fiber'});

  it("should publish all users", function() {
    app.execute(function() {
      var categories = [
        { name: "Jon", master: "Don" },
        { name: "John", master:"Don" },
        { name: "Trevin", master: "Don" }
      ];
      Meteor.call("categoriesAdd", categories[0]);
      Meteor.call("categoriesAdd", categories[1]);
      Meteor.call("categoriesAdd", categories[2]);
   });

   client.subscribe("categoriesList");
   var categories = client.collection('categories');
   expect(Object.keys(categories).length).to.equal(3);
  });
});

describe("categoriesOwnedByName publication", function() {
  var app = meteor({flavor: 'fiber'});
  var client = ddp(app, {flavor: 'fiber'});

  it("should only publish all users", function() {
    app.execute(function() {
      var categories = [
        { name: "Jon", master: "Don" },
        { name: "John", master:"Don" },
        { name: "Trevin", master: "Don" }
      ];
      Meteor.call("categoriesAdd", categories[0]);
      Meteor.call("categoriesAdd", categories[1]);
      Meteor.call("categoriesAdd", categories[2]);
   });

   client.subscribe("categoriesOwnedByName", ["Jon"]);
   var johnsCategories = client.collection("categories");
   expect(Object.keys(johnsCategories).length).to.equal(1);
  });
});

describe("categoriesOwnedByNames publication", function() {
  var app = meteor({flavor: 'fiber'});
  var client = ddp(app, {flavor: 'fiber'});

  it("should only publish all users", function() {
    app.execute(function() {
      var categories = [
        { name: "Jon", master: "Don" },
        { name: "John", master:"Don" },
        { name: "Trevin", master: "Don" }
      ];
      Meteor.call("categoriesAdd", categories[0]);
      Meteor.call("categoriesAdd", categories[1]);
      Meteor.call("categoriesAdd", categories[2]);
   });

   client.subscribe("categoriesOwnedByNames", ["Jon", "John"]);
   var johnsCategories = client.collection("categories");
   expect(Object.keys(johnsCategories).length).to.equal(2);
  });
});

describe("categoriesOwnedByMaster publication", function() {
  var app = meteor({flavor: 'fiber'});
  var client = ddp(app, {flavor: 'fiber'});

  it("should only publish a specific users category by master", function() {
    app.execute(function() {
      var categories = [
        { name: "Jon", master: "Don" },
        { name: "John", master:"Don" },
        { name: "Trevin", master: "Don" }
      ];
      Meteor.call("categoriesAdd", categories[0]);
      Meteor.call("categoriesAdd", categories[1]);
      Meteor.call("categoriesAdd", categories[2]);
   });

   client.subscribe("categoriesOwnedByMaster", ["Don"]);
   var johnsCategories = client.collection("categories");
   expect(Object.keys(johnsCategories).length).to.equal(3);
  });
});

describe("categoriesOwnedByOwnerOrMaster publication", function() {
  var app = meteor({flavor: 'fiber'});
  var client = ddp(app, {flavor: 'fiber'});

  it("should only publish a specific users category by master", function() {
    app.execute(function() {
      var categories = [
        { name: "Jon", master: "Tom" },
        { name: "John", master:"Tim" },
        { name: "Trevin", master: "Jon" }
      ];
      Meteor.call("categoriesAdd", categories[0]);
      Meteor.call("categoriesAdd", categories[1]);
      Meteor.call("categoriesAdd", categories[2]);
   });

   client.subscribe("categoriesOwnedByOwnerOrMaster", ["Jon"]);
   var johnsCategories = client.collection("categories");
   expect(Object.keys(johnsCategories).length).to.equal(2);
  });
});
