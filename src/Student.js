import React from "react";
import { variables } from "./Variables";
export class Student extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            students: [],
            modalTittle: "",
            studentid: 0,
            studentname: "",
            CONTACT: "",
            EMAIL: "",
            studentregno: "",
            Status: ""
        }
    }
    refreshList() {
        fetch(variables.API_URL + 'student?Status=Active')
            .then(response => response.json())
            .then(data => {
                this.setState({ students: data });
                console.log(data);
            });
    }
    changestudentid = (e)=>{this.setState({studentid:e.target.value});}
    changeregno = (e)=>{this.setState({studentregno:e.target.value});}
    changename = (e)=>{this.setState({studentname:e.target.value});}
    changecontact = (e)=>{this.setState({CONTACT:e.target.value});}
    changeemail = (e)=>{this.setState({EMAIL:e.target.value});}
    changestatus = (e)=>{this.setState({Status:e.target.value});}

    componentDidMount(){
        this.refreshList();
    }

    addclick(){
        this.setState({
            modalTittle: "Add student",
            studentid: 0,
            studentregno: "",
            studentname: "",
            EMAIL: "",
            CONTACT: "",
            Status: ""
        })
    }

    editClick(s){
        this.setState({
            modalTitle:'Edit student',
            studentid:s.studentid,
            studentregno:s.studentregno,
            studentname:s.studentname,
            CONTACT:s.CONTACT,
            EMAIL:s.EMAIL
        });
    }

    createClick(){
        fetch(variables.API_URL + 'student',{
            method: "POST",
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                studentid:this.state.studentid,
                studentname:this.state.studentname,
                CONTACT:this.state.CONTACT,
                EMAIL:this.state.EMAIL,
                studentregno:this.state.studentregno,
                Status:this.state.Status,
                returnMessage: "OK"
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();

        },(error)=>{
            console.log(error);
            alert("Failed");
        })
    }
    updateClick(){
        fetch(variables.API_URL+'student',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                studentid:this.state.studentid,
                studentname:this.state.studentname,
                studentregno:this.state.studentregno,
                CONTACT:this.state.CONTACT,
                EMAIL:this.state.EMAIL,
                Status:"Active",
                returnMessage: "ok"})
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result);
                this.refreshList();
            },(error)=>{
                alert('Failed');
            })
        }
        deleteClick(s){
            if(window.confirm('Are you Sure to Delete?')) {
                fetch(variables.API_URL+'student',{
                    method:'DELETE',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({
                        studentid:s.studentid,
                        studentregno: "string",
                        studentname: "string",
                        CONTACT: "string",
                        EMAIL: "string",
                        Status: "Active",
                        returnMessage: "OK"
                    })
                })
                .then(res=>res.json())
                .then((result)=>{
                    alert(result);
                    this.refreshList();
                },(error)=>{
                    alert('Failed');
            })}
        }

    render(){
        const {
            students,
            modalTittle,
            studentid,
            studentname,
            CONTACT,
            EMAIL,
            studentregno,
            Status
        } = this.state

       
        return(
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" role="dialog" data-bs-backdrop="static" onClick={()=>this.addclick()}>Add Student</button>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Student Id</th>
                            <th>Registration Number</th>
                            <th>Student Name</th>
                            <th>Contact No</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students?.map(s =>
                                <tr key={s.studentid}>
                                    <td>{s.studentid}</td>
                                    <td>{s.studentregno}</td>
                                    <td>{s.studentname}</td>
                                    <td>{s.CONTACT}</td>
                                    <td>{s.EMAIL}</td>
                                    <td>{s.Status}</td>
                                    <td>
                                        <button type="button"className="btn btn-light mr-1"data-bs-toggle="modal"data-bs-target="#exampleModal"onClick={()=>this.editClick(s)}>
                                            <svg xmlns="http://www.w3.org/2000/svg"width="16"height="16"fill="currentColor"className="bibi-pencil-square"viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd"d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </button>
                                        <button type="button"className="btn btn-light mr-1"onClick={()=>this.deleteClick(s)}>
                                            <svg xmlns="http://www.w3.org/2000/svg"width="16"height="16"fill="currentColor"className="bi bi-trash-fill"viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                    <div class="modal-dialog" role="document" >
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">{modalTittle}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Student ID</span>
                                    <input type="text" className="form-control" value={studentid} onChange={this.changestudentid}/>
                                </div>
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Student Name</span>
                                    <input type="text" className="form-control" value={studentname} onChange={this.changename}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Student Contact</span>
                                    <input type="text" className="form-control" value={CONTACT} onChange={this.changecontact}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Student Email</span>
                                    <input type="text" className="form-control" value={EMAIL} onChange={this.changeemail}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Student Reg No</span>
                                    <input type="text" className="form-control" value={studentregno} onChange={this.changeregno}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Student Status</span>
                                    <input type="text" className="form-control" value={Status} onChange={this.changestatus}/>
                                </div>
                                <button type="button" className="btn btn-primary float-start" onClick={()=>this.createClick()}>Create</button>
                                <button type="button"className="btn btn-primary float-start"onClick={()=>this.updateClick()}>Update</button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}