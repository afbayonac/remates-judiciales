import 'mocha'
import {expect, assert} from 'chai'
import {cfg} from '../../app/cfg/cfg'
import {User} from '../../app/models/user'
import {fkUser} from '../fakers'
import {connect, disconnect} from 'mongoose'
import * as supertest from 'supertest'

const db = cfg.mongodb

describe('authOwn', function () {
  let api = supertest.agent(cfg.domain)
  let token = ''

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`)
    .then(function ()  {
      User.remove({}).exec(done)
    }, done)
  })

  before(function (done) {
    new User(fkUser).save(done())
  })

  it('authOwn API', function (done) {
    api
    .post('/auth')
    .type('form')
    .send({
      username: fkUser.username,
      password: fkUser.cred.password
    })
    .set('Accept', 'application/json')
    .end(function (err, res) {
      if (err) {
        done(err)
      }
      expect(res.status).to.equal(200, 'no status expect')
      assert.equal(res.body.token_type, 'Bearer', 'Fail type token')
      expect(res.body.expired_in).to.be.a('number')
      expect(res.body.access_token).to.be.a('string')
      expect(res.body.access_token).to
      .match(/[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)$/)
      token = res.body.access_token
      done()
    })
  })

  it ('request with token', function (done) {
    api
    .get('/')
    .set('Authorization', `Bearer ${token}`)
    .end(function (err, res) {
      expect(res.status).to.equal(404)
      done()
    })
  })

  it ('request without token', function (done) {
    api
    .get('/')
    .end(function (err, res) {
      expect(res.status).to.equal(403)
      done()
    })
  })

  after(function (done) {
    disconnect().then(done)
  })
})
