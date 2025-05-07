// Necessary Imports (you will need to use this)
const { Student } = require('./Student')

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data // Student
  next // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor (data, next = null) {
    this.data = data instanceof Student ? data : new Student(data)
    //ensures that data is a student object, if not it creates a new one
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head // Object
  tail // Object
  length // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor () {
    this.head = null
    this.tail = null
    this.length = 0
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to thel; 'end' of the LinkedList (Hint: tail)
   */
  addStudent (newStudent) {
    const newNode = new Node(newStudent)
    if (!newStudent) {
      throw new Error('Invalid student data.')
    }
    // if the linkedList is empty, set both to new node
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    }
    // if the linkedlist is not empty, current tail.next is ne n ode
    //and the tail is updated to the new node.
    else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent (email) {
    //check that email type is correct
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email.')
    }

    if (!this.head) {
      //no students in list
      console.log('No students to remove.')
      return
    }
    if (this.head.data.getEmail() === email) {
      //remove the first student if email matches
      this.head = this.head.next
      if (!this.head) {
        //if the list is now empty, set tail to null
        this.tail = null
      }
      this.length--
      return
    }

    let current = this.head
    let previous = null

    while (current) {
      //looping over the list to fins matching ermail
      if (current.data.getEmail() === email) {
        console.log('Removing student with matching email')
        //set previous to current (eliminating current)
        previous.next = current.next
        if (current === this.tail) {
          //if current is also tail, update it to previous
          this.tail = previous
        }
        this.length--
        return
      }
      //continue looping
      previous = current
      current = current.next
    }
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent (email) {
    if (!email || typeof email !== 'string') {
      throw new Error('Invalid email.')
    }

    let current = this.head
    let previous = null

    while (current) {
      //looping over the list to find matching email
      if (current.data.getEmail() === email) {
        //if email matches return student object
        return current.data
      }
      previous = current
      current = current.next
    }
    //if no match is found, return -1
    console.log('Student not found.')
    return -1
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents () {
    //resets feilds to null and length to 0
    this.head = null
    this.tail = null
    this.length = 0
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents () {
    let current = this.head
    let list = []
    while (current !== null) {
      list.push(current.data.getName())
      current = current.next
    }
    return list.join(', ')
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName () {
    let list = []
    let current = this.head
    //looping over the list to get all students
    while (current) {
      list.push(current.data)
      current = current.next
    }

    list.sort((a, b) => a.getName().localeCompare(b.getName()))
    return list
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization (specialization) {
    if (specialization) {
      let sortedStudents = this.#sortStudentsByName()

      let list = []
      for (let student of sortedStudents) {
        if (student.getSpecialization() === specialization) {
          list.push(student)
        }
      }
      return list
    }
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge (minAge) {
    //ask about minage? min years of study?
    if (minAge && minAge > 0) {
      let sortedStudents = this.#sortStudentsByName()

      let list = []
      for (let student of sortedStudents) {
        if (student.getYear() === minAge) {
          list.push(student)
        }
      }
      return list
    }
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson (fileName) {
    if (!fileName || typeof fileName !== 'string') {
      throw new Error('Invalid file name.')
    }
    let list = []
    let current = this.head
    const fs = require('fs')
    // file system module to write to file
    while (current) {
      let studentData = {
        name: current.data.getName(),
        email: current.data.getEmail(),
        year: current.data.getYear(),
        specialization: current.data.getSpecialization()
      }
      list.push(studentData)
      current = current.next
    }
    let jsonData = JSON.stringify(list, null, 2)
    // convert the list to a JSON string, with 2 spaces for indentation
    fs.writeFileSync(fileName, jsonData)
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON (fileName) {
    const fs = require('fs').promises
    try {
      const fileContent = await fs.readFile(fileName, 'utf-8')
      const jsonData = JSON.parse(fileContent)

      this.clearStudents()

      jsonData.forEach(item => {
        let student = new Student(
          item.name,
          item.year,
          item.email,
          item.specialization
        )
        this.addStudent(student)
      })
    } catch (error) {
      console.error('Error loading data:', error.message) // Log the error message
    }
  }
}

module.exports = { LinkedList }
