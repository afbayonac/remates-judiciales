import {cfg} from '../../app/cfg/cfg'
import {Remate} from '../../app/models/remate'

import {fkRemate} from '../fakers'
import {expect, should, assert} from 'chai'
import {connect, disconnect} from 'mongoose'

const db = cfg.mongodb

describe ('remate model', function () {
  let remate = fkRemate()

  before(function (done) {
    connect(`mongodb://${db.hostname}:${db.port}/${db.name}`, done)
  })

  it('generate hash',function (done) {
    Remate
    .create(remate)
    .then((rematedb) => {
      expect(remate).to.exist
      expect(rematedb.rawid).to.be.a('string')
      expect(rematedb.raw).to.be.a('string')
      done()
    })
    .catch(done)
  })

  after(function (done) {
    disconnect().then(done)
  })
})
