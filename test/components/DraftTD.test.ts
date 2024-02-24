import { afterEach, assert, suite, test } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import DraftTD from "../components/DraftTD.vue";

suite('The DraftTD component', () => {
    enableAutoUnmount(afterEach);

    test('can show a list of digits', () => {
        const component = mount(DraftTD, {
            props: {
                digits: [1, 7]
            }
        });

        const liNodes = component.findAll('li');

        assert.strictEqual(liNodes.length, 2);
        assert.strictEqual(liNodes[0].text(), '1');
        assert.strictEqual(liNodes[1].text(), '7');
    });

    test('has all digits gray', () => {
        const component = mount(DraftTD, {
            props: {
                digits: [1, 7]
            }
        });

        const liNodes = component.findAll('li');
        
        for(const liNode of liNodes) {
            assert.isTrue(liNode.element.classList.contains('text-gray'));
        }
    });
});
