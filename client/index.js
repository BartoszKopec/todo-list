const addTaskForm = document.querySelector('#addTaskForm')
const addTaskTitle = document.querySelector('#addTaskForm #title')
const addTaskDescription = document.querySelector('#addTaskForm #description')
const addTaskBtn = document.querySelector('#addTaskBtn')
const addTaskMsg = document.querySelector('#addTaskMsg')
const tasksList = document.querySelector('#tasksList')
const tasksListMsg = document.querySelector('#tasksListMsg')


const addTask = async () => {
  const data = new FormData(addTaskForm)

  const headers = new Headers({
    'Content-Type': 'application/json; charset=utf-8'
  })

  const body = JSON.stringify({
    title: data.get('title'),
    description: data.get('description')
  })

  return await fetch('/api/tasks', { method: 'POST', headers, body })
}

const listTasks = async () => {
  tasksList.innerHTML = ''
  tasksListMsg.classList.remove('is-danger')
  tasksListMsg.classList.add('is-hidden')

  fetch('/api/tasks')
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText)
      }

      return response.json()
    })
    .then((response) => {
      response.forEach((task) => {
        const title = document.createElement('td')
        title.innerHTML = `<p>${task.title}</p>`

                   
        const description = document.createElement('td')
        description.innerHTML = `<p>${task.description == '' ? 'Brak opisu': task.description}</p>`
        
        const timestamp = document.createElement('td')
        timestamp.innerHTML = `<p>${moment(task.Timestamp).format('DD-MM-YYYY')}</p>`

        const row = document.createElement('tr')
        row.appendChild(title)
        row.appendChild(description)
        row.appendChild(timestamp)

        tasksList.appendChild(row)
      })
    })
    .catch((e) => {
      console.log(e.message)
      tasksListMsg.textContent = 'Wystąpił błąd podczas pobierania listy zadań. Spróbuj ponownie później.'
      tasksListMsg.classList.add('is-danger')
      tasksListMsg.classList.remove('is-hidden')
    })
}


addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault()

  addTaskBtn.classList.add('is-loading', 'is-disabled')
  addTaskMsg.classList.remove('is-danger', 'is-success')
  addTaskMsg.classList.add('is-hidden')

  setTimeout(() => {
    addTask()
      .then((response) => {
        if(response.status == 400){
          throw Error('Nie można dodać zadania bez tytułu. Podaj tytuł zadania i spróbuj ponownie.')
        }
        if (!response.ok && response.status != 400) {
          throw Error('Wystąpił błąd podczas dodawania zadania. Spróbuj ponownie później.')
        }

        addTaskMsg.textContent = 'Pomyślnie dodano zadanie.'
        addTaskMsg.classList.add('is-success')
        addTaskTitle.value = ''
        addTaskDescription.value = ''

        listTasks()
      })
      .catch((error) => {
        addTaskMsg.textContent = error.message
        addTaskMsg.classList.add('is-danger')
      })
      .finally(() => {
        addTaskBtn.classList.remove('is-loading', 'is-disabled')
        addTaskMsg.classList.remove('is-hidden')
      })
  }, 1000)    
})


listTasks()