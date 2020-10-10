'use strict'

function bind() {
    let createBtn = document.getElementById('submit')

    createBtn.addEventListener('click', function(event) {
        event.preventDefault()

        createTask(getDataFromForm())
    })
}

function getDataFromForm() {

    const dataForm = {
        nameIssue: document.forms.form[0].value,
        descIssue: document.forms.form[1].value,
        priorityIssue: document.forms.form[2].value.toLowerCase(),
        assignIssue: document.forms.form[3].value,
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
    });

    childrens.forEach(child => {

        let {tagName, props} = child;
        let nChild = document.createElement(tagName)

        Object.entries(props).forEach(([value, key]) => {
            if (value == 'text') {
                nChild.innerText = key
            } else if (value == 'func') {
                nChild.addEventListener('click', key)
            }
            else {
                nChild.setAttribute(value, key)
            }
        });

        node.appendChild(nChild)
    })

    document.querySelector('.task-container').appendChild(node)
}

function done() {
    this.parentElement.children[1].innerText = 'done'
    this.parentElement.children[1].className = 'task__status_done'
    this.parentElement.classList.add('task_done')
    this.parentElement.children[5].remove()
}

function deleting() {
    this.parentElement.remove()
}

bind()