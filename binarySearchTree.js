class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class Tree {
    constructor (array) {
        this.array = array;
        this.root = this.buildTree(array);
    }
    buildTree(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a-b);
        
        // base case.
        if (sortedArray.length === 0) return null;
        // find mid element.
        let mid = Math.floor(sortedArray.length / 2);
        let root = new Node(sortedArray[mid]);
        // build left and right subtrees recursively.
        root.left = this.buildTree(sortedArray.slice(0,mid));
        root.right = this.buildTree(sortedArray.slice(mid+1));

        return root;
    }
    
}


let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let tree = new Tree(arr);
let node = tree.root;

tree.buildTree(arr)

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
prettyPrint(node)