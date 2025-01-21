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
        this.root = null;
    }
    buildTree(array) {
        const sortedArray = [...new Set(array)].sort((a, b) => a-b);
        return sortedArray;
    }
    
}


let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
// console.log(buildTree(arr))