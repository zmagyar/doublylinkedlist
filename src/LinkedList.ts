const crypto = require('crypto');

export class Data {
    private value;

    constructor(value) {
        this.value = value;
    }

    public getValue() {
        return this.value;
    }

    public get sortIndex() {
        //
        // DO NOT MODIFY THIS FUNCTION
        //
        const hash = crypto.createHash('md5');
        return new Promise(resolve => setTimeout(() => {
            hash.update(String(this.value));
            resolve(hash.digest('hex'));
        }, this.generateRandomTimeout()));
    }

    private generateRandomTimeout() {
        return Math.random() * 1000;
    }
}

export class ListNode {
    public elem: Data;
    public next: ListNode;
    public previous: ListNode;

    constructor(elem) {
        this.elem = new Data(elem);
        this.next = null;
        this.previous = null;
    }
}

export class LinkedList {
    private head: ListNode = null;
    private tail: ListNode = null;
    private len = 0;

    public getHead(value = false) {
        if (value) return this.head && this.head.elem.getValue();
        return this.head;
    }

    public getTail(value = false) {
        if (value) return this.tail && this.tail.elem.getValue();
        return this.tail;
    }

    public append(elem) {
        const node = new ListNode(elem);
        let current;
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
            current.next.previous = current;
            this.tail = current.next
        }
        this.len++;
    }

    public removeAt(pos: Number): Data {
        let current = this.getElement(pos);
        if (!current) throw new Error();
        if (pos === 0) {
            this.head = current.next;
            this.len--;
            return current.elem;
        }
        current.previous.next = current.next;
        if (current.next === null)  {
            this.len--;
            this.tail = current.previous;
            return current.elem
        }
        current.next.previous = current.previous;
        this.len--;
        return current.elem
    }

    public toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.elem.getValue());
            current = current.next;
        }
        return array;
    }

    public each(callback: Function) {
        let current = this.head;
        while (current) {
            callback(current.elem);
            current = current.next;
        }
    }

    public insert(elem, pos: Number): boolean {
        if (pos >= this.getLen()) {
            this.len++;
            this.append(elem);
            return true;
        }
        const node = new ListNode(elem);
        let current = this.getElement(pos);
        if (!current) throw new Error();

        if (pos === 0) {
            this.head = node;
            node.next = current;
            current.previous = node;
            this.len++;
            return true;
        }
        this.len++;
        node.previous = current.previous;
        current.previous.next = node;

        current.previous = node;
        node.next = current;
        return true;
    }

    public reverse() {
        let current = this.head;
        let save;

        while (current) {
            save = current.next;
            [current.next, current.previous] = [current.previous, current.next];
            current = save;
        }
        [this.head, this.tail] = [this.tail, this.head];
    }

    public async sort() {
        let newList = new LinkedList();
        let array = [];
        let current = this.head;

        while (current) {
            array.push([await current.elem.sortIndex, current.elem.getValue()]);
            current = current.next;
        }
        array.sort((a, b) => a[0].localeCompare(b[0]));

        array.forEach((item) => {
            newList.append(item[1]);
        });

        this.head = newList.head;
    }

    public getElement(position, value = false) {
        if (position > this.getLen() ||
            position < 0 || position === null ||
            position === undefined) return false;

        let index = 0;
        let current = this.head;

        while (index < position && current) {
            index++;
            current = current.next;
        }

        if (current === null) return false;
        if (value) return current.elem.getValue();
        return current
    }

    public getLen() {
        return this.len
    }

}
