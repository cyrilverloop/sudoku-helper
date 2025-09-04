import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
    test: {
        coverage: {
            reportsDirectory: '../ci/coverage/'
        },
        environment: 'nuxt'
    }
});
