const addTaskForm = document.querySelector('#addTaskForm')
const addTaskTitle = document.querySelector('#addTaskForm #title')
const addTaskDescription = document.querySelector('#addTaskForm #description')
const addTaskBtn = document.querySelector('#addTaskBtn')
const addTaskMsg = document.querySelector('#addTaskMsg')

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