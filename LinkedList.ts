class Data {
    private value;

    constructor(value) {
        this.value = value;
    }

    public getValue() {
        return new Promise(resolve => setTimeout(() => resolve(this.value), Math.floor(Math.random() * Math.floor(1000))));
    }
}

class ListNode {
    public elem: Data;
    public next: ListNode;

    constructor(elem) {
        this.elem = new Data(elem);
        this.next = null;
    }
}

class LinkedList {
    private head: ListNode = null;
    private len = 0;

    public append(elem) {
        let node = new ListNode(elem);
        let current;

        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }
        this.len++;
    }

    public removeAt(pos: Number): Data {
        if (pos > -1 && pos < this.len) {
            let current = this.head;
            let previous;
            let index = 0;

            if (pos === 0) {
                this.head = current.next;
            } else {
                while (index++ < pos) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.len--;
            return current.elem;
        } else {
            return null;
        }
    }

    public insert(elem, pos: Number): Boolean {
        // Todo: implement this
    }

    public each(callbackFn: Function) {
        let current = this.head;
        while (current) {
            callbackFn.call(this, current.elem);
            current = current.next;
        }
    }

    public reverse() {
        // TODO: Implement this
    }

    public async sort() {
        // TODO: Implement this
    }
}


let t = new LinkedList();
t.append(1);
t.append(2); // Works fine
t.append(0);
//console.log(t); // LinkedList
// t.removeAt(1);
//console.log(t, 'tt', tt); // LinkedList, 'tt', 1
t.insert(2, 2);

t.sort();
t.each(console.log);