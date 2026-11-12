
function isEmptyString(term)
{
    return term ==="";
}

function validateTitle(term)
{
    if(isEmptyString) return false;
    return true;
}
function validateDueDate(date)
{
    if(isEmptyString) return false;
    let d = new Date(date);
    if(d < Date.now()) return false;

    return true;
    
}
function validatePriority(term) 
{
    return !isEmptyString(term);
}
function validateMember(term)
{
     return !isEmptyString(term);
}
function validateStatus(term)
{
     return !isEmptyString(term);
}

export const AddNewPanelValidators = {

    valideTitle: (title)=> validateTitle(title),
    validDueDate: (dueDate)=> validateDueDate(dueDate),
    validPriority: (priority) => validatePriority(priority),
    validMember: (member) => validateMember(member),
    validStatus: (status) => validateStatus(status)
}