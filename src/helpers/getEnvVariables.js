
export const getEvnVariables = () => {

    import.meta.env

    //const v = [...(import.meta.env ? [true] : [false])]
    return {
        ...import.meta.env
    }
}

