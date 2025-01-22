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
    insert(value) {
        this.root = this.insertRec(this.root, value);
        return this.root;
    }
    // helper function to insert value
    insertRec(root, value) {
        // let root = this.buildTree(array);
        // base case if empty tree or leaf node reached.
        if (root === null) return new Node(value);
        //no duplicates.
        if (value === root.data) return root;

        if (value < root.data) {
            root.left = this.insertRec(root.left, value);
        } else {
            root.right = this.insertRec(root.right, value);
        }
        return root;
    }
    deleteItem(value) {
        this.root = this.deleteItemRec(this.root, value);
    }
    // helper function to delete value from tree.
    deleteItemRec(root, value) {
        // base case.
        if (root === null) return null;
        // search for node.
        if (value < root.data) {
            root.left = this.deleteItemRec(root.left, value);
        } else if (value > root.data) {
            root.right = this.deleteItemRec(root.right, value);
        } else {
            // node is found.
            // case 1: leaf node.
            if (!root.left && !root.right) return null;
            // case 2: 1 child.
            if (!root.left) return root.right;
            if (!root.right) return root.left;
            // case 3: two children.
            let minNode = this.findMin(root.right);
            root.data = minNode.data;
            root.right = this.deleteItemRec(root.right, minNode.data);
        }
        return root;
    
    }
    findMin(node) {
        let current = node;
        while (current.left) {
            current = current.left;
        }
        return current;
    }
    find(value) {
        return this.findRec(this.root, value);
    }
    // helper function to find value in tree.
    findRec(root, value) {
        if (root === null) return false;
        if (value === root.data) return true;
        if (value < root.data) {
            return this.findRec(root.left, value);
        } else {
            return this.findRec(root.right, value);
        }
    }
    // iterative method
    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.')
        }
        const queue = [];
        if (this.root) queue.push(this.root);

        while (queue.length > 0) {
            let current = queue.shift();
            callback(current);
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }
    // in order traversal. (left->root->right).
    inOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.');
        }
        const traverse = (node) => {
            if (node === null) return;

            traverse(node.left);
            callback(node);
            traverse(node.right);
        } 

        traverse(this.root);
    }
    // pre-order traversal (root->left->right).
    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.');
        }
        const traverse = (node) => {
            if (node === null) return;
            callback(node);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(this.root);
    }
    // post order traversal (left->right->root).
    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error('A callback function is required.');
        }
        const traverse = (node) => {
            if (node === null) return;
            traverse(node.left);
            traverse(node.right);
            callback(node);
        }
        traverse(this.root);
    }
    // longest path from node to leaf.
    height(node) {
        // base case
        if (node === null) return -1;
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        return 1 + Math.max(leftHeight, rightHeight);
    }
    depth(node) {
        let current = this.root;
        let currentDepth = 0;

        while (current !== null) {
            if (node === current) return currentDepth; //node found.
            currentDepth++;
            current = node < current ? current.left : current.right;
        }
        //if node not found in tree.
        return -1;
    }
    isBalanced() {
        const checkHeight = (node) => {
            if (node === null) return 0;
            // check height of left node
            const leftHeight = checkHeight(node.left);
            if (leftHeight === -1) return -1;
            // check height of right node
            const rightHeight = checkHeight(node.right);
            if (rightHeight === -1) return -1;
            // check if current node balanced
            if (Math.abs(leftHeight - rightHeight) > 1) return -1;
            // return height of current node
            return 1 + Math.max(leftHeight, rightHeight);
        }
        return checkHeight(this.root) !== -1;
    }
}


let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let tree = new Tree(arr);
tree.insert(11);
tree.deleteItem(9)
console.log(tree.find(23))
let node = tree.root;


// console.log("\nLEVEL ORDER")
// tree.levelOrder((node) => console.log(node.data));
// console.log("\nIN ORDER")
// tree.inOrder((node) => console.log(node.data));
// console.log("\nPRE ORDER")
// tree.preOrder((node) => console.log(node.data));
// console.log("\nPOST ORDER")
// tree.postOrder((node) => console.log(node.data));

console.log("height:",tree.height(node))
console.log("Depth:",tree.height(node))
console.log("Is balanced?:",tree.isBalanced())



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
// prettyPrint(node)