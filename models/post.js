
function Posts(post) {
  this.post = post;

  var fields = [
    { title: { required: true }},
    { text: { required: true }}
  ];

  // var validation = function() {

  // }

  Posts.prototype.validation = function() {
    console.log('validation!');
    console.log(this.post);
    console.log(fields.length);

    for(i=0; i < fields.length; i++) {
      console.log(fields[i]);
      
    }

  }
}

module.exports = Posts;
