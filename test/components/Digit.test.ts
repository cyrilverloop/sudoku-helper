import { afterEach, assert, suite, test } from 'vitest';
import { enableAutoUnmount, mount } from '@vue/test-utils';
import Digit from "../components/Digit.vue";

suite('In the Digit component, you can', () => {
    enableAutoUnmount(afterEach);

    test('have a radio input and label', () => {
        const digitComponent = mount(Digit, {
            props: {
                digit: 2
            },
            slots: {
                default: '<input type="radio" />'
            }
        });

        const inputNode = digitComponent.find('input');
        const labelNode = digitComponent.find('label');

        assert.strictEqual(inputNode.attributes().type, 'radio');
        assert.strictEqual(labelNode.text(), '2');
        assert.strictEqual(labelNode.attributes('for'), 'digit-2');
    });

    test('check a radio input by clicking its label', () => {
        const digitComponent = mount(Digit, {
            attachTo: 'body',
            props: {
                digit: 2
            },
            slots: {
                default: '<input type="radio" id="digit-2" />'
            }
        });

        const inputNode = digitComponent.find('input');

        assert.isFalse(inputNode.element.checked);

        const labelNode = digitComponent.find('label');
        labelNode.trigger('click');

        assert.isTrue(inputNode.element.checked);
    });

    test('have a checkbox input and label', () => {
        const digitComponent = mount(Digit, {
            props: {
                digit: 2
            },
            slots: {
                default: '<input type="checkbox" />'
            }
        });

        const inputNode = digitComponent.find('input');
        const labelNode = digitComponent.find('label');

        assert.strictEqual(inputNode.attributes().type, 'checkbox');
        assert.strictEqual(labelNode.text(), '2');
        assert.strictEqual(labelNode.attributes('for'), 'digit-2');
    });

    test('check a checkbox input by clicking its label', () => {
        const digitComponent = mount(Digit, {
            attachTo: 'body',
            props: {
                digit: 2
            },
            slots: {
                default: '<input type="checkbox" id="digit-2" />'
            }
        });

        const inputNode = digitComponent.find('input');

        assert.isFalse(inputNode.element.checked);

        const labelNode = digitComponent.find('label');
        labelNode.trigger('click');

        assert.isTrue(inputNode.element.checked);
    });
});
