class SLLNode { // Singly-linked list node class
    constructor(val) {
        this.value = val; // Holds value for this node
        this.next = null; // Pointer to next node
    }
}

class SLL { // The singly-linked list class itself
    constructor() { // Will start with no nodes
        this.head = null; // Head points to first node
    }

    /* All methods built into your class go here */

    // Adds a node to the front
    addFront(value) {
        var newNode = new SLLNode(value); // Create a new node containing the value passed into the method
        newNode.next = this.head; // Connect the new node to the list
        this.head = newNode; // Move the head of the list to this new node
        return this.head; // OR you can say "return this"
    }

    // Remove a node from the front of the list
    removeFront() {
        if (this.head == null) { // Edge case: If the list is empty, nothing to remove
            return this.head;
        }
        var removedNode = this.head; // Have a variable hold the node we'll remove
        this.head = removedNode.next; // Moves the head of the list to the 2nd node, which will become the new head when we're done
        removedNode.next = null;
        return this.head;
    }

    // Return the value at the front (head) of the list
    front() {
        // Edge case: list is empty
        if (this.head == null) {
            return null;
        } else { // List is not empty
            return this.head.value;
        }
        // // Ternary operator: condition ? value_if_true : value_if_false
        // return this.head ? this.head.value : null;
        // // return this.head == null ? null : this.head.value;
    }

    // Display the values of all the nodes in the list
    display() {
        var listStr = ""; // Empty string that will contain the values of the list
        // Edge case: list is empty
        if (this.head == null) {
            return ""; // Could say "return 'Empty list'"
        }
        // We have at least one node
        listStr += this.head.value; // Concatenates the first value in the list
        // For the second node onwards, we'll add ", " + value;
        var runner = this.head.next;
        while (runner != null) {
            listStr += ", " + runner.value; // Add the node's value to the list
            runner = runner.next; // Move the runner to the next node
        }
        return listStr;
    }
}