const redis = require('redis')
const redisClient = redis.createClient({host: process.env.REDIS_URI})
require('dotenv').config()

const set = async (key, userToken) => {
  const {id, avatar, username } = userToken
  const idString = id.toString()

  await new Promise((resolve, reject) => {
    return redisClient.hset(key, 'id', idString, 'avatar', avatar, 'username', username, (err, reply) => {
      (err || !reply) 
        ? (err && reject(err), !reply && reject('error setting auth token'))
        : resolve(reply)
    })
  })
}

const autheniticate = async (authorization) => {
  return new Promise((resolve, reject) => {
    redisClient.exists(authorization, (err, reply) => {
      if(err || !reply) {
        reject(err ? err : 'invalid token')
      }
      resolve(reply === 1 ? true : false)
    })
  })  
}

const get = async (authorization) => {
  return new Promise((resolve, reject) => {
    redisClient.hmget(authorization, ['id', 'avatar', 'username'], (err, reply) => {
      if(err || !reply) {
        reject(err ? err : 'invalid token')
      }
      resolve(reply)
    })
  })  
}

const revoke = async (authorization) => {
  return await new Promise((resolve, reject) => {
    redisClient.del(authorization, (err, reply) => {
      if(err || !reply) {
        reject(err ? err : 'invalid token')
      }
      resolve(reply)
    })
  })  
}

module.exports = {
  get: get,
  set: set,
  revoke: revoke,
  autheniticate, autheniticate
}