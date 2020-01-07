'use strict'

const Courses = [
    {
        _id: 'anyid',
        title: 'nodejs',
        teacher: 'Jeanpier',
        description: 'genial curso',
        topic: 'backend'
    },
    {
        _id: '2',
        title: 'nodejs2',
        teacher: 'Jeanpier',
        description: 'genial curso',
        topic: 'backend'
    },
    {
        _id: '3',
        title: 'nodejs avanzado',
        teacher: 'Jeanpier',
        description: 'genial curso',
        topic: 'backend'
    }
]
const resolvers = {
  getCourses: () => Courses,

}

module.exports = resolvers