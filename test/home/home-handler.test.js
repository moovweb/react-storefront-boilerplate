import homeHandler from '../../src/home/home-handler'
import mockRequest from '../mockRequest'

describe('home-handler', () => {
  it('should return title and welcomeMessage', async () => {
    const { request, response } = mockRequest()
    const result = await homeHandler({} , request, response)
    expect(result).toHaveProperty('title')
    expect(result).toHaveProperty('welcomeMessage')
  })
  
})