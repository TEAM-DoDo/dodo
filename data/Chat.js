export class Chat{
    constructor({id = null,userId,content,date=null}){
        this.id = id;
        this.userId = userId;
        this.content = content;
        this.date = date;
    }
}