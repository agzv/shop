export const transformErrors = errorsArray => {
    const errors = errorsArray.response.data.error.data.reduce((prevValue, currValue) => ({ ...prevValue, [currValue.param]: currValue.msg }), {});
    return errors;
}