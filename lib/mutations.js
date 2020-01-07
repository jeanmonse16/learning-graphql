'use strict'

const DB = require('./db')

module.exports = {
    newCourse: async (root, args) => {
      const defaults = {
          description: '',
          topic: ''
      }

      //Object.assign lo que hace es reemplazar y añadir a los valores del primer argumento por los del segundo
      const newCourse = Object.assign(defaults, args.input)
      let connectDB, Course
      try {
         connectDB = await DB() 
         Course = await connectDB.collection('courses').insertOne(args.input)
         newCourse._id = Course.insertedId
      } catch (error) {
          console.error(e)
      }

      return newCourse
    }
}