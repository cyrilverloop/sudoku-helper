import { assert, suite, test } from "vitest";
import { mount } from "@vue/test-utils";
import App from "../app/app.vue";

suite("The app", (): void => {

    suite("by default", (): void => {

        test("shows an empty grid", (): void => {
            const app = mount(App);

            const tableNodes = app.findAll('table');

            assert.lengthOf(tableNodes, 1);

            const tableNode = tableNodes[0];

            assert.isEmpty(tableNode.text());
        });

        test("hides the square type selector", (): void => {
            const app = mount(App);

            const squareTypeSelectorNode = app.find('#square-type-selector');

            assert.isFalse(squareTypeSelectorNode.exists());
        });

        test("hides the digit selector", (): void => {
            const app = mount(App);

            const digitSelectorNode = app.find('#digit-selector');

            assert.isFalse(digitSelectorNode.exists());
        });

        test("hides the draft selector", (): void => {
            const app = mount(App);

            const digitsSelectorNode = app.find('#draft-selector');

            assert.isFalse(digitsSelectorNode.exists());
        });
    });

    suite("can have a number from 1 to 9 in", (): void => {

        test("an answer square", async (): Promise<void> => {
            const app = mount(App);
            const tdNodes = app.findAll('table td');
            const firstSquare = tdNodes[0];
            await firstSquare.trigger("click");

            const answerButton = app.find('#square-type-selector button[value="Answer"]');
            await answerButton.trigger("click");

            for(let digitIndex = 1; digitIndex < 10; digitIndex++) {
                const digitNode = app.find('#digit-selector button[value="' + digitIndex + '"]');
                await digitNode.trigger("click");

                assert.strictEqual(
                    firstSquare.text(),
                    digitIndex + ""
                );

                const digitNodes = app.findAll('#digit-selector button[data-state="checked"]');

                assert.lengthOf(digitNodes, 1);
            }
        });

        test("a filled square", async (): Promise<void> => {
            const app = mount(App);
            const tdNodes = app.findAll('table td');
            const firstSquare = tdNodes[0];
            await firstSquare.trigger("click");

            const filledButton = app.find('#square-type-selector button[value="Filled"]');
            await filledButton.trigger("click");

            for(let digitIndex = 1; digitIndex < 10; digitIndex++) {
                const digitNode = app.find('#digit-selector button[value="' + digitIndex + '"]');
                await digitNode.trigger("click");

                assert.strictEqual(
                    firstSquare.text(),
                    digitIndex + ""
                );

                const digitNodes = app.findAll('#digit-selector button[data-state="checked"]');

                assert.lengthOf(digitNodes, 1);
            }
        });
    });

    suite("can have in a draft square", (): void => {

        test("a number from 1 to 9", async (): Promise<void> => {
            const app = mount(App);
            const tdNodes = app.findAll('table td');
            const firstSquare = tdNodes[0];
            await firstSquare.trigger("click");

            const draftButton = app.find('#square-type-selector button[value="Draft"]');
            await draftButton.trigger("click");

            const labelNodes = app.findAll('#draft-selector label');

            for(const labelNode of labelNodes) {
                const button = labelNode.find('button');

                assert.strictEqual(button.attributes("data-state"), "unchecked");

                await labelNode.trigger("click");

                assert.strictEqual(button.attributes("data-state"), "checked");

                let buttonNodes = app.findAll('#draft-selector button[data-state="checked"]');

                assert.lengthOf(buttonNodes, 1);
                assert.strictEqual(
                    firstSquare.text(),
                    labelNode.text()
                );

                await labelNode.trigger("click");

                buttonNodes = app.findAll('#draft-selector button[data-state="checked"]');

                assert.lengthOf(buttonNodes, 0);
            }
        });

        test("many numbers", async (): Promise<void> => {
            const app = mount(App);
            const tdNodes = app.findAll('table td');
            const firstSquare = tdNodes[0];
            await firstSquare.trigger("click");

            const draftButton = app.find('#square-type-selector button[value="Draft"]');
            await draftButton.trigger("click");

            const labelNodes = app.findAll('#draft-selector label');

            const button0Node = labelNodes[0].get('button');
            const button1Node = labelNodes[1].get('button');

            assert.strictEqual(
                button0Node.attributes("data-state"),
                "unchecked"
            );
            assert.strictEqual(
                button1Node.attributes("data-state"),
                "unchecked"
            );

            await labelNodes[0].trigger("click");
            await labelNodes[1].trigger("click");

            assert.strictEqual(
                button0Node.attributes("data-state"),
                "checked"
            );
            assert.strictEqual(
                button1Node.attributes("data-state"),
                "checked"
            );

            const buttonNodes = app.findAll('#draft-selector button[data-state="checked"]');

            assert.lengthOf(buttonNodes, 2);
            assert.strictEqual(firstSquare.text(), "12");
        });

        test("all numbers", async (): Promise<void> => {
            const app = mount(App);
            const tdNodes = app.findAll('table td');
            const firstSquare = tdNodes[0];
            await firstSquare.trigger("click");

            const draftButton = app.find('#square-type-selector button[value="Draft"]');
            await draftButton.trigger("click");

            const labelNodes = app.findAll('#draft-selector label');
            let buttonNodes = app.findAll('#draft-selector button[data-state="unchecked"]');

            assert.lengthOf(buttonNodes, 9);

            for(const labelNode of labelNodes) {
                await labelNode.trigger("click");
            }

            buttonNodes = app.findAll('#draft-selector button[data-state="checked"]');

            assert.lengthOf(buttonNodes, 9);
            assert.strictEqual(firstSquare.text(), "123456789");
        });
    });

    suite("can change a square from", (): void => {

        suite("answer to", (): void => {

            test("draft", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const answerButton = squareTypeSelector.get('button[value="Answer"]');
                await answerButton.trigger("click");

                const labelNodes = app.findAll('#digit-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const draftButton = squareTypeSelector.get('button[value="Draft"]');
                await draftButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    draftButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isFalse(digitSelector.exists());

                const draftSelector = app.find('#draft-selector');

                assert.isTrue(draftSelector.exists());

                const draftButtons = draftSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(draftButtons, 0);
            });

            test("empty", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const answerButton = squareTypeSelector.get('button[value="Answer"]');
                await answerButton.trigger("click");

                const labelNodes = app.findAll('#digit-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const emptyButton = squareTypeSelector.get('button[value="Empty"]');
                await emptyButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    emptyButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isFalse(digitSelector.exists());

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });

            test("filled", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const answerButton = squareTypeSelector.get('button[value="Answer"]');
                await answerButton.trigger("click");

                const labelNodes = app.findAll('#digit-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const filledButton = squareTypeSelector.get('button[value="Filled"]');
                await filledButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    filledButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isTrue(digitSelector.exists());

                const digitButtons = digitSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(digitButtons, 0);

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });
        });

        suite("draft to", (): void => {

            test("answer", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const draftButton = squareTypeSelector.get('button[value="Draft"]');
                await draftButton.trigger("click");

                const labelNodes = app.findAll('#draft-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const answerButton = squareTypeSelector.get('button[value="Answer"]');
                await answerButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    answerButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isTrue(digitSelector.exists());

                const digitButtons = digitSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(digitButtons, 0);

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });

            test("empty", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const draftButton = squareTypeSelector.get('button[value="Draft"]');
                await draftButton.trigger("click");

                const labelNodes = app.findAll('#draft-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const emptyButton = squareTypeSelector.get('button[value="Empty"]');
                await emptyButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    emptyButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isFalse(digitSelector.exists());

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });

            test("filled", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const draftButton = squareTypeSelector.get('button[value="Draft"]');
                await draftButton.trigger("click");

                const labelNodes = app.findAll('#draft-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const filledButton = squareTypeSelector.get('button[value="Filled"]');
                await filledButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    filledButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isTrue(digitSelector.exists());

                const digitButtons = digitSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(digitButtons, 0);

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });
        });

        suite("empty to", (): void => {

            test("answer", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const draftButton = squareTypeSelector.get('button[value="Empty"]');
                await draftButton.trigger("click");

                assert.isEmpty(firstSquare.text());

                const answerButton = squareTypeSelector.get('button[value="Answer"]');
                await answerButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    answerButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isTrue(digitSelector.exists());

                const digitButtons = digitSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(digitButtons, 0);

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });

            test("draft", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const answerButton = squareTypeSelector.get('button[value="Empty"]');
                await answerButton.trigger("click");

                assert.isEmpty(firstSquare.text());

                const draftButton = squareTypeSelector.get('button[value="Draft"]');
                await draftButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    draftButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isFalse(digitSelector.exists());

                const draftSelector = app.find('#draft-selector');

                assert.isTrue(draftSelector.exists());

                const draftButtons = draftSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(draftButtons, 0);
            });

            test("filled", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const answerButton = squareTypeSelector.get('button[value="Empty"]');
                await answerButton.trigger("click");

                assert.isEmpty(firstSquare.text());

                const filledButton = squareTypeSelector.get('button[value="Filled"]');
                await filledButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    filledButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isTrue(digitSelector.exists());

                const digitButtons = digitSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(digitButtons, 0);

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });
        });

        suite("filled to", (): void => {

            test("answer", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const filledButton = squareTypeSelector.get('button[value="Filled"]');
                await filledButton.trigger("click");

                const labelNodes = app.findAll('#digit-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const answerButton = squareTypeSelector.get('button[value="Answer"]');
                await answerButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    answerButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isTrue(digitSelector.exists());

                const digitButtons = digitSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(digitButtons, 0);

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });

            test("draft", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const filledButton = squareTypeSelector.get('button[value="Filled"]');
                await filledButton.trigger("click");

                const labelNodes = app.findAll('#digit-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const draftButton = squareTypeSelector.get('button[value="Draft"]');
                await draftButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    draftButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isFalse(digitSelector.exists());

                const draftSelector = app.find('#draft-selector');

                assert.isTrue(draftSelector.exists());

                const draftButtons = draftSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(draftButtons, 0);
            });

            test("empty", async (): Promise<void> => {
                const app = mount(App);
                const tdNodes = app.findAll('table td');
                const firstSquare = tdNodes[0];
                await firstSquare.trigger("click");

                const squareTypeSelector = app.get('#square-type-selector');
                const filledButton = squareTypeSelector.get('button[value="Filled"]');
                await filledButton.trigger("click");

                const labelNodes = app.findAll('#digit-selector label');
                await labelNodes[0].trigger("click");

                assert.strictEqual(firstSquare.text(), "1");

                const emptyButton = squareTypeSelector.get('button[value="Empty"]');
                await emptyButton.trigger("click");

                assert.isEmpty(firstSquare.text());
                assert.strictEqual(
                    emptyButton.attributes("data-state"),
                    "checked"
                );

                const squareTypeButtons = squareTypeSelector.findAll('button[data-state="checked"]');

                assert.lengthOf(squareTypeButtons, 1);

                const digitSelector = app.find('#digit-selector');

                assert.isFalse(digitSelector.exists());

                const draftSelector = app.find('#draft-selector');

                assert.isFalse(draftSelector.exists());
            });
        });
    });
});
