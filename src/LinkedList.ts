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

    constructor(elem) {
        this.elem = new Data(elem);
        this.next = null;
    }
}

export class LinkedList {
    private head: ListNode = null;
    private len = 0;

    public append(elem) {
        const node = new ListNode(elem);
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

    public toArray() {
        const array = [];
        let current = this.head;
        while (current) {
            array.push(current.elem.getValue())
            current = current.next;
        }
        return array;
    }

    public each(callback: Function) {
        // Todo: implement this
    }

    public insert(elem, position: Number): boolean {
        // Todo: implement this
        return true;
    }

    public reverse() {
        // TODO: Implement this
    }

    public async sort() {
        // TODO: Implement this
    }


}