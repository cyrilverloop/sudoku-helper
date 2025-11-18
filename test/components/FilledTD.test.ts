import { assert, suite, test } from "vitest";
import { mount } from "@vue/test-utils";
import FilledTD from "../../app/components/FilledTD.vue";

suite("The FilledTD component", (): void => {

    test("can be empty", (): void => {
        const component = mount(FilledTD, {
                props: {
                    digit: null
                }
            });

        assert.strictEqual(component.html(), "<!--v-if-->");
    });

    suite("can show the digit", (): void => {

        test("1", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 1
                }
            });

            assert.strictEqual(component.text(), "1");
        });

        test("2", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 2
                }
            });

            assert.strictEqual(component.text(), "2");
        });

        test("3", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 3
                }
            });

            assert.strictEqual(component.text(), "3");
        });

        test("4", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 4
                }
            });

            assert.strictEqual(component.text(), "4");
        });

        test("5", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 5
                }
            });

            assert.strictEqual(component.text(), "5");
        });

        test("6", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 6
                }
            });

            assert.strictEqual(component.text(), "6");
        });

        test("7", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 7
                }
            });

            assert.strictEqual(component.text(), "7");
        });

        test("8", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 8
                }
            });

            assert.strictEqual(component.text(), "8");
        });

        test("9", (): void => {
            const component = mount(FilledTD, {
                props: {
                    digit: 9
                }
            });

            assert.strictEqual(component.text(), "9");
        });
    });

    suite("throws an Error", () => {

        test("when the digit is less than 1", (): void => {
            assert.throws(
                (): void => {
                    mount(FilledTD, {
                        props: {
                            digit: 0
                        }
                    });
                },
                Error,
                "0 is not > 0 and < 10."
            );
        });

        test("when the digit is more than 9", (): void => {
            assert.throws(
                (): void => {
                    mount(FilledTD, {
                        props: {
                            digit: 10
                        }
                    });
                },
                Error,
                "10 is not > 0 and < 10."
            );
        });
    });
});
