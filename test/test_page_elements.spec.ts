
import { test, Page,expect } from '@playwright/test';


const URL_Home = "https://demoqa.com/";
let page: Page;

test.beforeAll(async ({ browser }) => {
  await test.step('Open The main Page', async () => {
    
    page = await browser.newPage();
    await page.goto(URL_Home);
    docu("Click on Elements On the left")
    await page.locator('svg').first().click();
  });
});

test.afterAll(async () => {
  await page.close();
});

function docu(Document:string): void {
  test.step(Document, async ()=> {});
};

const TEXT_BOX = [
  "Tester 1",
  "test@test.com",
  "Marowanna street 1",
  "this is a message"
]

const NEW_FORM = [
  "LALA",
  "BALA",
  "lala.bala@example.com",
  "22",
  "50",
  "IT",
]


test('Check Elements', async ({}) => {
    
    docu("Click on Text Box")
    await page.getByText('Text Box').click();
    
    docu("Write in Full Name = Tester 1")
    await page.getByPlaceholder("Full Name").fill(TEXT_BOX[0]);
  
    docu("Write in E-mail = name@example.com")
    await page.getByPlaceholder("name@example.com").fill(TEXT_BOX[1]);
  
    docu("Write in Current Address")
    await page.getByPlaceholder("Current Address").fill(TEXT_BOX[2]);
  
    docu("Write in Permanent Address")
    await page.locator("#permanentAddress").fill(TEXT_BOX[3]);
  
    docu("Click on Submit")
    await page.locator("#submit").click();
     
    docu("Check if name appears")
    await expect(page.getByText(`Name:${TEXT_BOX[0]}`)).toBeVisible()

    docu("Check if E-mail appears")
    await expect(page.getByText(`Email:${TEXT_BOX[1]}`)).toBeVisible()

    docu("Check if Address appears")
    await expect(page.getByText(`Current Address :${TEXT_BOX[2]}`,{ exact: true })).toBeVisible()

    docu("Check if Permanent Address appears")
    await expect(page.getByText(`Permananet Address :${TEXT_BOX[3]}`)).toBeVisible()
  
});

test("Check CheckBox Elements", async ({}) => {
          
  docu("Click on Check Box")
  await page.getByText("Check Box").click();

  docu("Click on Toggle > Home")
  await page.getByRole('button', { name: 'Toggle' }).click();

  // toggle everything
  docu("Click on Toggle > Desktop")
  await page.getByRole('listitem').filter({ hasText: /^Desktop$/ }).getByRole('button', { name: 'Toggle' }).click();
  docu("Click on Toggle > Document")
  await page.getByRole('listitem').filter({ hasText: /^Documents$/ }).getByRole('button', { name: 'Toggle' }).click();
  docu("Click on Toggle > Download")
  await page.getByRole('listitem').filter({ hasText: /^Downloads$/ }).getByRole('button', { name: 'Toggle' }).click();

  
  //console.log(await page.locator('div#result').textContent())
  docu("Checkbox Home")
  await page.locator('label').filter({ hasText: 'Home' }).locator('svg').first().click();
  docu("Check Text for Home")
  await expect(page.getByText("You have selected :homedesktopnotescommandsdocumentsworkspacereactangularveuofficepublicprivateclassifiedgeneraldownloadswordFileexcelFile")).toBeVisible()
  docu("Uncheckbox Home")
  await page.locator('label').filter({ hasText: 'Home' }).locator('svg').first().click();

  docu("Checkbox Desktop")
  await page.locator('label').filter({ hasText: 'Desktop' }).locator('svg').first().click();
  docu("Check Text for Desktop")
  await expect(page.getByText("You have selected :desktopnotescommands")).toBeVisible()
  docu("Uncheckbox Desktop")
  await page.locator('label').filter({ hasText: 'Desktop' }).locator('svg').first().click();  
  
  docu("Checkbox Documents")
  await page.locator('label').filter({ hasText: 'Documents' }).locator('svg').first().click();
  docu("Check Text for Decuments")
  await expect(page.getByText("You have selected :documentsworkspacereactangularveuofficepublicprivateclassifiedgeneral")).toBeVisible()
  docu("Uncheckbox Documents")
  await page.locator('label').filter({ hasText: 'Documents' }).locator('svg').first().click();

  docu("Checkbox Download")
  await page.locator('label').filter({ hasText: 'Downloads' }).locator('svg').first().click();
  docu("Check Text for Download")
  await expect(page.getByText("You have selected :downloadswordFileexcelFile")).toBeVisible() 
  docu("Uncheckbox Download")
  await page.locator('label').filter({ hasText: 'Downloads' }).locator('svg').first().click();
})

test("Radio Button", async ({})=> {
  //locator('div').filter({ hasText: /^Yes$/ })
  
  docu("Choos on Radio button")
  await page.getByRole('list').getByText('Radio Button').click()

  docu("Choose YES")
  await page.locator('div').filter({ hasText: /^Yes$/ }).click()
  docu("Check Text = You have selected Yes")
  await expect(page.getByText("You have selected Yes")).toBeVisible() 

  docu("Choose Impressive")
  await page.locator('div').filter({ hasText: /^Impressive$/ }).click()
  docu("Check Text = You have selected Impressive")
  await expect(page.getByText("You have selected Impressive")).toBeVisible() 

  docu("Check if NO has a (Disabled Class)")
  await expect(page.locator('div').filter({ hasText: /^No$/ })).toHaveClass("custom-control disabled custom-radio custom-control-inline")
    
})

test("Test Web Table (Search)", async ({}) => {

  
  await page.getByRole('list').getByText('Web Tables').click();
  await page.getByPlaceholder('Type to search').click();
  await page.getByPlaceholder('Type to search').fill('Cierra');

  await expect(page.getByRole('gridcell',{ name: 'Cierra', exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: 'Vega', exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: '39', exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: 'cierra@example.com', exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: '10000', exact: true })).toBeVisible()

  await expect(page.getByRole('gridcell',{ name: 'Alden', exact: true })).toBeHidden();
  await expect(page.getByRole('gridcell',{ name: 'Cantrell',exact:true})).toBeHidden()
  await expect(page.getByRole('gridcell',{ name: 'alden@example.com',exact:true})).toBeHidden()
  await expect(page.getByRole('gridcell',{ name: 'Kierra',exact:true})).toBeHidden()

  await page.getByPlaceholder('Type to search').click();
  await page.getByPlaceholder('Type to search').press('Control+a');
  await page.getByPlaceholder('Type to search').press('Backspace');

  await expect(page.getByRole('gridcell',{ name: 'Alden',exact:true})).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: 'Cantrell',exact:true})).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: 'alden@example.com',exact:true})).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: 'Kierra',exact:true})).toBeVisible()


})





test("Test Web Table (Add and delete)", async ({})=>{
  await page.getByRole('list').getByText('Web Tables').click();
  
  await page.getByRole('button', { name: 'Add' }).click();

  // add new Form
  await page.getByPlaceholder('First Name').fill(`${NEW_FORM[0]}`);
  await page.getByPlaceholder('Last Name').fill(`${NEW_FORM[1]}`);
  await page.getByPlaceholder('name@example.com').fill(`${NEW_FORM[2]}`);
  await page.getByPlaceholder('Age').fill(`${NEW_FORM[3]}`);
  await page.getByPlaceholder('Salary').fill(`${NEW_FORM[4]}`);
  await page.getByPlaceholder('Department').fill(`${NEW_FORM[5]}`);

  await page.getByRole('button', { name: 'Submit' }).click();

  // Check if the form in grid
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[0]}`, exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[1]}`, exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[2]}`, exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[3]}`, exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[4]}`, exact: true })).toBeVisible()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[5]}`, exact: true })).toBeVisible()

  // delete a form
  await page.getByRole('row', { name: `${NEW_FORM[0]} ${NEW_FORM[1]} ${NEW_FORM[3]} ${NEW_FORM[2]} ${NEW_FORM[4]} ${NEW_FORM[5]} 
    Edit Delete`}).getByTitle('Delete').locator('path').click();

  // Check if the form Not in grid anymore
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[0]}`, exact: true })).toBeHidden()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[1]}`, exact: true })).toBeHidden()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[2]}`, exact: true })).toBeHidden()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[3]}`, exact: true })).toBeHidden()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[4]}`, exact: true })).toBeHidden()
  await expect(page.getByRole('gridcell',{ name: `${NEW_FORM[5]}`, exact: true })).toBeHidden()

})

test("Testing buttons", async ({})=> {
  
  await page.getByRole('listitem').filter({ hasText: 'Buttons' }).click();
  //Double Click
  await page.getByRole('button', { name: 'Double Click Me' }).dblclick();
  await expect(page.getByText("You have done a double click")).toBeVisible()
  //Right Click
  await page.getByRole('button', { name: 'Right Click Me' }).click({button: 'right'});
  await expect(page.getByText("You have done a right click")).toBeVisible()
  //Normal Click
  await page.getByRole('button', { name: 'Click Me', exact: true }).click();
  await expect(page.getByText("You have done a dynamic click")).toBeVisible()
    
})

test("Testing URL",async ({})=>{
  
  await page.getByRole('listitem').filter({ hasText: /^Links$/ }).click();

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  const page1 = await page1Promise;
  const New_URL:string = page1.url()
  expect(URL_Home).toBe(New_URL)
  
})
