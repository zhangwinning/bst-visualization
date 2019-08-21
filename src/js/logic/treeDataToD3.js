
function handle(trees) {
    if (!trees) return {name: null};

    let newTrees = {name: trees.element, children: []};

    newTrees.children.push(handle(trees.left));
    newTrees.children.push(handle(trees.right));

    return newTrees;
}

module.exports = handle
