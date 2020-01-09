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
          throw new Error("http response status: 500")
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
            throw new Error("http response status: 500")
        }
        return course
    },
    getPersons: async () => {
      let db, students = []
      try {
        db = await connectDB()
        students = await db.collection("students").find().toArray()
      } catch (error) {
        console.log(e)
        throw new Error("http response status: 500")
      }
        return students
    },
    getPerson: async (root, args) => {
      let db, student
      try {
        db = await connectDB()
        student = await db.collection("students").findOne({ _id: ObjectId(args.id) })
      } catch (error) {
        console.error(error)
        throw new Error("http response status: 500")
      }

      return student
    },
    SearchKeywords: async (root, {keywords}) => {
      let db, items, people, courses
      try {
        db = await connectDB()
        courses = await db.collection("courses").find({ $text: {$search: keywords} }).toArray()
        people = await db.collection("students").find({ $text: {$search: keywords} }).toArray()
        items = [...courses, ...people]
      } catch (error) {
        console.error(error)
        throw new Error("http response status: 500")
      }

      return items
    }
}