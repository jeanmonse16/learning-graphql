'use strict'

const DB = require('./db')
const { ObjectId } = require("mongodb")

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
          console.error(error)
          throw new Error("http response status: 500")
      }

      return newCourse
    },
    editCourse: async (root, {_id, input}) => {
      let connectDB, newCourse
      try {
          connectDB = await DB()
          await connectDB.collection("courses").updateOne(
              {_id: ObjectId(_id)},
              { $set: input})
          newCourse = await connectDB.collection("courses").findOne({_id: ObjectId(_id)})
      } catch (error) {
          console.error(error)
          throw new Error("http response status: 500")
      }
      return newCourse
    },
    deleteCourse: async (root, {_id}) => {
    let connectDB, deletedCourse
    try {
        connectDB = await DB()
        deletedCourse = await connectDB.collection("courses").deleteOne({_id: ObjectId(_id)})
    } catch (error) {
        console.error(error)
        throw new Error("http response status: 500")
    }
    },
    newPerson: async (root, args) => {
        let connectDB, student
        try {
            connectDB = await DB()
            student = await connectDB.collection("students").insertOne(args.input)
            args.input._id = student.insertedId
        } catch (error) {
            console.error(error)
            throw new Error("http response status: 500")
        }
        return args.input
    },
    editPerson: async (root, {_id, input}) => {
        let connectDB, newStudent
        try {
            connectDB = await DB()
            await connectDB.collection("students").updateOne(
                {_id: ObjectId(_id)},
                { $set: input})
            newStudent = await connectDB.collection("students").findOne({_id: ObjectId(_id)})
        } catch (error) {
            console.error(error)
            throw new Error("http response status: 500")
        }
        return newStudent
    },
    deleteStudent: async (root, {_id}) => {
        let connectDB
        try {
        connectDB = await DB()
        deletedStudent = await connectDB.collection("student").deleteOne({_id: ObjectId(_id)})
        } catch (error) {
        console.error(error)
        throw new Error("http response status: 500")
        }
    },
    addStudent: async (root, {courseId, studentId}) => {
        let connectDB, course, student
        try {
            connectDB = await DB() 
            course = await connectDB.collection("courses").findOne({_id: ObjectId(courseId)})
            student = await connectDB.collection("students").findOne({_id: ObjectId(studentId)})

            if(!course || !student) throw new Error("la persona o el curso es invalido")

            await connectDB.collection("courses").updateOne(
                {_id: ObjectId(courseId)},
                {$addToSet: {people: ObjectId(studentId)}}
            )
        } catch (error) {
            console.error(error)
            throw new Error("http response status: 500")
        }
        return course
    }
}