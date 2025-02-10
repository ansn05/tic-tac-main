import test from "@lib/BaseTest"

test(``, { tag: '@Smoke'}, async ({ gamePage }) => {
    await test.step(`Navigate to Application`, async () => {
        await gamePage.navigateToURL();
    });
});