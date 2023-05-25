export class Chat{
    constructor({id = null,username,content,date=null}){
        this.id = id;
        this.username = username;
        this.content = content;
        this.date = date;
    }
}