var toUser = {
	  "_id": "nicolsondsouza",
	  "inbox": [],
	  "outbox": [],
	  "follow": []
	};
var fromUser = {
  "_id": "eliasmoosman",
  "inbox": [],
  "outbox": [],
  "follow": []
}
DummyData = {
  "_id": "mTFJJYEMHscg62HdP",
  "from_user": fromUser._id,
  "to_user": toUser._id,
  "picture_low": "http://i.imgur.com/DM4ZEp8.jpg"
}

if(Meteor.isServer){
	Meteor.publish(null,function(){
		return W.find({});
	});
	Meteor.publish(null,function(){
		return WI.find({});
	});

	WI.remove({});
	W.remove({});

	

	WI.insert(fromUser);
	WI.insert(toUser);

	// Unionize.connect(DummyData);
	var follow = {};
	follow.profile_picture = "http://i.imgur.com/dZE9CXY.jpg";
	follow._id = Random.id();
	WI.update(toUser._id,{$push: {"follow": follow}});
}
if(Meteor.isClient){
	Tinytest.add("Follow - Check if follow has DOM in data",function(test,next){
		
		// Session.set("imageId",DummyData._id);
		// setTimeout(function(){
		var DomElement = React.renderComponentToString(Follow.followListReact(null))
		// console.log(DomElement.match("DM4ZEp8")[0])
		test.equal(DomElement.match("dZE9CXY")[0],"dZE9CXY", "didn't found image");
		// if(next)
		// 	next();
		// },1000);
	});
}
