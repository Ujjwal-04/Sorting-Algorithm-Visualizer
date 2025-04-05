class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

class BST {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new TreeNode(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }
        this._insertNode(this.root, newNode);
    }

    _insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (!node.left) node.left = newNode;
            else this._insertNode(node.left, newNode);
        } else if (newNode.value > node.value) {
            if (!node.right) node.right = newNode;
            else this._insertNode(node.right, newNode);
        }
        return node;
    }
    toSortedArray() {
        let result = [];
        this._inOrder(this.root, result);
        return result;
    }
    
    _inOrder(node, result) {
        if (!node) return;
        this._inOrder(node.left, result);
        result.push(node.value);
        this._inOrder(node.right, result);
    }
    

    balance() {
        if (!this.root) return;
        const sortedValues = [];
        this._inOrder(this.root, sortedValues);
        this.root = this._sortedArrayToBST(sortedValues, 0, sortedValues.length - 1);
    }
    

    _sortedArrayToBST(arr, start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new TreeNode(arr[mid]);
        node.left = this._sortedArrayToBST(arr, start, mid - 1);
        node.right = this._sortedArrayToBST(arr, mid + 1, end);
        return node;
    }
}

let bst = new BST();

function GenerateTree() {


    const input = document.getElementById('treeInput').value;
    const values = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    bst = new BST(); 

    values.forEach(value => bst.insert(value)); 

    clearTree();
    drawTree();
}



function BalanceTree() {
    if (!bst.root) {
        alert("Tree is empty! Insert values first.");
        return;
    }
    bst.balance();
    clearTree();
    drawTree();
}

function clearTree() {
    document.getElementById('treeContainer').innerHTML = '';
}

function drawTree() {
    const container = document.getElementById('treeContainer');
    container.innerHTML = '';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    container.appendChild(svg);

    function getTreeWidth(node) {
        if (!node) return 0;
        if (!node.left && !node.right) return 1;
        return getTreeWidth(node.left) + getTreeWidth(node.right);
    }
    
    function setPositions(node, depth, x, spread) {
        if (!node) return;
    
        node.y = depth * 120 + 50; 
        node.x = x;
    
        let treeWidth = getTreeWidth(node);  
        let nextSpread = Math.max(spread / 2, 70 * treeWidth); 
    
        if (node.left) setPositions(node.left, depth + 1, x - nextSpread, nextSpread);
        if (node.right) setPositions(node.right, depth + 1, x + nextSpread, nextSpread);
    }
    
    let containerWidth = document.getElementById("treeContainer").clientWidth;
    setPositions(bst.root, 0, containerWidth / 2, containerWidth / 4);
    
    function render(node, parent = null) {
        if (!node) return;

        if (parent) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", parent.x + 20);
            line.setAttribute("y1", parent.y + 20);
            line.setAttribute("x2", node.x + 20);
            line.setAttribute("y2", node.y + 20);
            line.setAttribute("stroke", "#FFA500");
            line.setAttribute("stroke-width", "2");
            svg.appendChild(line);
        }

        const nodeDiv = document.createElement('div');
        nodeDiv.classList.add('node');
        nodeDiv.innerText = node.value;
        nodeDiv.style.transform = `translate(${node.x}px, ${node.y}px)`;

        container.appendChild(nodeDiv);
        render(node.left, node);
        render(node.right, node);
    }

    render(bst.root);
}

