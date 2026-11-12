
function isEmptyString(term)
{
    return term ==="";
}

function validateTitle(term)
{
    return isEmptyString(term) ? "Task title is required to continue please feel the fieled": null;
}
function validateDueDate(date)
{
    let d = new Date(date);
    return isEmptyString(date) ? "You have to pick a due date to continue the process": (d < Date.now()) ? "You must pick tody or day in the future" : null;
    
}
function validatePriority(term) 
{
    return isEmptyString(term) ? "Priority is required!" : null;
}
function validateMember(term)
{
     return isEmptyString(term)? "You have to select a member first" : null;
}
function validateStatus(term)
{
     return isEmptyString(term) ? "Status is required!" : null;
}

export const AddNewPanelValidators = {

    valideTitle: (title)=> validateTitle(title),
    validDueDate: (dueDate)=> validateDueDate(dueDate),
    validPriority: (priority) => validatePriority(priority),
    validMember: (member) => validateMember(member),
    validStatus: (status) => validateStatus(status)
}