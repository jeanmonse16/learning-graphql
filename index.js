'use strict'

require('dotenv').config()
const express = require('express')
const { makeExecutableSchema } = require('graphql-tools')
const expressGql = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.PORT || 3000

// Definiendo y creano el schema de la API  de graphQL
const typeDefs = readFileSync( join(__dirname, 'lib', 'schema.graphql'), 'utf-8')

const schema = makeExecutableSchema({ typeDefs, resolvers})

// Los métodos que realizaran los request para hacer queries a la API son los resolvers

// la función graphql ejecuta lo que vendrían siendo el request y el response de la API
app.use('/api', expressGql({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => console.log('server listening on ' + port))
