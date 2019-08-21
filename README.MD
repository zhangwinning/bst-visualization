


对于程序员来说，算法和数据数据结构绕不开的，本文另辟蹊径，以图示的方式, 着重说明 二叉查找树(BST)相关的算法，想是可视化的东西更适合联想，记忆。

<h2><a href="http://106.15.231.221:8200/dist/" target="_blank">测试链接</a></h2>

![tree](https://raw.githubusercontent.com/zhangwinning/dataStructure/master/binary-tree/src/js/pic/tree.jpg)


### 主要用到的依赖

- react 
- webpack
- d3 (二叉树的展示图)
- antd


### 具体实现算法包括
+ BST 的所有路径
+ BST 的节点数
+ 从小到大打印 BST 节点
+ BST 的高度
+ BST 的最小值
+ BST 的最大值
+ 判断二叉树是否为 BST

### 代码结构

![structure](https://raw.githubusercontent.com/zhangwinning/dataStructure/master/binary-tree/src/js/pic/structure.jpg)

+ components目录  （react组件相关代码）
+ logic目录       （BST的数据结构）


### 每个算法的主要逻辑

+ BST 的所有路径
    + 为树的前序遍历的应用。
    + 当遍历到一个节点时，先拿到该节点的值存储好，然后遍历左孩子、右孩子。
    + 重复步骤二，直到该节点既无左孩子也无右孩子(叶子)时，把包含该节点的一组路径保存好。

+ BST 的节点数
    + 树的前序遍历的应用。
    + 依树根为第一个节点，遍历左孩子获取左孩子的节点数，遍历右孩子的节点数。
    + 把根节点、左孩子的节点数、右孩子的节点数 相加为总共节点数。
    + 程序中的算法是 把根节点数、左右孩子的节点数用一个变量表示。

+ 从小到大打印 BST 节点
    + 二叉查找树的特点是 左孩子 < 根 < 右孩子，因此为中序遍历的应用。
    + 程序中对应就是遍历左孩子、根、右孩子。

+ BST 的高度
    + 思想就是：在左子树的高度、右子树的高度中取最大值，然后加上树根的高度(1), 为树的高度。
    + 对应程序是 初始化左子树、右子树高度均为 0，如果左根存在遍历左根，同理右根，最后返回最大值。
    
+ BST 的最小值、最大值
    + 这两个算法比较简单，程序中分别使用了两种算法，一种递归，一种非递归。

+ 判断二叉树是否为 BST
    + 树的前序遍历的应用。
    + 这里要用到求最小值、最大值两个函数。
    + 对于任何一个节点，如果在左子树的最大值大于根，非 BST，右子树的最小值小于根，非 BST。 
    + 递归该二叉树的左子树、右子树

<h5><a href="https://github.com/zhangwinning/dataStructure/blob/master/binary-tree/src/js/logic/tree.js" target="_blank">具体代码逻辑</a></h5>




### 开发中遇到的 bug 

##### 局部变量和全局变量定义的区别、require 的工作机制。
刚刚遇到一个 bug ，定位了好长时间才解决，遂记录下来

```
let paths = []
function getPathLib(trees, path = [], pathLen = 0) {
    if (!trees) return null

    path[pathLen] = trees.element
    pathLen++

    if (trees.left === null && trees.right === null) {

        paths.push(path)

    } else {

        getPathLib(trees.left, [...path], pathLen)
        getPathLib(trees.right, [...path], pathLen)

    }
}


function getPath (trees) {
    return getPathLib(trees)
}
```

以上代码是 获取ADT路径 算法，在函数外部定义了一个 变量，结果返回的路径都是从开始到
这次路径总数的叠加

比如：
第一次输入 任意数生成的路径是 [1,2,3,4],[1,2,3,5]

第二次输入 任意数时生成的路径 也会 把 上面的路径添加进去

百思不得其解

后来改成以下这样，就可以了


```$xslt
function getPath(trees) {

    let paths = []
    getPathLib(trees)

    function getPathLib (trees, path = [], pathLen = 0)  {
        if (!trees) return null

        path[pathLen] = trees.element
        pathLen++

        if (trees.left === null && trees.right === null) {

            paths.push(path)

        } else {

            getPathLib(trees.left, [...path], pathLen)
            getPathLib(trees.right, [...path], pathLen)

        }
    }

    return paths
}
```

原因我认为 第一次 require 时，会初始化一个全局变量，第二次调用生成路径函数时，就不会初始化这个函数了，好像是在内存中直接取，就不会初始化这个函数了，因而

会出现路径叠加的情况，

改正后，每次调用函数时就 初始化变量，就 ok 了.


最后 npm build 进行打包成一个文件，然后放到docker 进行部署就行了
