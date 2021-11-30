// double linked list
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// LRUCache class
class LRUCache {
  constructor(capacity) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.capacity = capacity;
    this.cache = {};
  }

  // get method retrieves a value from the provided key otherwise returns -1
  // the node retrieved should be set to the head
  get(key) {

    // if node does not exist return -1
    if (!this.cache[key]){
      return -1
    }

    const node = this.cache[key];
    
    // if node is already the head then return the node value and change nothing
    if(node === this.head) return node.value;

    const nodePrevious = node.prev;
    const nodeNext = node.next;

    // remove node from current position to get ready to place it as head node
    if (node === this.tail){
      nodePrevious.next = null;
      this.tail = nodePrevious;
    } else {
      nodePrevious.next = nodeNext;
      nodeNext.prev = nodePrevious;
    }

    // move current head down one position and set node to head 
    this.head.prev = node;
    node.next = this.head;
    node.prev = null;
    this.head = node;

    return node.value;      
  }

  // delete method deltes a node from the cache otherwise returns -1
  delete(key) {
    // if node does not exist return -1
    if (!this.cache[key]) {
      return -1;
    }

    const node = this.cache[key];
    const val = node.value;
    const nodePrevious = node.prev;
    const nodeNext = node.next;

    // if node is the head then set the next number as the head and delete node
    if(node === this.head) {
      nodeNext.prev = null;
      this.head = nodeNext;
      delete this.cache[key];
      this.size--;
    } else if(node === this.tail) {
      // if node is the tail then set the previous number as the tail and delete node
      nodePrevious.next = null;
      this.tail = nodePrevious;
      delete this.cache[key];
      this.size--;

    } else {
      // swap next and previous values with node's next and previous values and delete node
      nodePrevious.next = node.next;
      nodeNext.prev = node.prev;
      delete this.cache[key]
      this.size--;
    }

    return val;
  }

  // put method inserts a node into the cache
  put(key, value) {
    // check if key is already present
    if (this.cache[key]) return;

    const node = new Node(key, value);

    // check if cache is empty
    if(this.size === 0) {
        this.head = node;
        this.tail = node;
        this.cache[key] = node;
        this.size++;
        return;
    }

    // check if cache is at capacity
    if (this.size === this.capacity) {
      delete this.cache[this.tail.key]

      // set new tail
      this.tail = this.tail.prev;
      this.tail.next = null;
      this.size--;
    }

    // add item to the head
    this.head.prev = node;
    node.next = this.head;
    this.head = node;
    this.size++;

    // add to cache
    this.cache[key] = node;     
  }
}

module.exports = LRUCache
