export class Schedule{
    constructor({id,title,startTime,endTime,place,detail,doId,cost}){
        
        this.id = id;
        this.title = title;
        this.startTime = startTime;
        this.endTime = endTime;
        this.place = place;
        this.detail = detail;
        this.doId = doId;
        this.cost = cost;
    }
}