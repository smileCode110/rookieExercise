function Snake(img){
    //存储坐标 
    this.arr = [
        {x: 6, y: 4},
        {x: 5, y: 4},
        {x: 4, y: 4},
    ]
    //存储图片
    this.img = img;
    // this.headImage = img.head;
    // this.bodyImage = img.body;
    // this.tailImage = img.tail;

    //键值：左：37 上：38  右：39 下：40
    // 默认方向向右
    this.direction = 39
    this.headImage = this.img.head[this.direction - 37];
    this.bodyImage = this.img.body;
    this.tailImage = this.img.tail[this.direction - 37];
    // 是否可以改变方向
    this.lock = false;

    

}

// 让蛇移动
//最后一个删除，在前面添加一个 即可实现移动
Snake.prototype.move = function(){
    //创建一个新的头部
    var iteam = { x: this.arr[0].x, y:this.arr[0].y };
    //判断方向
    switch(this.direction){
        //向左 
        case 37:
            // y不变，x减1
            iteam.x -= 1;
            break;
        //向上
        case 38:
        // x不变，y减1
            iteam.y -= 1;
            break;
        //向右
        case 39:
            // y不变,x加1
            iteam.x += 1;
            break;
        //向下 
        case 40:
            //x不变，y加1
            iteam.y += 1;
            break;
        default:
            break;

    }
    //删除尾部
    this.arr.pop();
    //添加头部
    this.arr.unshift(iteam);
    // 先处理数组在判断图片是否要改变
    // 局部图片始终受到倒数第二个元素影响
    //尾部是倒数第一个成员
    var tail = this.arr[this.arr.length - 1];
    // 其他是倒数第二个成员
    var second = this.arr[this.arr.length - 2];
    // 如果x方向相同
    if(second.x === tail.x){
        //在垂直方向比较y值
        if(second.y > tail.y){
            //即向下运动，尾部尖朝上
            this.tailImage = this.img.tail[3];
        }
        else{
            // 向上运动，尾部尖朝下
            this.tailImage = this.img.tail[1];
        }
    }
    else{
        //x不同说明在水平方向上
        if(second.x > tail.x){
            //向右运动，尾部尖朝左
            this.tailImage = this.img.tail[2];
        }
        else{
            //向左运动，尾部尖朝右
            this.tailImage = this.img.tail[0];
        }
    }
   //蛇移动之后可以解锁
   this.lock = false;
}


Snake.prototype.change = function(code){
    //改变方向
    //如果锁住了，不能改变
    if(this.lock){
        return;
    }

    // 左右移动只能往上下改变方向（掉头），上下移动只能往左右改变方向
    // 获取方向键值之差
    //Math.abs()是取绝对值的意思
    var number = Math.abs(code - this.direction );
    //同向或者相反方向是不允许的
    if(number === 0 || number === 2){
        return;
    }
    //锁住
    this.lock = true;
    //可以改变方向
    this.direction = code;
    //更换头部图片
    this.headImage = this.img.head[this.direction - 37];
}

//蛇成长
Snake.prototype.growUp = function(){
    //获取尾部
    var tail = this.arr[this.arr.length - 1];
    //尾部添加
    this.arr.push(tail);
}