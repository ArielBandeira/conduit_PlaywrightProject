import { test as base } from '@playwright/test';
import * as fs from "node:fs";

const data = JSON.parse(fs.readFileSync(`./test-data/users.json`, 'utf-8'));

export type TestOptions = {
    user: string;
};

export const Environment = base.extend<TestOptions>({
    user: data.validUser1
});
