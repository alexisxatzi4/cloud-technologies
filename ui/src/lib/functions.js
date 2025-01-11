

export const requiredRules = {
    required: {
        value: true,
        message: "This field is required"
    }
}

export const positiveNumberRules = {
    required: {
        value: true,
        message: "This field is required"
    },
    pattern: {
        value: /^[0-9]+$/,
        message: 'This field should be a positive number',

    },
}
