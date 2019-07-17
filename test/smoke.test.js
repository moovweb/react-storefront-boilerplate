const {
  createDefaultDriver,
  clickElement,
  findVisibleElements,
  waitForElement
} = require('react-storefront-selenium')

/*
const chromeOptions = new chrome.Options()
chromeOptions.addArguments('disable-infobars')
chromeOptions.addArguments('disable-extensions')
chromeOptions.addArguments('no-sandbox')
chromeOptions.addArguments('disable-dev-shm-usage')
chromeOptions.addArguments('disable-gpu')
chromeOptions.addArguments('headless')
chromeOptions.setUserPreferences({ credential_enable_service: false })
chromeOptions.windowSize({
  width: 414,
  height: 736
})
*/
configureChrome()

/*
const clickElement = async (driver, selector) => {
  const elements = await driver.findElements(By.css(selector))

  for (const element of elements) {
    const isDisplayed = await element.isDisplayed()

    if (isDisplayed) {
      return element.click()
    }
  }
}

const findVisibleElements = async (driver, selector) => {
  const elements = await driver.findElements(By.css(selector))
  const response = []

  for (const element of elements) {
    const isDisplayed = await element.isDisplayed()

    if (isDisplayed) {
      response.push(element)
    }
  }

  return response
}

const isDisplayedAndEnabled = async (driver, selector) => {
  const elements = await driver.findElements(By.css(selector))

  for (const element of elements) {
    const isDisplayed = await element.isDisplayed()
    const isEnabled = await element.isEnabled()

    if (isDisplayed && isEnabled) {
      return true
    }
  }

  return false
}

const waitForElement = (driver, selector) => {
  return driver.wait(() => isDisplayedAndEnabled(driver, selector), 5000)
}
*/

describe('smoke tests', () => {
  jest.setTimeout(30000)
  let driver

  beforeAll(() => {
    // driver = new Builder()
    //   .setChromeOptions(createDefaultChromeOptions())
    //   .forBrowser('chrome')
    //   .build()

    driver = createDefaultDriver()
  })

  afterAll(async () => {
    await driver.quit()
  })

  it('Navigate to landing page', async function() {
    await driver.get(host)
  })

  it('Navigate to category', async function() {
    await clickElement(driver, '[data-th="nav"]')
  })

  it('navigate to subcategory', async function() {
    await clickElement(driver, '[data-th="subcategory-link"]')
  })

  it('navigate to product', async function() {
    await clickElement(driver, '[data-th="product-link"]')
  })

  it('Add product to cart ', async function() {
    await clickElement(driver, '[data-th="add-to-cart"]')
  })

  it('Navigate to cart', async function() {
    await clickElement(driver, '[data-th="cart-link"]')
  })

  it('Verify product in cart', async function() {
    await waitForElement(driver, '[data-th="product-link"]')
    const products = await findVisibleElements(driver, '[data-th="product-link"]')
    expect(products).toHaveLength(1)
  })

  it('navigate to checkout', async function() {
    await clickElement(driver, '[data-th="checkout-link"]')
  })
})
