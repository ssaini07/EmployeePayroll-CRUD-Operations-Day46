let isUpdate = false; // for Day46 UC2
employeePayrollObject = {}; // for Day46 UC2

window.addEventListener('DOMContentLoaded', () => {
    validName();
    salaryRange();
    checkForUpdate(); // For Day46 UC2
});

// UC2
/**Here validating name */
function validName() {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener('input', function() {
        try {
            let empData = new EmployeePayrollData();
            empData.name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });
}

/** set event listener on salary range*/
function salaryRange() {
    const salary = document.querySelector("#salary");
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function() {
        output.textContent = salary.value;
    });
}

//UC3 => Ability to create Employee Payroll Object On Save.
const save = (event) => {
    try {
        event.preventDefault();
        event.stopPropagation();
        let employeePayrollData = createEmployeePayroll();
        console.log(employeePayrollData);
        //alert(JSON.stringify(employeePayrollData));
        createAndUpdateLocalStorage(employeePayrollData);
        alert("Data added with the name: " + employeePayrollData._name);
        window.location.replace(siteProperties.homePage);
    } catch (error) {
        console.log(error);
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
    }
    try {
        let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        employeePayrollData.startDate = new Date(Date.parse(date));
        setTextValue('.date-error', "");
    } catch (e) {
        setTextValue('.date-error', e);
    }

    //alert(JSON.stringify(employeePayrollData));
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    employeePayrollData.id = employeePayrollObject._id;
    return employeePayrollData;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;;
}

const setTextValue = (id, message) => {
    const textError = document.querySelector(id);
    textError.textContent = message;
}

const getSelectedValues = (propertyValue) => {
        let allItem = document.querySelectorAll(propertyValue);
        let setItem = [];
        allItem.forEach(item => {
            if (item.checked == true) {
                setItem.push(item.value);
            }
        })
        return setItem;
    }
    //Day 46 UC => 3 save employee object into local storage */
const createNewEmpId = () => {
    let empId = localStorage.getItem("empId");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem('empId', empId);
    return empId;
}

const createAndUpdateLocalStorage = (empData) => {
    let dataList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    //Day46 UC => 3
    /**Ability to save updated employee payroll into local storage */
    if (dataList) {
        let existingEmpData = dataList.find(data => data._id == empData.id);
        if (!existingEmpData) {
            empData.id = createNewEmpId();
            dataList.push(empData);
        } else {
            const index = dataList.map(emp => emp._id).indexOf(empData.id);
            dataList.splice(index, 1, empData);
        }
    } else {
        empData.id = createNewEmpId();
        dataList = [empData];
    }
    localStorage.setItem('EmployeePayrollList', JSON.stringify(dataList));

    // if (dataList != undefined) {
    //     dataList.push(empData);
    // } else {
    //     dataList = [empData];
    // }
    // localStorage.setItem('EmployeePayrollList', JSON.stringify(dataList));
    // alert("Data stored with the name: " + empData.name);
}

/** UC5 => Reset employee payroll form */
const resetForm = () => {
    setTextValue('#name', '');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary', '');
    setValue('#notes', '');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue('#year', '2021');
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    });
}

// const setValue = (id, value) => {
//     const element = document.querySelector(id);
//     element.value = value;
// }

/** Day46 => UC2 => Update an employee payroll details */
/** check for Update and set the valuees of the form elements  */
const checkForUpdate = () => {
    let jsonData = localStorage.getItem('edit-emp');
    isUpdate = jsonData ? true : false;
    if (!isUpdate)
        return;
    employeePayrollObject = JSON.parse(jsonData);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObject._name);
    setSelectValue('[name=profile]', employeePayrollObject._profilePic);
    setSelectValue('[name=gender]', employeePayrollObject._gender);
    setSelectValue('[name=department]', employeePayrollObject._department);
    setValue('#salary', employeePayrollObject._salary);
    setTextValue('.salary-output', employeePayrollObject._salary);
    let date = stringifyDate(employeePayrollObject._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    setValue('#notes', employeePayrollObject._note);
}

const setSelectValue = (propertyValue, value) => {
    let allItem = document.querySelectorAll(propertyValue);
    allItem.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        } else if (item.value == value) {
            item.checked = true;
        }
    });
}
const setValue = (id, value) => {
    let element = document.querySelector(id);
    element.value = value;
}