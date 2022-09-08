
const elements = {}

const IncludesClass = (querySelector, className) => {
    let element = SelectElement(querySelector)
    if (className.substring(0, 1) != '.')
        className = `.${className}`

    return element.matches(className)
}

const SelectElement = (querySelector) => {
    return document.querySelector(querySelector);
}

const ToggleTransition = (querySelector, className, ms = null, State) => (
    new Promise((resolve) => {
        let element = SelectElement(querySelector)

        element.classList.toggle(className)
        if (!ms) {
            resolve((State == 'added') ? 'removed' : 'added')
            return State
        }

        setTimeout(() => {
            element.classList.toggle(className)
            resolve(State)
        }, ms);
    }))


const actionsClass = (querySelector, className) => {
    let Element = SelectElement(querySelector)
    // console.log(Element);
    let State

    return {
        get state() { return State },
        get Element() { return SelectElement(querySelector) },
        get className() { return State ? className : '' },
        add: () => {
            SelectElement(querySelector).classList.add(className)
            return State = 'added'
        },
        remove: () => {
            SelectElement(querySelector).classList.remove(className)
            return State = 'removed'
        },
        toggle: () => {
            SelectElement(querySelector).classList.toggle(className)
            return State = (State == 'added') ? 'removed' : 'added'
        },
        toggleTransition: async (ms = null) => (
            State = await ToggleTransition(querySelector, className, ms, State)
        )
    }
}
export { actionsClass, IncludesClass, SelectElement, ToggleTransition }
