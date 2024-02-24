import { assert, suite, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Index from '../pages/index.vue';

suite('The home page', () => {

    suite('once loaded', () => {

        test('has a 9x9 empty table', () => {
            const page = mount(Index);
    
            const tableNode = page.find('table');
            const trNodes = tableNode.findAll('tr');
    
            assert.strictEqual(trNodes.length, 9);
    
            for(const trNode of trNodes) {
                const tdNodes = trNode.findAll('td');
    
                assert.strictEqual(tdNodes.length, 9);
    
                for(const tdNode of tdNodes) {
                    assert.strictEqual(tdNode.text(), '');
                }
            }
        });
    
        test('has no selected square', () => {
            const page = mount(Index);
            const selectedNodes = page.findAll('.bg-blue');
    
            assert.strictEqual(selectedNodes.length, 0);
        });
    
        test('has no square type selection nor digit selection', () => {
            const page = mount(Index);
            const rowClassNodes = page.findAll('.row');
    
            assert.strictEqual(rowClassNodes.length, 1);
        });
    });


    suite('interaction', async () => {

        test('can highlight the row and column of a selected square', async () => {
            const page = mount(Index);
            const squareNode = page.find('td');
            const trNodes = page.findAll('tr');
            const rowTDNodes = trNodes[0].findAll('td');

            // Row must not be highlighted :
            for(const tdNode of rowTDNodes) {
                assert.isFalse(tdNode.element.classList.contains('bg-blue'));
            }

            // Column must not be highlighted :
            for(const trNode of trNodes) {
                const tdNode = trNode.find('td');

                assert.isFalse(tdNode.element.classList.contains('bg-blue'));
            }

            await squareNode.trigger('click');

            // Row must be highlighted :
            for(const tdNode of rowTDNodes) {
                assert.isTrue(tdNode.element.classList.contains('bg-blue'));
            }

            // Column must be highlighted :
            for(const trNode of trNodes) {
                const tdNode = trNode.find('td');

                assert.isTrue(tdNode.element.classList.contains('bg-blue'));
            }
        });

        test('can remove highlight from the row and column of a selected square', async () => {
            const page = mount(Index);
            const squareNode = page.find('td');
            const trNodes = page.findAll('tr');
            const rowTDNodes = trNodes[0].findAll('td');

            await squareNode.trigger('click');

            // Row must be highlighted :
            for(const tdNode of rowTDNodes) {
                assert.isTrue(tdNode.element.classList.contains('bg-blue'));
            }

            // Column must be highlighted :
            for(const trNode of trNodes) {
                const tdNode = trNode.find('td');

                assert.isTrue(tdNode.element.classList.contains('bg-blue'));
            }

            await squareNode.trigger('click');

            // Row must not be highlighted :
            for(const tdNode of rowTDNodes) {
                assert.isFalse(tdNode.element.classList.contains('bg-blue'));
            }

            // Column must not be highlighted :
            for(const trNode of trNodes) {
                const tdNode = trNode.find('td');

                assert.isFalse(tdNode.element.classList.contains('bg-blue'));
            }
        });


        test('can select an empty square', async () => {
            const page = mount(Index);
            const tdNode = page.find('td');

            assert.isFalse(tdNode.element.classList.contains('bg-blue'));

            await tdNode.trigger('click');

            assert.isTrue(tdNode.element.classList.contains('bg-blue'));

            const rowClassNodes = page.findAll('.row');

            assert.strictEqual(rowClassNodes.length, 2);

            const squareTypeRadio = page.find('[name="square-type"]');

            assert.strictEqual(squareTypeRadio.attributes('value'), 'EmptySquare');
        });

        test('can deselect an emty square', async () => {
            const page = mount(Index);
            const tdNode = page.find('td');

            await tdNode.trigger('click');

            assert.isTrue(tdNode.element.classList.contains('bg-blue'));

            await tdNode.trigger('click');

            assert.isFalse(tdNode.element.classList.contains('bg-blue'));

            const rowClassNodes = page.findAll('.row');

            assert.strictEqual(rowClassNodes.length, 1);
        });


        test('can change an Empty square to an Answer square', async () => {
            const page = mount(Index, {
                attachTo: 'body',
            });
            const tdNode = page.find('td');

            assert.isFalse(tdNode.element.classList.contains('bg-blue'));

            await tdNode.trigger('click');

            assert.isTrue(tdNode.element.classList.contains('bg-blue'));

            let rowClassNodes = page.findAll('.row');

            assert.strictEqual(rowClassNodes.length, 2);

            const answerSquareRadio = rowClassNodes[1].findAll('input')[2];

            assert.isFalse(answerSquareRadio.element.checked);

            const answerSquareLabel = rowClassNodes[1].find('[for="square-AnswerSquare"]');

            await answerSquareLabel.trigger('click');

            assert.strictEqual(tdNode.text(), '');
            assert.isTrue(answerSquareRadio.element.checked);

            rowClassNodes = page.findAll('.row');

            assert.strictEqual(rowClassNodes.length, 3);

            const digitInputRadio = rowClassNodes[2].findAll('input');

            for(let inputIndex = 1; inputIndex < 10; inputIndex++) {
                assert.strictEqual(
                    digitInputRadio[inputIndex - 1].element.value,
                    inputIndex.toString()
                );
                assert.isFalse(digitInputRadio[inputIndex - 1].element.checked);
            }

            await digitInputRadio[0].trigger('click');

            assert.strictEqual(tdNode.text(), '1');
            assert.isTrue(digitInputRadio[0].element.checked);

            page.unmount();
        });

        test('can change an Empty square to a Filled square', async () => {
            const page = mount(Index, {
                attachTo: 'body',
            });
            const tdNode = page.find('td');

            assert.isFalse(tdNode.element.classList.contains('bg-blue'));

            await tdNode.trigger('click');

            assert.isTrue(tdNode.element.classList.contains('bg-blue'));

            let rowClassNodes = page.findAll('.row');

            assert.strictEqual(rowClassNodes.length, 2);

            const filledSquareRadio = rowClassNodes[1].findAll('input')[3];

            assert.isFalse(filledSquareRadio.element.checked);

            const filledSquareLabel = rowClassNodes[1].find('[for="square-FilledSquare"]');

            await filledSquareLabel.trigger('click');

            assert.strictEqual(tdNode.text(), '');
            assert.isTrue(filledSquareRadio.element.checked);

            rowClassNodes = page.findAll('.row');

            assert.strictEqual(rowClassNodes.length, 3);

            const digitInputRadio = rowClassNodes[2].findAll('input');

            for(let inputIndex = 1; inputIndex < 10; inputIndex++) {
                assert.strictEqual(
                    digitInputRadio[inputIndex - 1].element.value,
                    inputIndex.toString()
                );
                assert.isFalse(digitInputRadio[inputIndex - 1].element.checked);
            }

            await digitInputRadio[0].trigger('click');

            assert.strictEqual(tdNode.text(), '1');
            assert.isTrue(digitInputRadio[0].element.checked);

            page.unmount();
        });

        test('can change an Empty square to a Draft square', async () => {
            const page = mount(Index, {
                attachTo: 'body',
            });
            const tdNode = page.find('td');

            assert.isFalse(tdNode.element.classList.contains('bg-blue'));

            await tdNode.trigger('click');

            assert.isTrue(tdNode.element.classList.contains('bg-blue'));

            let rowClassNodes = page.findAll('.row');

            assert.strictEqual(rowClassNodes.length, 2);

            const filledSquareRadio = rowClassNodes[1].findAll('input')[1];

            assert.isFalse(filledSquareRadio.element.checked);

            const filledSquareLabel = rowClassNodes[1].find('[for="square-DraftSquare"]');

            await filledSquareLabel.trigger('click');

            assert.strictEqual(tdNode.text(), '');
            assert.isTrue(filledSquareRadio.element.checked);

            rowClassNodes = page.findAll('.row');

            assert.strictEqual(rowClassNodes.length, 3);

            const digitInputRadio = rowClassNodes[2].findAll('input');

            for(let inputIndex = 1; inputIndex < 10; inputIndex++) {
                assert.strictEqual(
                    digitInputRadio[inputIndex - 1].attributes('true-value'),
                    inputIndex.toString()
                );
                assert.isFalse(digitInputRadio[inputIndex - 1].element.checked);
            }

            await digitInputRadio[0].trigger('click');
            await digitInputRadio[1].trigger('click');

            assert.strictEqual(tdNode.text(), '12');
            assert.isTrue(digitInputRadio[0].element.checked);
            assert.isTrue(digitInputRadio[1].element.checked);

            page.unmount();
        });
    });
});
