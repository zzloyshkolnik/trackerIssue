'use strict'

document.addEventListener('DOMContentLoaded', function() {
    let createBtn = document.getElementById('submit')

    createBtn.addEventListener('click', function(event) {
        event.preventDefault()

        createTask(getDataFromForm())
    })
})


function getDataFromForm() {

    const dataForm = {
        nameIssue: document.forms.form['name'].value,
        descIssue: document.forms.form['description'].value,
        priorityIssue: document.forms.form['priority'].value.toLowerCase(),
        assignIssue: document.forms.form['assign'].value,
    }

    document.forms.form.reset()

    return dataForm
}

function createTask(data) {

    const tagsObj = {
        tagName: 'div',
        props: {
            class: 'task',
        },
        childrens: [
            {
                tagName: 'h3',
                props: {
                    class: 'task__title',
                    text: data['nameIssue'],
                }
            },
            
            {
                tagName: 'span',
                props: {
                    class: 'task__status',
                    text: 'open',
                    name: 'status'
                }
            },

            {
                tagName: 'span',
                props: {
                    class: 'task__priority ' + 'task__priority_' + data['priorityIssue'],
                    text: data['priorityIssue'],
                }
            },

            {
                tagName: 'span',
                props: {
                    class: 'task__assign',
                    text: data['assignIssue'],
                }
            },

            {
                tagName: 'p',
                props: {
                    class: 'task__description',
                    text: data['descIssue'],
                }
            },

            {
                tagName: 'button',
                props: {
                    id: 'done-btn',
                    class: 'task__btn task__btn-done',
                    text: 'Done',
                    name: 'btn-done',
                    func: done
                }
            },

            {
                tagName: 'button',
                props: {
                    id: 'delete-btn',
                    class: 'task__btn task__btn-delete',
                    text: 'Delete',
                    func: deleting
                }
            },
        ]
    }

    const {tagName, props, childrens} = tagsObj

    let node = document.createElement(tagName)

    Object.entries(props).forEach(([key, value]) => {
        node.setAttribute(key, value)
    })

    childrens.forEach(child => {

        let {tagName, props} = child
        let nChild = document.createElement(tagName)

        Object.entries(props).forEach(([value, key]) => {
            switch(value) {
                case 'text':
                    nChild.innerText = key
                    break
                case 'func':
                    nChild.addEventListener('click', key)
                    break
                default:
                    nChild.setAttribute(value, key)
                    break
            }
        })

        node.appendChild(nChild)
    })

    document.querySelector('.task-container').appendChild(node)
}

function done() {
    this.parentNode.children['status'].innerText = 'done'
    this.parentNode.children['status'].className = 'task__status_done'
    this.parentNode.classList.add('task_done')
    
    document.querySelector('.task').removeChild(this)
}

function deleting() {
    document.querySelector('.task-container').removeChild(this.parentNode)
}