function Chat(chatNum,index,context){
    this.chatNum = chatNum;
    this.index = index;
    this.context = context;
}
function Alarm(index,title,context){
    this.index = index;
    this.title = title;
    this.context = context;
}
function DoInfo(index,title,category,pos,date){
    this.index = index;
    this.title = title;
    this.category = category;
    this.pos = pos;
    this.date = date;
}
export const ChatParticipantsDummy = [
    1,2,3,4
]
export const ChatDummy = [
    new Chat(1,1,'안녕하세요 홍기표 입니다'),
    new Chat(2,1,'이번에 이 채팅방에 참여하게 되었습니다.'),
    new Chat(3,2,'반갑습니다 열심히 활동해 주세요. 반갑습니다 열심히 활동해 주세요. 반갑습니다 열심히 활동해 주세요. 반갑습니다 열심히 활동해 주세요. 반갑습니다 열심히 활동해 주세요. 반갑습니다 열심히 활동해 주세요. 반갑습니다 열심히 활동해 주세요. 반갑습니다 열심히 활동해 주세요. 반갑습니다 열심히 활동해 주세요.'),]
export const AlarmDummy = [
    new Alarm(1,'알림 제목입니다.','이 문자열이 알림의 내용이 될 겁니다.'),
    new Alarm(2,'두번째 알림 입니다.','이 문자열이 두번째 알림의 내용이 될 것 입니다.'),
    new Alarm(3,'세번째 알림입니다','간단하게 내용을 추가해 보았습니다. 간단하게 내용을 추가해 보았습니다. 간단하게 내용을 추가해 보았습니다. 간단하게 내용을 추가해 보았습니다. 간단하게 내용을 추가해 보았습니다. 간단하게 내용을 추가해 보았습니다.')
]
export const DoInfoDummy = [
    new DoInfo(1,"카페 탐사대","스터디","서울시 삼성동",0),
    new DoInfo(2,"테스트 데이터","운동","서울시 중계동",0),
    new DoInfo(3,"세번째 테스트 데이터","독서","서울시 하계동",0),
]