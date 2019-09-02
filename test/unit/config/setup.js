import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import fetchMock from 'jest-fetch-mock'

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() });

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};

global.jsdom.reconfigure({
  features: {
    ProcessExternalResources: false
  }
})

global.fetch = fetchMock

jest.mock('react-storefront/fetch', () => global.fetch)
jest.mock('fetch', () => global.fetch, { virtual: true })
