const request = require('supertest')
const app = require('../server')
require('dotenv').config()
let authToken, id, username, postId

describe('Test All API routes', () => {

  it('should respond 201 and create a new user', async() => {
    const res = await request(app)
      .post('/users')
      .send({
        email: 'jest-tester@jest.com',
        username: 'jestTester',
        password: 'jestPass123'
      })
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)

    //assign authToken for future requests 
    authToken = res.body.data.token
    username = res.body.data.username
    id = res.body.data.id
  })

  it('should respond 201 and upload avatar', async() => {
    await request(app)
      .put(`/users/image/${id}`)
      .attach("avatar", __dirname+'/testImg.png')
      .set('Authorization', authToken)
      .expect(201)
      .expect('Content-Type', /json/)
  })

  it('should respond 201 and update bio', async() => {
    await request(app)
      .put(`/users/bio/${id}`)
      .send({
        bio: 'I am a jest tester and this is my bio'
      })
      .set('Authorization', authToken)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)
  })

  it('should respond 202 and revoke token', async() => {
    await request(app)
      .delete(`/auth/revoke`)
      .set('Authorization', authToken)
      .set('Accept', 'application/json')
      .expect(202)
      .expect('Content-Type', /json/)
  })

  it('should respond 201 for login', async() => {
    const res = await request(app)
      .post('/login')
      .send({
        email: 'jest-tester@jest.com',
        password: 'jestPass123'
      })
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /json/)

      authToken = res.body.data.token
  })

  it('should respond 202 for login with auth token', async() => {
    await request(app)
    .post('/login')
    .set('Accept', 'application/json')
    .set('Authorization', authToken)
    .expect(202)
  })

  it('should respond 201 for creating post', async() => {
    const res = await request(app)
      .post(`/posts/${id}`)
      .send({
        message: 'jest test post'
      })
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(201)
      .expect('Content-Type', /json/)

    //assign post ID for future testing
    postId = res.body.data.postId
  })

  it('should respond 201 for liking post', async() => {
    await request(app)
    .put(`/posts/like/${postId}`)
    .send({
      userId: id,
      username: username
    })
    .set('Accept', 'application/json')
    .set('Authorization', authToken)
    .expect(201)
    .expect('Content-Type', /json/)
  })

  it('should respond 201 for removing a like', async() => {
    await request(app)
    .delete(`/posts/like/${postId}`)
    .send({
      userId: id
    })
    .set('Accept', 'application/json')
    .set('Authorization', authToken)
    .expect(201)
    .expect('Content-Type', /json/)
  })

  it('should respond 202 for deleting post', async() => {
    await request(app)
    .delete(`/posts/${postId}`)
    .set('Accept', 'application/json')
    .set('Authorization', authToken)
    .expect(202)
    .expect('Content-Type', /json/)
  })

  it('should respond 202 and delete a user', async() => {
    await request(app)
      .delete(`/users/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', authToken)
      .expect(202)
      .expect('Content-Type', /json/)
  })
})
