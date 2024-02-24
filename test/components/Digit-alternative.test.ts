import { afterEach, assert, beforeEach, suite, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Digit from "../components/Digit.vue";

suite('In the Digit component', () => {
    let digitComponent:any = null;

    suite('a radio input', () => {

        beforeEach(() => {
            digitComponent = mount(Digit, {
                attachTo: 'body',
                props: {
                    digit: 2
                },
                slots: {
                    default: '<input type="radio" id="digit-2" />'
                }
            });
        });

        test('has a label', () => {
            const inputNode = digitComponent.find('input');
            const labelNode = digitComponent.find('label');

            assert.strictEqual(inputNode.attributes().type, 'radio');
            assert.strictEqual(labelNode.text(), '2');
            assert.strictEqual(labelNode.attributes('for'), 'digit-2');
        });

        test('can be checked by clicking its label', () => {
            const inputNode = digitComponent.find('input');
    
            assert.isFalse(inputNode.element.checked);
    
            const labelNode = digitComponent.find('label');
            labelNode.trigger('click');
    
            assert.isTrue(inputNode.element.checked);
        });
    });

    suite('a checkbox input', () => {

        beforeEach(() => {
            digitComponent = mount(Digit, {
                attachTo: 'body',
                props: {
                    digit: 2
                },
                slots: {
                    default: '<input type="checkbox" id="digit-2" />'
                }
            });
        });

        test('has a label', () => {
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

        test('can be checked by clicking its label', () => {
            const inputNode = digitComponent.find('input');
    
            assert.isFalse(inputNode.element.checked);
    
            const labelNode = digitComponent.find('label');
            labelNode.trigger('click');
    
            assert.isTrue(inputNode.element.checked);
        });
    });

    afterEach(() => {
        digitComponent.unmount();
    });
});
