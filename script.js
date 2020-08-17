class Node {
  constructor(data) {
    this.left = null
    this.right = null
    this.value = data
  }
}
var element = []
class BST {
  constructor() {
    this.root = null
  }

  // Insert a value as a node in the BST
  insert(value) {
    let newNode = new Node(value)

    // If root empty, set new node as the root
    if (!this.root) {
      this.root = newNode
      addNewDiv(newNode.value, newNode.value, 'root')
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  // helper function
  insertNode(root, newNode) {
    console.log(parseFloat(newNode.value), parseFloat(root.value), parseFloat(newNode.value) < parseFloat(root.value))
    if (parseFloat(newNode.value) < parseFloat(root.value)) {
      // If no left child, then just insesrt to the left
      if (!root.left) {
        root.left = newNode
        addNewDiv(parseFloat(root.value), parseFloat(newNode.value), 'left')
      } else {
        this.insertNode(root.left, newNode)
      }
    } else {
      // If no right child, then just insesrt to the right
      if (!root.right) {
        root.right = newNode
        addNewDiv(parseFloat(root.value), parseFloat(newNode.value), 'right')

      } else {
        this.insertNode(root.right, newNode)
      }
    }
  }

  // Remove a node with the value passed
  remove(value) {
    if (!this.root) {
      return 'Tree is empty!'
    } else {
      this.removeNode(this.root, value)
    }
  }

  // helper function
  removeNode(root, value) {
    if (!root) {
      return null
    }

    // If value is less than root value, go to the left subtree
    if (value < root.value) {
      root.left = this.removeNode(root.left, value)
      return root
      // If value is greater than root value, go to the right subtree
    } else if (value > root.value) {
      root.right = tis.removeNode(root.right, value)
      return root
      // If we found the value, remove the node
    } else {
      // If no child nodes, just remove the node
      if (!root.left && !root.right) {
        root = null
        return root
      }

      // If one child (left)
      if (root.left) {
        root = root.left
        return root
        // If one child (right)
      } else if (root.right) {
        root = root.right
        return root
      }

      // If two child nodes (both)
      // Get the minimum of the right subtree to ensure we have valid replacement
      let minRight = this.findMinNode(root.right)
      root.value = minRight.value

      // Make sure we remove the node that we replaced the deleted node
      root.right = this.removeNode(root.right, minRight.value)
      return root
    }
  }

  findMinNode(root) {
    if (!root.left) {
      return root
    } else {
      return this.findMinNode(root.left)
    }
  }

  // Return boolean value depending on the existence of the value in the tree
  search(value) {
    if (!this.root) {
      return 'Tree is empty'
    } else {
      return Boolean(this.searchNode(this.root, value))
    }
  }
  markVisited(id){
    document.querySelector(id).classList.add('visited')
  }
  searchNode(root, value) {
    if (!root) {
      return null
    }
    setTimeout(() => {
      this.markVisited(`#node-${root.value} .valueContainer`)
      if (value < root.value) {
        return this.searchNode(root.left, value)
      } else if (value > root.value) {
        return this.searchNode(root.right, value)
      }
      return root
    }, 500)
  }
  preOrder(root){
    if(root){
      setTimeout(() =>{
              this.preOrder(root.left)
      this.markVisited(`#node-${root.value} .valueContainer`)
      this.preOrder(root.right)
      },500)

    }
  }
  postOrder(root){
    if(root){
      setTimeout(() =>{},500)
      this.markVisited(`#node-${root.value} .valueContainer`)
      this.postOrder(root.left)
      this.postOrder(root.right)
    }
  }
  inOrder(root){
    if(root){
      setTimeout(() =>{},500)
      this.inOrder(root.left)
      this.inOrder(root.right)
      this.markVisited(`#node-${root.value} .valueContainer`)
    }
  }
}
graph = new BST()



function search() {
  x = document.getElementById('inputNumber').value
  graph.searchNode(graph.root, parseFloat(x))
}
function addNode() {
  x = document.getElementById('inputNumber').value
  graph.insert(x)
}
function addNewDiv(parentId, value, position) {
  var row = document.createElement('div')
  row.classList.add('row')
  row.classList.add('mx-0')
  row.classList.add('px-0')
  var col = document.createElement('div')
  col.classList.add('col')
  col['id'] = 'node-' + value
  col.classList.add('mx-0')
  col.classList.add('p-0')
  var valueContainer = document.createElement('div')
  valueContainer.innerHTML = value
  valueContainer.classList.add('valueContainer')
  var children = document.createElement('div')
  children.classList.add('children')
  children.classList.add('d-flex')
  children.innerHTML = null
  col.appendChild(valueContainer)
  col.appendChild(children)
  row.appendChild(col)
  element.push(value)
  if (element.length > 8 && element.length < 15) {
    console.log(document.getElementById('graphContainer').style.width)
    document.getElementById('graphContainer').style.width = '200%'
    document.getElementById('graphContainer').style.transform = "scale(0.7)"
    document.querySelectorAll('.valueContainer').forEach(element => {
      element.style.marginBottom = '50px'
    })
  }
  if (element.length > 15 && element.length < 20) {
    console.log(document.getElementById('graphContainer').style.width)
    document.getElementById('graphContainer').style.width = '300%'
  }
  if (position == 'root') {
    document.getElementById('graphContainer').appendChild(row)
  } else {
    console.log(document.querySelector(`#node-${parentId} .children`).firstChild)
    row.style.width = '50%'
    if (position == 'left') {
      document.querySelector(`#node-${parentId} .children`).insertBefore(row, document.querySelector(`#node-${parentId} .children`).firstChild)
    } else {
      if (document.querySelector(`#node-${parentId} .children`).firstChild) {
        document.querySelector(`#node-${parentId} .children`).appendChild(row)
      } else {
        document.querySelector(`#node-${parentId} .children`).style.justifyContent = "flex-end"
        document.querySelector(`#node-${parentId} .children`).appendChild(row)
      }

    }
  }
  document.querySelector(`#node-${parentId} .children`).scrollIntoView()
}
dummyCount = 0
limit = 12
var x = [500, 400, 300, 100, 1000, 780, 900, 250, 50, 600, 1200, 784]
function dummyData() {
  if (dummyCount < limit) {
    addValue(x[dummyCount])
    setTimeout(() => {
      dummyCount = dummyCount + 1
      dummyData()
    }, 500)
  }
  // if (dummyCount == 12) {
  //   this.x = [489, 358, 457, 15, 47, 598, 2458, 6500]
  //   limit = 19
  // }
}
function addValue(x) {
  graph.insert(x)
}
function inOrder(){
  graph.inOrder(graph.root)
}
function preOrder(){
  graph.preOrder(graph.root)
}
function postOrder(){
  graph.postOrder(graph.root)
}