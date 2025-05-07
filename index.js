// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require('./LinkedList')
const { Student } = require('./Student')
const readline = require('readline')

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList()

// Display available commands
function main () {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `)
}

// Command handling logic
async function handleCommand (command) {
  const [operation, ...args] = command.trim().split(' ')

  switch (operation) {
    case 'add':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
      console.log('Adding student...')
      const [name, year, email, specialization] = args

      // --------> WRITE YOUR CODE BELOW
      if (!name || !year || !email || !specialization) {
        console.log(
          'Please provide all required fields: name, year, email, specialization'
        )
        return
      }
      if (studentManagementSystem.findStudent(email) !== -1) {
        console.log(`Student with email ${email} already exists.`)
        return
      }
      let student = new Student(name, year, email, specialization)
      studentManagementSystem.addStudent(student)

      console.log(`Student ${name} added successfully!`)
      console.log(studentManagementSystem.displayStudents())

      // --------> WRITE YOUR CODE ABOVE
      break

    case 'remove':
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log('Removing student...')
      // --------> WRITE YOUR CODE BELOW
      const [removeEmail] = args
      if (!removeEmail) {
        console.log('Please provide an email to remove.')
        return
      }
      const studentToRemove = studentManagementSystem.findStudent(removeEmail)
      if (studentToRemove === -1) {
        console.log(`Student with email ${removeEmail} does not exist.`)
        return
      }
      studentManagementSystem.removeStudent(removeEmail)
      console.log(`Student with email ${removeEmail} removed successfully!`)

      if (studentManagementSystem.length === 0) {
        console.log('No students left in the list.')
        return
      }
      console.log(studentManagementSystem.displayStudents())
      // --------> WRITE YOUR CODE ABOVE
      break

    case 'display':
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log('Displaying students...')
      // --------> WRITE YOUR CODE BELOW
      console.log(studentManagementSystem.displayStudents())
      if (studentManagementSystem.length === 0) {
        console.log('No students in the list.')
        return
      }
      // --------> WRITE YOUR CODE ABOVE
      break

    case 'find':
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log('Finding student...')
      // --------> WRITE YOUR CODE BELOW
      const [findEmail] = args
      if (!findEmail) {
        console.log('Please provide an email to find.')
        return
      }
      const studentToFind = studentManagementSystem.findStudent(findEmail)
      if (studentToFind === -1) {
        console.log(`Student with email ${findEmail} does not exist.`)
        return
      }
      console.log(`Student found: ${studentToFind.getName()}`)
      // --------> WRITE YOUR CODE ABOVE
      break

    case 'save':
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log('Saving data...')
      // --------> WRITE YOUR CODE BELOW
      const [saveFileName] = args
      if (!saveFileName) {
        console.log('Please provide a file name to save the data.')
        return
      }
      studentManagementSystem.saveToJson(saveFileName)
      console.log(`Data saved to ${saveFileName} successfully!`)

      // --------> WRITE YOUR CODE ABOVE
      break
      
    case 'load':
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      // --------> WRITE YOUR CODE BELOW
      console.log('Loading data...')
      const [loadFileName] = args
      if (!loadFileName) {
        console.log('Please provide a file name to load the data from.')
        return
      }
      try {
        await studentManagementSystem.loadFromJSON(loadFileName)
        console.log(`Data loaded from ${loadFileName} successfully!`)
        console.log(studentManagementSystem.displayStudents())
      } catch (error) {
        console.error(`Error loading data: ${error.message}`)
      }
      // --------> WRITE YOUR CODE ABOVE
      break

    case 'clear':
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log('Clearing data...')
      // --------> WRITE YOUR CODE BELOW
      studentManagementSystem.clearStudents()
      console.log('All students cleared successfully!')
      // --------> WRITE YOUR CODE ABOVE
      break

    case 'q':
      console.log('Exiting...')
      rl.close()
      break

    default:
      console.log('Unknown command. Type "help" for a list of commands.')
      break
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log('Welcome to the Student Management System!')
main()
rl.on('line', async input => {
  if (input.trim().toLowerCase() === 'help') {
    main()
  } else {
    await handleCommand(input)
  }
})
rl.on('close', () => {
  console.log('Goodbye!')
})
