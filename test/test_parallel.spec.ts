
import { test, expect } from "@playwright/test";

test.describe.configure({ mode: 'parallel' });
    

test('runs in parallel 1', async ({ page }) => { 
    await page.goto("https://demoqa.com/");
    
 });
 
test('runs in parallel 2', async ({ page }) => { 
    await page.goto("https://demoqa.com/");
    page.close()
 });