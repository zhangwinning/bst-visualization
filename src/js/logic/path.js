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







const randoms = [5, 3, 2, 1, 7,10,6, 34, 23, 45]
const trees = randoms.reduce((tree,random) => Insert(random, tree), null)


// 获取该二叉树的所有路径，其实就是树的前序遍历，拿到头，把节点信息存储好，往下一次遍历左孩子、右孩子
function getPath(trees, path = [], pathLen = 0) {
    if (!trees) return null
    path[pathLen] = trees.element
    pathLen++
    if (trees.left === null && trees.right === null) {
        console.log(path)
        // return path
    } else {
        getPath(trees.left, [...path], pathLen)
        getPath(trees.right, [...path], pathLen)
    }
}



console.log(trees)

console.log(getPath(trees))
