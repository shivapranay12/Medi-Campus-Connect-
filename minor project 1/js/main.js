var flag = 1;
document.addEventListener("DOMContentLoaded", function() {

    var lastChildOfUserinfo = document.querySelector('.userinfo').lastElementChild;
    var enterData = document.querySelector('.adduserbtn');
    var userDisplay = document.querySelector('.userinfo');
    var inputDisplay = document.querySelector('.enterdata');

    function fetchData() { // Fetching data 
        var http = new XMLHttpRequest();
        http.open('GET', 'https://6669a9652e964a6dfed610fb.mockapi.io/bvrithospital/studentsdata');
        http.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(http.responseText);
                var userdata = document.querySelector('.userData');
                if (userdata !== null) {
                    userdata.innerHTML = '';
                }

                for (let i = 0; i < data.length; i++) {
                    let id = data[i].id;
                    let name = data[i].name;
                    let branch = data[i].branch;
                    let healthIssue = data[i].healthIssue;
                    let hostelDay = data[i].hostelDay;
                    let date=data[i].date;
                    ShowData(id, name, branch, healthIssue, hostelDay,date);
                }

            } else {
                
                console.log("API is not working ");
            }
        };
        http.send();
    }

    enterData.addEventListener("click", () => {  // Formdata Displaying
        userDisplay.style.display = 'none';
        inputDisplay.style.display = 'block';
        enterData.style.display = 'none';
    });

    document.querySelector('.enterdata form').addEventListener("submit", function(event) { // Creating new userdata
        event.preventDefault();
        userDisplay.style.display = 'block';
        inputDisplay.style.display = 'none';
        enterData.style.display = 'block';

        var id = document.querySelector('.enterdata form input[name="StudentRollNo"]').value;
        var name = document.querySelector('.enterdata form input[name="StudentName"]').value;
        var branch = document.querySelector('.enterdata form select[name="Branch"]').value;
        var healthIssue = document.querySelector('.enterdata form input[name="HealthIssue"]').value;
        var hostelDay = document.querySelector('.enterdata form select[name="HostelDay"]').value;
        var today = new Date();
        var options = { year: 'numeric', month: 'short', day: 'numeric' };
        var formattedDate = today.toLocaleDateString('en-US', options);

        const data = {
            id: id,
            name: name,
            branch: branch,
            healthIssue: healthIssue,
            hostelDay: hostelDay,
            date: formattedDate // Adding today's date to the data object
        };

        SaveData(data);
        ShowData(id, name, branch, healthIssue, hostelDay, formattedDate); // Pass the date to ShowData function

    });

    function SaveData(data) {  // Saving Data into API using POST
        const http = new XMLHttpRequest();
        http.open('POST', 'https://6669a9652e964a6dfed610fb.mockapi.io/bvrithospital/studentsdata');
        http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        http.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
                fetchData();
            } else {
                console.log("API is not working");
            }

        };
        http.send(JSON.stringify(data));
    }

    function showpopup(name, id, parent) { // Showing popup to delete
        var popup = document.createElement('div');
        popup.innerHTML = `<section class="dltpopup">
    <div class="confirm">
        Confirm the Student
        <img class="cross" width="30px" height="30px" src="https://img.icons8.com/ios/50/multiply.png" alt="multiply"/>
    </div>
    <div class="d">Deleting : ${name}</div>
    <div>
        <div class="bt">
        <button class="delete">Delete</button>
        <button class="cancel">Cancel</button>
        </div>
    </div>
    </section>`;

        popup.classList.add('dltpopup');
        var main = document.querySelector('.main');
        main.style.opacity = '0.5';
        var cancel = popup.querySelector('.cancel');
        var dlt = popup.querySelector('.delete');
        var cross = popup.querySelector('.cross');

        cancel.addEventListener("click", () => {
            popup.remove();
            main.style.opacity = '1';
            return;

        });
        cross.addEventListener("click", () => {
            popup.remove();
            main.style.opacity = '1';
            return;
        });

        dlt.addEventListener("click", () => {
            popup.remove();
            main.style.opacity = '1';
            deleteData(id);
            parent.remove();
            return;

        });

        document.body.appendChild(popup);
    }

    function ShowData(id, name, branch, healthIssue, hostelDay,date) { // Displaying Every user Data and Creating new dynamically HTML

        var userDataDiv = document.createElement('div');
        userDataDiv.classList.add('userdata');

        userDataDiv.innerHTML = `
        <div class="date">${date}</div>
        <div class="id">${id}</div>
        <div class="name">${name}</div>
        <div class="branch">${branch}</div>
        <div class="comment">${healthIssue}</div>
        <div class="hostelDay">${hostelDay}</div>
        <div class="functions"> 
            <div class="btns" >
                <div class="edit" ><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40%" height="40%" viewBox="0 0 50 50">
                    <path d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
                    </svg>
                </div>
                <div class="dlt"><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="40%" height="40%" viewBox="0 0 30 30">
                    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 8.5 9 L 8.4648438 9 A 1.0001 1.0001 0 0 0 7.5 10 L 8.4042969 24.574219 C 8.5312969 26.540219 10.144625 28 12.109375 28 L 17.890625 28 C 19.855375 28 21.468703 26.540219 21.595703 24.574219 L 22.5 10 A 1.0001 1.0001 0 0 0 21.535156 9 L 21.5 9 L 20.5 9 A 1.0001 1.0001 0 0 0 20.5 11 L 21.496094 11 L 20.607422 24.423828 C 20.532422 25.527828 19.453625 27 17.890625 27 L 12.109375 27 C 10.546375 27 9.4675781 25.527828 9.3925781 24.423828 L 8.5039062 11 L 9.5 11 A 1.0001 1.0001 0 1 0 9.5 9 L 8.5 9 z"></path>
                    </svg>
                </div>
            </div>
        </div>
        `;

        lastChildOfUserinfo.parentNode.insertBefore(userDataDiv, lastChildOfUserinfo.nextSibling);
 
        document.querySelector('.dlt').addEventListener("click",function(event){  //DELETE BUTTON
            var parent = event.target.closest(".userdata");
        var id=parent.querySelector('.id').textContent;
        var name=parent.querySelector('.name').textContent;
        showpopup(name,id,parent);
        });
          


        document.querySelector('.edit').addEventListener("click", function(event) {  // EDIT BUTTON
            if (flag == 0) return;
            flag = 0;
            var parent = event.target.closest(".userdata");
            
            var idEle = parent.querySelector('.id');
            var nameEle = parent.querySelector('.name');
            var branchEle = parent.querySelector('.branch');
            var healthIssueEle = parent.querySelector('.comment');
            var dateEle = parent.querySelector('.date'); 
            var hostelDayEle = parent.querySelector('.hostelDay');
        
            var presentid = idEle.textContent;
            var presentname = nameEle.textContent;
            var presentbranch = branchEle.textContent;
            var presenthealthIssue = healthIssueEle.textContent;
            var presenthostelDay = hostelDayEle.textContent;
            var presentdate = dateEle.textContent;
        
            idEle.innerHTML = `<input type="text" name="StudentRollNo" placeholder="Enter Student Roll No" value="${presentid}">`;
            dateEle.innerHTML = `<input type="text" name="Customerdate" value="${presentdate}" >`;
            nameEle.innerHTML = `<input type="text" name="StudentName" placeholder="Enter Student Name" value="${presentname}">`;
            branchEle.innerHTML = `<select name="Branch">
                                       <option value="Branch">Branch</option>
                                       <option value="CSE" ${presentbranch === 'CSE' ? 'selected' : ''}>CSE</option>
                                       <option value="ECE" ${presentbranch === 'ECE' ? 'selected' : ''}>ECE</option>
                                       <option value="CIVIL" ${presentbranch === 'CIVIL' ? 'selected' : ''}>CIVIL</option>
                                       <option value="MECH" ${presentbranch === 'MECH' ? 'selected' : ''}>MECH</option>
                                       <option value="IT" ${presentbranch === 'IT' ? 'selected' : ''}>IT</option>
                                       <option value="CSBS" ${presentbranch === 'CSBS' ? 'selected' : ''}>CSBS</option>
                                       <option value="AIDS" ${presentbranch === 'AIDS' ? 'selected' : ''}>AIDS</option>
                                       <option value="CSM" ${presentbranch === 'CSM' ? 'selected' : ''}>CSM</option>
                                       <option value="CSD" ${presentbranch === 'CSD' ? 'selected' : ''}>CSD</option>
                                       <option value="BME" ${presentbranch === 'BME' ? 'selected' : ''}>BME</option>
                                       <option value="PHE" ${presentbranch === 'PHE' ? 'selected' : ''}>PHE</option>
                                   </select>`;
            healthIssueEle.innerHTML = `<input type="text" name="HealthIssue" placeholder="Enter Health Issue" value="${presenthealthIssue}">`;
            hostelDayEle.innerHTML = `<select name="HostelDay">
                                      
                                        <option value="Hosteller" ${presenthostelDay === 'Hosteller' ? 'selected' : ''}>Hosteller</option>
                                        <option value="DayScholar" ${presenthostelDay === 'DayScholar' ? 'selected' : ''}>Day Scholar</option>
                                      </select>`;
        
            var saveButton = document.createElement('div');
            saveButton.classList.add('save');
            saveButton.innerHTML = `<p>SAVE</p>`;
        
            saveButton.addEventListener("click", function(event) { // EDIT SAVE BUTTON
                event.preventDefault();
                flag = 1;
        
                var id = parent.querySelector('input[name="StudentRollNo"]').value;
                var name = parent.querySelector('input[name="StudentName"]').value;
                var branch = parent.querySelector('select[name="Branch"]').value;
                var healthIssue = parent.querySelector('input[name="HealthIssue"]').value;
                var hostelDay = parent.querySelector('select[name="HostelDay"]').value;
                var date = parent.querySelector('input[name=Customerdate]').value;
        
                const data = {
                    id: id,
                    date: date,
                    name: name,
                    branch: branch,
                    healthIssue: healthIssue,
                    hostelDay: hostelDay,
                    date:date
                };
        
                updateData(data, id);
        
                idEle.textContent = id;
                nameEle.textContent = name;
                branchEle.textContent = branch;
                healthIssueEle.textContent = healthIssue;
                hostelDayEle.textContent = hostelDay;
                dateEle.textContent=date;
        
                var editDiv = document.createElement('div');
                editDiv.classList.add('edit');
                editDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 50 50">
                                        <path d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
                                     </svg>`;
        
                parent.querySelector('.save').remove();
            });
        
            var par = parent.querySelector('.edit').parentNode;
            par.appendChild(saveButton);
        });
    }   
    

    function updateData(data, id) {
        // AJAX request to update data on the server
        fetch(`https://6669a9652e964a6dfed610fb.mockapi.io/bvrithospital/studentsdata/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(updatedData => {
            console.log('Data updated successfully:', updatedData);
        })
        .catch(error => {
            console.error('Error updating data:', error);
        });
    }
    

    function deleteData(id) {  // Deleting Data from API using DELETE
        const http = new XMLHttpRequest();
        http.open('DELETE', `https://6669a9652e964a6dfed610fb.mockapi.io/bvrithospital/studentsdata/${id}`);
        http.onload = function() {
            if (this.readyState == 4 && this.status == 200) {
               
            } else {
                console.log("API is not working");
            }

        };
        http.send();
    }

    window.onload=fetchData;

});
