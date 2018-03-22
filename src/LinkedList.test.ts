import { LinkedList, ListNode, Data } from './LinkedList';

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

    it('should append method work (add item to the end of the list)', () => {
        const list = new LinkedList();

        list.append('a');
        list.append('b');

        expect(list.toArray()).toEqual(['a', 'b'])
    });

    it('should each method work (call the callback on each item)', function () {
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

    it('should insert method work (insert item to specific position)', function () {
        const list = generateList('a', 'b', 'c');

        list.insert('A', 2);

        expect(list.toArray()).toEqual(['a', 'b', 'A', 'c']);
    });

    it('should reverse method work (reverse the order of the list)', function () {
        const list = generateList('x', 'z', 'y', 'w');

        list.reverse();

        expect(list.toArray()).toEqual(['w', 'y', 'z', 'x']);
    });

    it('should removeAt method work (remove item from given position)', function () {
        const list = generateList('a', 'b', 'z', 'x');

        list.removeAt(1);
        expect(list.toArray()).toEqual(['a', 'z', 'x']);

        list.removeAt(0);
        expect(list.toArray()).toEqual(['z', 'x']);

        list.removeAt(1);
        expect(list.toArray()).toEqual(['z']);
    });
});

