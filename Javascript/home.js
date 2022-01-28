let empPayrollList;
//Whenever our file gets loaded this window function will be called.
window.addEventListener('DOMContentLoaded', (event) => {
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHTML();
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}

//Template literal 
const createInnerHTML = () => {
        //let empPayrollList = createEmployeePayrollJson()[1];
        //console.log(empPayrollData);

        const headerHtml = `<tr>
    <th>Profile</th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
</tr>`;
        if (empPayrollList.length == 0) return;
        let innerHtml = `${headerHtml}`;
        //let innerHtml = `${headerHtml}
        //let empPayrollList = createEmployeePayrollJson();
        for (const empPayrollData of empPayrollList) {
            innerHtml = `${innerHtml}

<tr>
    <td><img class="profile" alt="profileImage" src="${empPayrollData._profilePic}"></td>
    <td>${empPayrollData._name}</td>
    <td>${empPayrollData._gender}</td>
    <td>${getDeptHtml(empPayrollData._department)}</td>
    <td>${empPayrollData._salary}</td>
    <td>${empPayrollData._startDate}</td>
    <td>
        <img id ="${empPayrollData._id}" alt="delete" src="../Assets/assets/icons/delete-black-18dp.svg" onClick=remove(this)>
        <img id ="${empPayrollData._id}" alt="update" onclick="update()"" src="../Assets/assets/icons/create-black-18dp.svg">
    </td>
</tr>
    
    `;
        }
        document.querySelector('#display').innerHTML = innerHtml;
    }
    /*
    const createEmployeePayrollJson = () => {
        let empPayrollList = [{
                "id": 1,
                "_name": "Mark",
                "_gender": "male",
                "_department": [
                    "Finance"
                ],
                "_salary": "500000",
                "_startDate": 1572287400000,
                "_note": "All In One",
                "_profilePic": "../Assets/assets/profile-images/Ellipse -3.png"
            },
            {
                "id": 2,
                "_name": "Bill",
                "_gender": "male",
                "_department": [
                    "Engineering",
                    "Finance"
                ],
                "_salary": "500000",
                "_startDate": "29 Oct 2019",
                "_note": "Terrific Engineer",
                "_profilePic": "../Assets/assets/profile-images/Ellipse -1.png"
            }
        ];
        return empPayrollList;
    }
    */
const getDeptHtml = (deptList) => {
        let deptHtml = '';
        for (const dept of deptList) {
            deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`;
        }
        return deptHtml;
    }
    //UC => 1 Day 46 part. first did some changes on line 43 and 44 with name being replaced with id.
const remove = (data) => {
    let employeeData = empPayrollList.find(empData => empData._id == data.id);
    if (!employeeData)
        return;
    const index = empPayrollList.map(empData => empData._id).indexOf(employeeData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem('EmployeePayrollList', JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHTML();
}