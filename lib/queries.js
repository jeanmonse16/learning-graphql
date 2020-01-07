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
    }
}