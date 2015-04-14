/*** @jsx React.DOM */
userId = "nicolsondsouza";
var followListReact = new React.createClass({
	getInitialState: function(){
		// var follow = [];
		// var user = Session.get("inbox");
		// var imageId = Session.get("imageId");
		// if(user && user.follow){
		// 	follow = user.follow;
		// }
		return {
			follow: Session.get("follow")
		}
	},
	componentDidMount: function(){
		var self = this;
		Tracker.autorun(function(){
			self.setState({follow: Session.get("follow")})
			// var user = WI.findOne({
			// 	"_id": userId,
			// });
			// var imageId = Session.get("imageId");
			// if(user && user.follow){
			// 	self.setState({follow: Session.get("follow")})
			// }
		});
	},
	"onClickFollow": function(currentFollow){
		var follow = this.state.follow;
		// console.log(currentFollow)
		for(var i=0,il=follow.length;i<il;i++){
			if(follow[i]._id == currentFollow._id){
				follow[i].active = "active";
			}
			else{
				follow[i].active = "";	
			}
		}
		this.setState({follow: follow})
		// console.log(this);
		// this.setState({})
	},
	"render": function(){
		var self = this;	
		followlist = this.state.follow.map(function(follow){
			return <followReact follow={follow} onClickFollow={self.onClickFollow}/>
		})
		return( 
			<div className="ui tiny images">
				{followlist}
			</div>
		)
		
	}
});
Follow.followListReact = followListReact;

var followReact = new React.createClass({
	"onClickFollow": function(){
		this.props.onClickFollow(this.props.follow);
		Session.set("sender",this.props.follow);
		// console.log(this.props.onClickFollow)
	},
	"render": function(){
			// console.log(this.props)
			var className = "ui small images "+(this.props.follow.active||"");
			return( 
				<img className={className} src={this.props.follow.profile_picture} onClick={this.onClickFollow}/>
			)
	}
});
Follow.followReact = followReact;

Template.followPackage.rendered = function(){
	React.renderComponent(<followListReact />, document.getElementById('followPackage'))
}