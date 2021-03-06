function hhmCtrl(socket){
    var self = this;
    
    this.testEmail = function(email){
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    socket.on('comments',(data)=>{self.comments=data;if(data.length==0){self.isNoComments=true;}});
    
    this.isValid=true;
    this.isSuccessComment=false;
    this.change = function(n,e,c){
        if(n!==undefined&&self.testEmail(e)&&c!==undefined&&c!==''&&n!==''&&e!==''){
            socket.emit('newComment',{'name':n,'mail':e,'text':c});
            self.comment = '';
            self.isValid=true;
            self.isSuccessComment=true;
            self.isNoComments=false;
        } else {
            self.isValid=false;
            self.isSuccessComment=false;
        }
    }
    socket.on('newCommentFromDb',(newComment)=>{self.comments.push(newComment);console.log(self.comments)});
    
}