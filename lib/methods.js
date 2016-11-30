Meteor.methods({
 categoriesAdd: function(data) {
     check(data, Object);

     Categories.insert({
       name : data.name,
       master: data.master
     });
   },
   categoriesUpdate: function(data) {
     check(data, Object);

     Categories.update({_id:data._id},{$set:{
       name : data.name,
       master: data.master
     }});
   },
});
