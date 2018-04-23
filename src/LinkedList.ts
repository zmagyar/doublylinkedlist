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

    /**
     * Get the head node
     *
     * @returns {ListNode}
     */
    public getHead(): ListNode {
        return this.head;
    }

    /**
     * Get the tail node
     *
     * @returns {ListNode}
     */
    public getTail(): ListNode {
        return this.tail;
    }

    /**
     * Get the value of the head node
     *
     * @returns {Data}
     */
    public getHeadValue(): Data {
        return this.head && this.head.elem.getValue();
    }

    /**
     * Get the value of the tail node
     *
     * @returns {Data}
     */
    public getTailValue(): Data {
        return this.tail && this.tail.elem.getValue();
    }

    /**
     * Append the list by adding a new node to the end of the list
     *
     * @param elem
     * @returns {ListNode}
     */
    public append(elem): ListNode {
        const node = new ListNode(elem);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            node.previous = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.len++;
        return node;
    }

    /**
     * Remove a node at the given position
     *
     * @param {Number} pos
     * @returns {Data}
     */
    public removeAt(pos: Number): Data {
        let current = this.getElement(pos);
        if (!current) throw new Error();

        const previous = current.previous;
        const next = current.next;
        if (previous === null) {
            this.head = next;
        } else {
            previous.next = next;
            if (next === null) {
                this.tail = previous;
            } else {
                next.previous = previous;
            }
        }
        this.len--;
        return current.elem
    }

    /**
     * Conver the list to an array of the stored values
     *
     * @returns {any[]}
     */
    public toArray(): any[] {
        const array = [];
        this.each((item) => {
            array.push(item.getValue());
        });
        return array;
    }

    /**
     * Execute the passed in callback function for each
     * node stored in the list
     *
     * @param {Function} callback
     */
    public each(callback: Function) {
        let current = this.head;
        while (current) {
            callback(current.elem);
            current = current.next;
        }
    }

    /**
     * Insert a new node to the given position of the list
     * Returns the inserted node value
     *
     * @param elem
     * @param {Number} pos
     * @returns {ListNode}
     */
    public insert(elem, pos: Number): ListNode {
        if (pos >= this.getLen()) {
            return this.append(elem);
        }
        const node = new ListNode(elem);
        let current = this.getElement(pos);
        if (!current) throw new Error();

        if (pos === 0) {
            this.head = node;
            node.next = current;
            current.previous = node;
            this.len++;
            return node;
        }
        this.len++;
        node.previous = current.previous;
        current.previous.next = node;

        current.previous = node;
        node.next = current;
        return node;
    }

    /**
     * Reverse the list
     */
    public reverse(): void {
        let current = this.head;
        let save;

        while (current) {
            save = current.next;
            [current.next, current.previous] = [current.previous, current.next];
            current = save;
        }
        [this.head, this.tail] = [this.tail, this.head];
    }

    /**
     * Sort the list
     *
     * @returns {Promise<void>}
     */
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

    /**
     * Get the node at the given position
     *
     * @param position
     * @returns {ListNode}
     */
    public getElement(position): ListNode {
        if (position > this.getLen() ||
            position < 0 || position === null ||
            position === undefined) return null;

        let index = 0;
        let current = this.head;

        while (index < position && current) {
            index++;
            current = current.next;
        }

        return current;
    }

    /**
     * Return the value of the element at the given position
     *
     * @param position
     * @returns {ListNode | any}
     */
    getElementValue(position) {
        const node = this.getElement(position);
        return node && node.elem.getValue();
    }

    /**
     * Get the length of the list
     *
     * @returns {Number}
     */
    public getLen(): Number {
        return this.len;
    }

}
