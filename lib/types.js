'use strict'

const DB = require('./db')
const { ObjectId } = require("mongodb")

module.exports = {
    Courses : {
        people: async ({people}) => {
        let connectDb
        let ids
        let peopleData
        try {
            connectDb = await DB()
            ids = people ? people.map(id => ObjectId(id)) : []
            peopleData = ids.length > 0 ? await connectDb.collection("students").find(
                                              { _id: {$in: ids} }
                                              ).toArray() 
                                        : [] 
        } catch (error) {
            console.error(error)
            throw new Error("http response status: 500")
        }
        return peopleData
        }
    }
}