var color_dict = {
    "S" : "#C1AE8D",
    "H" : "#849271",
    "R" : "#7A989A"
}

function createButton(content, height = '60px', width = '140px', setValue = false, value = -1){
    var btn = document.createElement('button');
    btn.textContent = content;
    btn.style.height = height
    btn.style.width = width
    btn.style.margin = '15px'
    btn.style.fontSize = '20px'
    btn.classList.add("choice")
    if(setValue){
        btn.value = value;
    }

    document.getElementsByClassName("question area")[0].appendChild(btn);
}

function createDiv(content, height = '100px', width = '100px'){
    var btn = document.createElement('button');
    btn.textContent = value;
    btn.style.height = height
    btn.style.width = width

    btn.style.fontSize = '15px'
    btn.classList.add("schedule-item")
    btn.style.backgroundColor = color_dict[place];
    btn.value = value;
    btn.id = value;

    document.getElementsByClassName("question area")[1].appendChild(btn);
}

function getPlaceValue(){
    place = this.value;
}

function getTypeValue(){
    type = this.value;
}

function getValue(){
    value = this.value
}

function getZoneValue(){
    zone = this.value
}

var state = 0;
//0 -> 公眾/自駕
//1 -> 區域
//2 -> 景點/餐廳/住宿
//3 -> 種類
//4 -> 若是餐廳，則多問時段，其他則3 -> 5
//5 -> 顯示搜尋結果
//6 -> 繼續選擇 No:回到0 Yes:回到2
var place = -1;
//0 -> spot
//1 -> restaurant
//2 -> hotel
var type = "";
var cont = false;
var value = "";
var zone = "";
var itemCnt=0;
var schedule=[];

function changeStateNew(){
    alert("新增成功")
    var buttonList = document.getElementsByClassName("schedule-item")
    var n = buttonList.length
    for(var i=0;i<n;i++)
        buttonList[0].remove();

    scheduleJson = {};


    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/add', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
       //column1
    }));

    
    
    initial()
    state = 0
}


function changeState(){
    state++;
    var question = document.getElementsByClassName("question")[0]
    var buttonList = document.getElementsByClassName("choice")
    var n = buttonList.length
    for(var i=0;i<n;i++)
        buttonList[0].remove();
    switch(state){
        case 1:
            question.innerHTML = "<h3 class='question'>想去新北市的哪個區域?</h3>";
            createButton("東區 - 瑞芳、平溪", '60px', '200px', true, 'E');
            createButton("西區 - 新北市區", '60px', '200px', true, 'W');
            createButton("南區 - 三峽、烏來", '60px', '200px', true, 'S');
            createButton("北區 - 淡水、北海岸", '60px', '200px', true, 'N');
            for(var i = 0; i<buttonList.length;i++)
                buttonList[i].addEventListener("click", getZoneValue, false)
            break;

        case 2 :
            question.innerHTML = "<h3 class='question'>現在想安排景點、用餐、還是住宿?</h3>";

            createButton("景點",height='60px', width = '140px', setValue=true, value='S')
            createButton("用餐",height='60px', width = '140px', setValue=true, value='R')
            createButton("住宿",height='60px', width = '140px', setValue=true, value='H')
            
            buttonList = document.getElementsByClassName("choice")
            for(var i = 0; i<buttonList.length;i++)
                buttonList[i].addEventListener("click", getPlaceValue, false)
            break;

        case 3 :
            question.innerHTML = "<h3 class='question'>請選擇想要的類型</h3>";
            //spot
            if(place == 'S'){
                createButton("文化場館",height='60px', width = '140px', setValue=true, value='M')
                createButton("自然景觀",height='60px', width = '140px', setValue=true, value='N')
                createButton("宮廟",height='60px', width = '140px', setValue=true, value='T')
                createButton("老街、夜市",height='60px', width = '140px', setValue=true, value='X')
                state++;
            }
            //restaurant
            else if(place == 'R'){
                createButton("小點",height='60px', width = '140px', setValue=true, value='D')
                createButton("中式",height='60px', width = '140px', setValue=true, value='C')
                createButton("日式",height='60px', width = '140px', setValue=true, value='J')
                createButton("西式",height='60px', width = '140px', setValue=true, value='W')
                createButton("泰式",height='60px', width = '140px', setValue=true, value='T')
                createButton("港式",height='60px', width = '140px', setValue=true, value='H')
                createButton("韓式",height='60px', width = '140px', setValue=true, value='K')
                
            }
            //hotel
            else if(place == 'H'){
                createButton("民宿",height='60px', width = '140px', setValue=true, value='A')
                createButton("汽車旅館",height='60px', width = '140px', setValue=true, value='B')
                createButton("旅社",height='60px', width = '140px', setValue=true, value='C')
                createButton("背包客棧",height='60px', width = '140px', setValue=true, value='D')
                createButton("飯店/旅店",height='60px', width = '140px', setValue=true, value='E')
                state++;
                
            }
            buttonList = document.getElementsByClassName("choice")
            for(var i = 0; i<buttonList.length;i++){
                buttonList[i].addEventListener("click", getTypeValue, false)
                //若是吃的還有問題要問，跳過
                if(place != 'R'){
                    buttonList[i].addEventListener("click", nametest, false)
                }
            }
            
            
            break;

        case 4:
            question.innerHTML = "<h3 class='question'>請選擇用餐時段</h3>";
            createButton("早餐",height='60px', width = '140px', setValue=true, value='0')
            createButton("午餐",height='60px', width = '140px', setValue=true, value='1')
            createButton("晚餐",height='60px', width = '140px', setValue=true, value='2')
            createButton("宵夜",height='60px', width = '140px', setValue=true, value='3')

            buttonList = document.getElementsByClassName("choice")
            for(var i = 0; i<buttonList.length;i++)
                buttonList[i].addEventListener("click", nametest, false)
            break;

        case 5:
            question.innerHTML = "<h3 class='question'>為您推薦的行程</h3>";
            console.log("顯示搜尋結果");
            break;

        case 6:
            question.innerHTML = "<h3 class='question'>您要繼續一天的行程嗎?</h3>";
            createButton("是",height='60px', width = '140px', setValue=true, value='0');
            createButton("否",height='60px', width = '140px', setValue=true, value='1');
            buttonList = document.getElementsByClassName("choice")
            buttonList[0].addEventListener('click', changeState, false)
            buttonList[1].addEventListener('click', changeStateNew, false)
            state = 1;

    }


    buttonList = document.getElementsByClassName("choice")
    for(var i = 0; i<buttonList.length;i++)
        buttonList[i].addEventListener("click", changeState, false)
    
}

function addScheduleItem(){

    if (itemCnt == 10){
        alert("一天不要排太多行程喔!旅行是拿來放鬆的!")
    }
    else{
        itemCnt++;
        schedule.push(value)
        createDiv();
    }
    
}

function nametest() {   
    
    //send post to db
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        place : place+type,
        zone : zone
    }));
    
    
    //response value
    fetch('http://127.0.0.1:5000/name', {
      method: 'POST', // or 'PUT'
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(function(response){

        console.log('Success:', response.name)
        for (var i=0;i<response.name.length;i++){
            createButton(response.name[i], height='60px', width = '140px', setValue=true, value=response.name[i])
        }
        buttonList = document.getElementsByClassName("choice")
        for(var i = 0; i<buttonList.length;i++){
            buttonList[i].addEventListener("click", changeState, false)
            buttonList[i].addEventListener("click", getValue, false)
            buttonList[i].addEventListener("click", addScheduleItem, false)
            }
    });
}


function initial(){
    createButton("大眾運輸")
    createButton("自行駕駛")

    var buttonList = document.getElementsByClassName("choice")
    for(var i = 0; i<buttonList.length;i++)
        buttonList[i].addEventListener("click", changeState, false)
}

initial()
