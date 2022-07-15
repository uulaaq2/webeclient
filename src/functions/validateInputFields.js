import { setSuccessReply, setCustomReply, setErrorReply } from 'functions/replies'
import { _getDebugLine } from 'functions/helpers'

export const validateInputFields = (inputs) => {  
  try {   
    let inputValue = ''
    let errorText = ''
    let notChecked
    let erroredElements = []

    for (let key in inputs) {    
      errorText = ''
      notChecked = true
      if (inputs.hasOwnProperty(key)) {
          if (inputs[key].hasOwnProperty('errorText')) {
            if (inputs[key]['errorText']) {
              inputs[key]['errorText'] = '123'
            }
          }
          if (inputs[key].validate) {
            let currentKey= inputs[key]
  
            inputValue = currentKey.ref.current.value
            
            if (currentKey.required) {
              if (inputValue.replace(/\s+/g, '') === '') {
                errorText = currentKey.label + ' required'
                erroredElements.push(currentKey.ref.current)
              }
  
              notChecked = false
            }
    
            if (currentKey.pattern && notChecked) {
              if (!inputValue.match(currentKey.pattern)) {
                errorText = 'Invalid ' + currentKey.label
                erroredElements.push(currentKey.ref.current)
              }
  
              notChecked = false
            }
    
            if (currentKey.match) {
              if(inputValue !== currentKey.match.current.value) {
                errorText = currentKey.matchLabel + ' should match ' + currentKey.label
                erroredElements.push(currentKey.ref.current)
              }
            }  
            
            currentKey.errorText = errorText
          }
      }
    }       
    
    inputs.inputErors = erroredElements.length
    inputs.setErroredInputs(() => [ ...erroredElements])

    if (erroredElements.length > 0) {
      return setCustomReply({
        status: 'erroredElements',
        debugLine: _getDebugLine()
      })
    } else {
      return setSuccessReply({
        debugLine: _getDebugLine()
      })
    }    
  } catch (error) {
    return setErrorReply({
      message: error.message || '',
      obj: error
    })
  }
}

export const clearErrors = (inputs) => {
  for (let key in inputs) {    
    if (inputs.hasOwnProperty(key)) {
        if (inputs[key].validate) {
          inputs[key].errorText = ''
          inputs.setErroredInputs(() => [])
        }
    }
  }
}

export const addError = (field, error) => {
  field['errorText'] = error  
}
