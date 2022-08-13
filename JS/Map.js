/**
 * 地图类
 * @param {行数} row 
 * @param {列数} col 
 * @param {总宽度} width 
 * @param {总高度} height 
 */
function Map(row ,col ,width,height){
    this.row = row;
    this.col = col;
    this.width = width;
    this.height = height;

    //二维数组 注意不是花括号
    this.arr = [];
    // 定义容器元素
    this.dom = document.createElement('div');
}
//初始化
Map.prototype.init = function(){
    // 遍历行列 行代表
    for(var i = 0; i < this.row; i++){
        // 创建行元素
        var rowDown = document.createElement('div');
        //设置类
        rowDown.className = 'row';
        //注意一定要加——px
        rowDown.style.height = this.height / this.row + 'px';
        //定义行数组
        var rowArr = [];
        // 遍历该行的每一列
        for(var j = 0; j<this.col;j++){
            //创建每一个列元素
            var colDown = document.createElement('div');
            //设置类
            colDown.className = 'col';
            colDown.style.width = this.width / this.col + 'px';
            // 将单元格放入行元素中
            rowDown.appendChild(colDown);
            //在数组中存储对单元格的映射
            rowArr.push(colDown);
        }
        // 将行元素渲染
        this.dom.appendChild(rowDown);
        // 存储行数组
        this.arr.push(rowArr);

    }
    //设置容器元素类
    this.dom.className = 'box';
    this.dom.style.width = this.width + 'px';
    this.dom.style.height = this.height + 'px';
    //上树
    document.body.appendChild(this.dom);
    console.log(this.arr);
}

//清空地图
Map.prototype.clear = function(){
    //清空的本质就是删除每一个元素的背景
    for(var i = this.arr.length - 1; i >= 0; i--){
        for(var j = this.arr[i].length - 1; j >= 0; j--){
            this.arr[i][j].style.backgroundImage  = '';
        }
    }
}