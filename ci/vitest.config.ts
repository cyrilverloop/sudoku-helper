import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    test: {
        coverage: {
            reporter: [
                ["html", {subdir: "./html/"}],
            ],
            reportsDirectory: '../ci/coverage/'
        },
        environment: 'nuxt',
        include: [
            "./test/**/*.test.ts"
        ]
    }
});
