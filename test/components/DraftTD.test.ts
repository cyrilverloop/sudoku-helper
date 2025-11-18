import { assert, suite, test } from "vitest";
import { mount } from "@vue/test-utils";
import DraftTD from "../../app/components/DraftTD.vue";

suite("The DraftTD component", (): void => {

    test("has gray digits", (): void => {
        const component = mount(DraftTD, {
            props: {
                digits: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            }
        });

        const tdNodes = component.findAll('td');

        for(const tdNodeIndex in tdNodes) {
            assert.include(
                tdNodes[tdNodeIndex].classes(),
                "text-gray-400"
            );
        }
    });

    suite("can show", (): void => {

        test("an empty grid", (): void => {
            const component = mount(DraftTD, {
                props: {
                    digits: []
                }
            });

            const tdNodes = component.findAll('td');

            for(const tdNodeIndex in tdNodes) {
                assert.strictEqual(tdNodes[tdNodeIndex].text(), "");
            }
        });

        test("a grid fully filled with numbers", (): void => {
            const component = mount(DraftTD, {
                props: {
                    digits: [1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
            });

            const tdNodes = component.findAll('td');

            for(const tdNodeIndex in tdNodes) {
                assert.strictEqual(
                    tdNodes[tdNodeIndex].text(),
                    (parseInt(tdNodeIndex) + 1) + ""
                );
            }
        });

        suite("only the digit", (): void => {

            test("1", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [1]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[0].text(),
                    "1"
                );

                const tdNodesIndex = [
                    1, 2, 3, 4, 5, 6, 7, 8
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });

            test("2", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [2]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[1].text(),
                    "2"
                );

                const tdNodesIndex = [
                    0, 2, 3, 4, 5, 6, 7, 8
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });

            test("3", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [3]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[2].text(),
                    "3"
                );

                const tdNodesIndex = [
                    0, 1, 3, 4, 5, 6, 7, 8
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });

            test("4", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [4]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[3].text(),
                    "4"
                );

                const tdNodesIndex = [
                    0, 1, 2, 4, 5, 6, 7, 8
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });

            test("5", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [5]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[4].text(),
                    "5"
                );

                const tdNodesIndex = [
                    0, 1, 2, 3, 5, 6, 7, 8
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });

            test("6", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [6]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[5].text(),
                    "6"
                );

                const tdNodesIndex = [
                    0, 1, 2, 3, 4, 6, 7, 8
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });

            test("7", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [7]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[6].text(),
                    "7"
                );

                const tdNodesIndex = [
                    0, 1, 2, 3, 4, 5, 7, 8
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });

            test("8", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [8]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[7].text(),
                    "8"
                );

                const tdNodesIndex = [
                    0, 1, 2, 3, 4, 5, 6, 8
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });

            test("9", (): void => {
                const component = mount(DraftTD, {
                    props: {
                        digits: [9]
                    }
                });

                const tdNodes = component.findAll('td');

                assert.strictEqual(
                    tdNodes[8].text(),
                    "9"
                );

                const tdNodesIndex = [
                    0, 1, 2, 3, 4, 5, 6, 7
                ];

                for(const tdNodeIndex of tdNodesIndex) {
                    assert.isEmpty(
                        tdNodes[tdNodeIndex].text()
                    );
                }
            });
        });
    });
});
