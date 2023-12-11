import * as rules from '@vee-validate/rules';
import { defineRule } from 'vee-validate';

export default defineNuxtPlugin((nuxtApp) => {
    Object.keys(rules)
    .filter((rule) => rule !== 'default')
    .forEach((rule) => {
        defineRule(rule, (rules as any)[rule]); // Add index signature to fix the error
    });
})
