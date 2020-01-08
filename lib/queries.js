'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')

module.exports = {
    getCourses: async () => {
        let db, courses = []
        try{
          db = await connectDB()
          courses = await db.collection("courses").find().toArray()
        }catch(e){
          console.log(e)
        }
        return courses
    },
    getCourse: async (root, args) => {
        let db
        let course
        try{
          db = await connectDB()
          course = await db.collection('courses').findOne({_id: ObjectId(args.id)})
        }catch(e){
            console.error(e)
        }
        return course
    },
    getStudents: async () => {
      let db, students = []
      try {
        db = await connectDB()
        students = await db.collection("students").find().toArray()
      } catch (error) {
        console.log(e)
      }
        return students
    },
    getStudent: async (root, args) => {
      let db, student
      try {
        db = await connectDB()
        student = await db.collection("students").findOne({ _id: ObjectId(args.id) })
      } catch (error) {
        console.error(error)
      }

      return student
    }
}