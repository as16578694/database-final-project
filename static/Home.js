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

function getPlaceValue(){
    place = this.value;
}

function getTypeValue(){
    type = this.value;
}

var state = 0;
//0 -> 公眾/自駕
//1 -> 區域
//2 -> 景點/餐廳/住宿
//3 -> 種類
//4 -> 若是餐廳，則多問時段，其他則3 -> 5
//5 -> 顯示搜尋結果
//6 -> 是否完成 No:回到2 Yes:回到0
var place = -1;
//0 -> spot
//1 -> restaurant
//2 -> hotel
var type = -1;

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
            createButton("東區 - 瑞芳、平溪", '60px', '200px');
            createButton("西區 - 新北市區", '60px', '200px');
            createButton("南區 - 三峽、烏來", '60px', '200px');
            createButton("北區 - 淡水、北海岸", '60px', '200px');
            break;

        case 2 :
            question.innerHTML = "<h3 class='question'>現在想安排景點、用餐、還是住宿?</h3>";

            createButton("景點",height='60px', width = '140px', setValue=true, value=0)
            createButton("用餐",height='60px', width = '140px', setValue=true, value=1)
            createButton("住宿",height='60px', width = '140px', setValue=true, value=2)
            
            buttonList = document.getElementsByClassName("choice")
            for(var i = 0; i<buttonList.length;i++)
                buttonList[i].addEventListener("click", getPlaceValue, false)
            break;

        case 3 :
            question.innerHTML = "<h3 class='question'>請選擇想要的類型</h3>";
            //spot
            if(place == 0){
                createButton("文化場館",height='60px', width = '140px', setValue=true, value=0)
                createButton("自然景觀",height='60px', width = '140px', setValue=true, value=1)
                createButton("宮廟",height='60px', width = '140px', setValue=true, value=2)
                createButton("老街、夜市",height='60px', width = '140px', setValue=true, value=3)
                state++;
            }
            //restaurant
            else if(place == 1){
                createButton("小點",height='60px', width = '140px', setValue=true, value=0)
                createButton("中式",height='60px', width = '140px', setValue=true, value=1)
                createButton("日式",height='60px', width = '140px', setValue=true, value=2)
                createButton("西式",height='60px', width = '140px', setValue=true, value=3)
                createButton("泰式",height='60px', width = '140px', setValue=true, value=4)
                createButton("港式",height='60px', width = '140px', setValue=true, value=5)
                createButton("韓式",height='60px', width = '140px', setValue=true, value=6)
                
            }
            //hotel
            else if(place == 2){
                createButton("民宿",height='60px', width = '140px', setValue=true, value=0)
                createButton("汽車旅館",height='60px', width = '140px', setValue=true, value=1)
                createButton("旅社",height='60px', width = '140px', setValue=true, value=2)
                createButton("背包客棧",height='60px', width = '140px', setValue=true, value=3)
                createButton("飯店/旅店",height='60px', width = '140px', setValue=true, value=4)
                state++;
                
            }
            buttonList = document.getElementsByClassName("choice")
            for(var i = 0; i<buttonList.length;i++)
                buttonList[i].addEventListener("click", getTypeValue, false)
            break;

        case 4:
            question.innerHTML = "<h3 class='question'>請選擇用餐時段</h3>";
            createButton("早餐",height='60px', width = '140px', setValue=true, value=0)
            createButton("午餐",height='60px', width = '140px', setValue=true, value=1)
            createButton("晚餐",height='60px', width = '140px', setValue=true, value=2)
            createButton("宵夜",height='60px', width = '140px', setValue=true, value=3)
            break;

        case 5:
            question.innerHTML = "<h3 class='question'>為您推薦的行程</h3>";
            console.log("顯示搜尋結果");
            state = 0
            break;

    }


    buttonList = document.getElementsByClassName("choice")
    for(var i = 0; i<buttonList.length;i++)
        buttonList[i].addEventListener("click", changeState, false)
    
}

createButton("大眾運輸")
createButton("自行駕駛")

var buttonList = document.getElementsByClassName("choice")
for(var i = 0; i<buttonList.length;i++)
    buttonList[i].addEventListener("click", changeState, false)