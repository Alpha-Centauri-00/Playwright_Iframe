
import { test, expect } from "@playwright/test";

test.describe("Testing Elements on the Page", () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto("https://demoqa.com/");
  });

  

  test("Test Web Table (Search)", async ({page}) => {

    await page.locator('svg').first().click();
  
    await page.getByRole('list').getByText('Web Tables').click();
    await page.getByPlaceholder('Type to search').click();
    await page.getByPlaceholder('Type to search').fill('Cierra');
  
    const Cierra_items = [
        {name: 'Cierra', exact: true},
        {name: 'Vega', exact: true},
        {name: '39', exact: true},
        {name: 'cierra@example.com', exact: true},
        {name: '10000', exact: true},
    ]

    const Alden_items = [
        {name: 'Alden', exact: true},
        {name: 'Cantrell',exact:true},
        {name: 'alden@example.com',exact:true},
        {name: 'Kierra',exact:true},
    ]
    for (const item of Cierra_items){
        await expect(page.getByRole('gridcell',item)).toBeVisible()    
    }

    for (const item of Alden_items){
        await expect(page.getByRole('gridcell',item)).toBeHidden();    
    }
    
    await page.getByPlaceholder('Type to search').click();
    await page.getByPlaceholder('Type to search').press('Control+a');
    await page.getByPlaceholder('Type to search').press('Backspace');
  
    for (const item of Alden_items){
        await expect(page.getByRole('gridcell',item)).toBeVisible();    
    }
  
  })

  test("Radio Button", async ({page})=> {
    
    await page.locator('svg').first().click();
    await page.getByRole('list').getByText('Radio Button').click()
    
    await page.getByText('Yes').click();
    await expect(page.getByText("You have selected Yes")).toBeVisible() 
  
    await page.getByText('Impressive').click();
    await expect(page.getByText("You have selected Impressive")).toBeVisible() 
    await expect(page.locator('div').filter({ hasText: /^No$/ })).toHaveClass("custom-control disabled custom-radio custom-control-inline")
      
  })

  test.afterEach(async ({ page }) => {
    
    await page.close();
    
  });
});
