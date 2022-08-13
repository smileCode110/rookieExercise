// 渲染 游戏交互
function Game(snake,block,food,map){
    this.snake = snake;
    this.map = map;
    this.block = block;
    this.food = food;
    //初始化
    this.init();
    //定时器句柄
    this.timerbar = null;
    //循环的时间
    this.time = 1000;
    //游戏是否可以正常执行
    this.state = true;
}
//初始化方法
Game.prototype.init = function(){
    // 渲染地图
    this.renderMap();
    // 渲染食物
    this.renderFood();
    //渲染障碍物
    this.renderBlock();
    //渲染蛇
    this.renderSnake();
    //启动游戏
    this.start();
    //绑定事件，控制蛇的移动
    this.bindEvent();

}
// 渲染地图
Game.prototype.renderMap = function(){
    this.map.init();
}

// 渲染食物
Game.prototype.renderFood= function(){
    // 根据食物的横纵坐标，在地图中找到对应的元素，设置其背景图片
    this.map.arr[this.food.y][this.food.x].style.backgroundImage = 'url('+ this.food.img + ')';
    //console.log(this.map.arr[this.food.y][this.food.x]);
}

// 渲染障碍物
Game.prototype.renderBlock = function(){
    for(var i = 0, len = this.block.arr.length ;i < len ;i++){
        // 缓存一下数组
        var item = this.block.arr[i];
        this.map.arr[item.y][item.x].style.backgroundImage = 'url(' + this.block.img + ')';
    }
}

//渲染蛇
Game.prototype.renderSnake = function(){
    //需要特殊绘制的就是头和尾
    var head = this.snake.arr[0];
    var tail = this.snake.arr[this.snake.arr.length - 1];
    //绘制头
    this.map.arr[head.y][head.x].style.backgroundImage = 'url(' + this.snake.headImage + ')';
    //绘制身体，从第二张，绘制到倒数第二张
    for(var i = 1, len = this.snake.arr.length - 1; i < len; i++){
        //缓存身体元素
        var body = this.snake.arr[i];
        //绘制身体
        this.map.arr[body.y][body.x].style.backgroundImage = 'url(' + this.snake.bodyImage + ')';
    }
    //绘制尾巴
    this.map.arr[tail.y][tail.x].style.backgroundImage = 'url(' + this.snake.tailImage + ')';
}

// 清空地图
Game.prototype.clear = function(){
    this.map.clear();
}

//启动游戏
Game.prototype.start = function () {
    //缓存一下this
    var me = this;
    this.timerbar = setInterval(function () {
        // 移动蛇
        me.snake.move();
        //检测边界
        me.checkMap();
        //是否碰撞障碍物
        me.checkBlock();
        //是否碰撞身体
        me.checkBody();
        //是否吃到食物
        me.checkFood();
        //如果游戏在运行正常绘制
        if (me.state) {
            //清空
            me.clear();
            //重新渲染
            me.renderBlock();
            me.renderFood();
            me.renderSnake();
        }

    }, 500)
}

//绑定事件，控制蛇的移动
Game.prototype.bindEvent = function(){
    var me = this;
    document.onkeydown = function(e){
        me.snake.change(e.keyCode);
    }
}

//游戏结束
Game.prototype.gameOver = function(){
    clearInterval(this.timerbar);
    this.state = false;
    alert('您的分数是' + this.snake.arr.length + '分。');

}
//检测边界
Game.prototype.checkMap = function(){
    //判断蛇的头部
    var head  = this.snake.arr[0];
    //判断是否超出边界
    if(head.x < 0 || head.y < 0 || head.x >= this.map.col || head.y >=this.map.row){
        //终止游戏。
        this.gameOver();
    }
}

//检测障碍物
Game.prototype.checkBlock = function(){
    //获取头部
    var head = this.snake.arr[0];
    //遍历障碍物
    for(var i = 0; i < this.block.arr.length; i++){
        //比较障碍物与头部是否在同一位置
        var block = this.block.arr[i];
        if(block.x === head.x && block.y === head.y){
            this.gameOver();
            return;
        }
    }
}

//检测是否吃到食物
Game.prototype.checkFood = function(){
    //蛇的头部与食物重合
    if(this.snake.arr[0].x === this.food.x && this.snake.arr[0].y === this.food.y ){
        //蛇增长
        this.snake.growUp();
        //重置食物
        this.resetFood();
    }
}

//重置食物
Game.prototype.resetFood = function(){
    //随机一个食物的位置
    let x = parseInt(Math.random() * this.map.col);
    let y = parseInt(Math.random() * this.map.row);
    // console.log(x,y);
    //判断食物是否在障碍物上
    for(var i = 0; i < this.block.arr.length; i++){
        //缓存一个食物障碍物
        let block = this.block.arr[i];
        //判断坐标是否重合
        if(block.x === x && block.y === y){
            //重新随机食物
            this.resetFood();
            //终止执行
            return;
        }
    }
    // 判断食物是否在蛇身上
    for(var i = 0; i < this.snake.arr.length; i++){
        //缓存蛇的一个部位
        let snake = this.snake.arr[i];
        //判断坐标是否相同
        if(snake.x === x && snake.y === y){
             //重新随机食物
             this.resetFood();
             //终止执行
             return;
        }
    }
    //更改食物位置
    this.food.reset(x,y);

}

//检测碰撞身体
Game.prototype.checkBody = function(){
    //获取头部
    var head = this.snake.arr[0];
    //从第二个开始遍历
    for(var i = 1; i < this.snake.arr.length; i++){
        var body = this.snake.arr[i];
        if(body.x === head.x && body.y === head.y){
            this.gameOver();
        }
    }
}