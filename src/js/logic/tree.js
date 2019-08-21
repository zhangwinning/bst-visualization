function TreeNode(element, left = null, right = null) {
    return Object.assign({}, {element, left, right});
}


// 右脚 yin ,假如待插入节点不存在，一直秃噜到叶子，新建该节点，然后再秃噜到根，完成插入。
function Insert(element, tree = null) {
    if (tree === null) {
        tree = TreeNode(element);
    } else if (element < tree.element) {
        tree.left = Insert(element, tree.left);
    } else if (element > tree.element) {
        tree.right = Insert(element, tree.right);
    }
    return tree;
}




// 获取该二叉树的所有路径，其实就是树的前序遍历，拿到头，把节点信息存储好，往下一次遍历左孩子、右孩子
// 路径的特点是 左孩子和右孩子的子节点 都是 null
// let paths = []
// function getPathLib(trees, path = [], pathLen = 0) {
//     if (!trees) return null
//
//     path[pathLen] = trees.element
//     pathLen++
//
//     if (trees.left === null && trees.right === null) {
//
//         paths.push(path)
//
//     } else {
//
//         getPathLib(trees.left, [...path], pathLen)
//         getPathLib(trees.right, [...path], pathLen)
//
//     }
// }

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

// 查找树上的节点数量
function get_node_count(trees) {
    if (!trees) return 0
    else {
        let nodes = 0
        if (trees.element) nodes = 1
        if (trees.left) nodes = get_node_count(trees.left) + 1
        if (trees.right) nodes = get_node_count(trees.right) + nodes
        return nodes
    }
}

// 从小到大打印 ATD 节点
function print_values(trees) {

    const elements = []

    print_valuesLib(trees)
    function print_valuesLib(trees) {
        if (!trees) return null
        if (trees.left) print_valuesLib(trees.left)
        elements.push(trees.element)
        if (trees.right) print_valuesLib(trees.right)
    }

    return elements

}

// 获取 ATD 的高度
function get_height(tress) {
    if (!tress) return 0
    let leftHeigth = 0
    let rigthHeigth = 0
    if (tress.left) leftHeigth = get_height(tress.left)
    if (tress.right) rigthHeigth = get_height(tress.right)
    return Math.max(leftHeigth, rigthHeigth) + 1
}

// 获取最小值
function get_min(trees) {
    if (!trees) return null
    while(trees.left) {
        trees = trees.left
    }
    return trees.element
}


// 获取最大值
function get_max(trees) {
    if (!trees) return null
    if (trees.right) return get_max(trees.right) // right is exist, use digui
    return trees.element
}


// the tree is or not binary search tree
function is_binary_search_tree(trees) {
    if (!trees) return true

    if (trees.left && get_max(trees.left) > trees.element) return false // not binary tree

    if (trees.right && get_min(trees.right) < trees.element) return false

    if (!is_binary_search_tree(trees.left) || !is_binary_search_tree(trees.right)) return false

    return true
}

module.exports = {
    Insert: Insert,
    getPath: getPath,
    getNodeCount: get_node_count,
    printValues : print_values,
    getHeight : get_height,
    getMin : get_min,
    getMax : get_max,
    isBinarySearchTree: is_binary_search_tree
};







