import { LinkedList, ListNode, Data} from './LinkedList';

describe('Data methods', () => {
    it('should sortIndex asynchronously generate md5 hash', async () => {
        const data = new Data('Abc');

        const index = await data.sortIndex;

        expect(index).toBe('35593b7ce5020eae3ca68fd5b6f3e031');
    });
});

describe('LinkedList methods', () => {

    const generateList = function (...items) {
        const list = new LinkedList();
        items.forEach((item) => {
            list.append(item);
        });
        return list;
    };

    it('tail should point at last item', () => {
        const list = new LinkedList();
        expect(list.getTailValue()).toEqual(null);
        list.append('a');
        list.append('b');

        expect(list.getTailValue()).toEqual('b');
        list.append('c');
        expect(list.getTailValue()).toEqual('c');

    });

    it('should search through tail as well', () => {
        const list = new LinkedList();
        list.append('a');
        list.append('b');
        list.append('c');
        list.append('d');

        expect(list.getTail().previous.previous).toEqual(list.getElement(1));
        expect(list.getTail().previous.previous.previous).toEqual(list.getHead());
        list.removeAt(3);
        expect(list.getTail()).toEqual(list.getElement(2));

    });

    it('should append method work (add item to the end of the list)', () => {
        const list = new LinkedList();

        list.append('a');
        list.append('b');

        expect(list.toArray()).toEqual(['a', 'b'])
    });

    it('should each method work (call the callback on each item)', () => {
        const list = generateList('a', 'b');
        const mockCallback = jest.fn();

        list.each(mockCallback);

        expect(mockCallback.mock.calls[0][0].getValue()).toBe('a');
        expect(mockCallback.mock.calls[1][0].getValue()).toBe('b');
    });


    it('should sort method sort items by sortIndex (md5)', async () => {
        const list = generateList('aaa', 'bbb', 'ccc');

        await list.sort();

        expect(list.toArray()).toEqual(['bbb', 'aaa', 'ccc']);

        //
        // Because sortIndex for the values will be the followings:
        //
        // aaa 47bce5c74f589f4867dbd57e9ca9f808
        // bbb 08f8e0260c64418510cefb2b06eee5cd
        // ccc 9df62e693988eb4e1e1444ece0578579
        //

    });

    it('should sort method sort items by sortIndex (md5)', async () => {
        const list = generateList('aaa', 'bbb', 'ccc', 'Abc');

        await list.sort();

        expect(list.toArray()).toEqual(['bbb', 'Abc', 'aaa', 'ccc']);

        //
        // Because sortIndex for the values will be the followings:
        //
        // aaa 47bce5c74f589f4867dbd57e9ca9f808
        // bbb 08f8e0260c64418510cefb2b06eee5cd
        // ccc 9df62e693988eb4e1e1444ece0578579
        // Abc 35593b7ce5020eae3ca68fd5b6f3e031
        //

    });

    it('should insert method work (insert item to specific position)', () => {
        const list = generateList('a', 'b', 'c');

        list.insert('A', 2);

        expect(list.toArray()).toEqual(['a', 'b', 'A', 'c']);
    });

    it('should insert method work (insert item to first position, middle, and last)', () => {
        const list = generateList('a', 'b', 'c');

        list.insert('A', 0);
        expect(list.toArray()).toEqual(['A', 'a', 'b', 'c']);
        expect(list.getElement(1).previous).toEqual(list.getHead());
        expect(list.getLen()).toEqual(4);

        list.insert('B', 2);
        expect(list.toArray()).toEqual(['A', 'a', 'B', 'b', 'c']);
        expect(list.getElement(2).previous).toEqual(list.getElement(1));
        expect(list.getLen()).toEqual(5);

        list.insert('D', 5);
        expect(list.toArray()).toEqual(['A', 'a', 'B', 'b', 'c', 'D']);
        expect(list.getElement(5).previous).toEqual(list.getElement(4));
        expect(list.getLen()).toEqual(6);

        expect(list.getTail()).toEqual(list.getElement(5));
    });

    it('test length', () => {
        const list = generateList(1,2,3,4,5);
        expect(list.getLen()).toEqual(5);
    });

    it('should reverse method work (reverse the order of the list)', () => {
        const list = generateList('x', 'z', 'y', 'w');

        list.reverse();

        expect(list.toArray()).toEqual(['w', 'y', 'z', 'x']);
    });

    it('should removeAt method work (remove item from given position)', () => {
        const list = generateList('a', 'b', 'z', 'x');

        list.removeAt(1);
        expect(list.toArray()).toEqual(['a', 'z', 'x']);

        list.removeAt(0);
        expect(list.toArray()).toEqual(['z', 'x']);

        list.removeAt(1);
        expect(list.toArray()).toEqual(['z']);
    });

    it("should give desired item's data", () => {
        const list = generateList('first', 'second', 'third');

        expect(list.getElementValue(1)).toEqual('second');
        expect(list.getElementValue(3)).toBeFalsy();
        expect(list.getElementValue(1000)).toBeFalsy();
    });

    it('should match previous', () => {
        const list = generateList('first', 'second', 'third');

        expect(list.getElement(1)).toEqual(list.getElement(2).previous);
    });

    it('get head value', () => {
        const list = generateList('x', 'c', 'v');

        expect(list.getHeadValue()).toEqual('x');
    });

    it('if no current getElement should be false', () => {
        const list = generateList('x', 'c', 'v');

        expect(list.getElement(9)).toBeFalsy();
    });

    it('insert should throw', () => {
        const list = generateList('1');

        expect(() => list.insert('2', -100)).toThrow()
    });

    it('remove should throw', () => {
        const list = generateList('1');

        expect(() => list.removeAt(-100)).toThrow()
    });

});

