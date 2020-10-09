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
        nameIssue: document.forms.issueForm[0].value,
        descIssue: document.forms.issueForm[1].value,
        priorityIssue: document.forms.issueForm[2].value.toLowerCase(),
        assignIssue: document.forms.issueForm[3].value,
    }

    document.forms.issueForm.reset()

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
                    class: 'task-header',
                    text: data['nameIssue'],
                }
            },
            
            {
                tagName: 'span',
                props: {
                    class: 'task-status',
                    text: 'open',
                }
            },

            {
                tagName: 'span',
                props: {
                    class: 'task-priority ' + data['priorityIssue'],
                    text: data['priorityIssue'],
                }
            },

            {
                tagName: 'span',
                props: {
                    class: 'task-assign',
                    text: data['assignIssue'],
                }
            },

            {
                tagName: 'p',
                props: {
                    class: 'task-description',
                    text: data['descIssue'],
                }
            },

            {
                tagName: 'button',
                props: {
                    id: 'done-btn',
                    class: 'task-btn',
                    text: 'Done',
                    func: done
                }
            },

            {
                tagName: 'button',
                props: {
                    id: 'close-btn',
                    class: 'task-btn',
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
    this.parentElement.children[2].innerText = 'done'
    this.parentElement.children[2].className = 'done'
    this.parentElement.classList.add('done')
    this.parentElement.children[5].remove()
}

function deleting() {
    this.parentElement.remove()
}

bind()