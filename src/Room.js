import React from "react";
import { variables } from "./Variables";
export class Room extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            modalTitle: "",
            room_id: 0,
            capacity: 0,
            room_no: ""
        }
    }

    refreshList(){
        fetch(variables.API_URL + 'Room?room_id=4')
        .then(response => response.json())
        .then(data => {
            this.setState({ rooms: data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    addClick(){
        this.setState({
            modalTitle: "Add Room",
            room_id: 0,
            capacity: 0,
            room_no: ""
        })
    }

    editClick(r){
        this.setState({
            modalTitle: "Edit Room",
            room_id:r.room_id,
            capacity:r.capacity,
            room_no:r.room_no
        })
    }

    deleteClick(r){
        if(window.confirm("Are you sure want to delete")){
            fetch(variables.API_URL+'Room', {
                method: 'Delete',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    room_id:r.room_id,
                    capacity:0,
                    room_no:"string"
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                alert(result)
                this.refreshList()
            },(error)=>{
                alert("Failed")
            })
        }
    }

    createClick(){
        fetch(variables.API_URL+'Room',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                room_id:this.state.room_id,
                capacity:this.state.capacity,
                room_no:this.state.room_no
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList()
        },(error)=>{
            alert("Failed")
        })
    }

    updateClick(){
        fetch(variables.API_URL+'Room',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                room_id:this.state.room_id,
                capacity:this.state.capacity,
                room_no:this.state.room_no
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList()
        },(error)=>{
            alert("Failed")
        })
    }

    changeroomid =(e)=>{this.setState({room_id:e.target.value});}
    changecapacity = (e) =>{this.setState({capacity:e.target.value});}
    cahngeroomno = (e) => {this.setState({room_no:e.target.value});}

    render(){
        const{
            rooms,
            modalTitle,
            room_id,
            capacity,
            room_no
        } = this.state

        return(
            <div>
                <button type="button" className="btn btn-primary m-2 float-end" data-bs-toggle="modal"
                data-bs-target="#exampleModal" data-bs-backdrop="static" onClick={()=>this.addClick()}>Add Room</button>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Room Id</th>
                            <th>Capacity</th>
                            <th>Room No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rooms?.map(r =>
                                <tr key={r.room_id}>
                                    <td>{r.room_id}</td>
                                    <td>{r.capacity}</td>
                                    <td>{r.room_no}</td>
                                    <td>
                                        <button type="button" className="btn btn-light mr-1" data-s-toggle="modal" data-bs-target="#exampleModal" onClick={()=>this.editClick(r)}>
                                            <svg xmlns="http://www.w3.org/2000/svg"width="16"height="16"fill="currentColor"className="bibi-pencil-square"viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                <path fillRule="evenodd"d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                            </svg>
                                        </button>
                                        <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(r)}>
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
                                <h5 class="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Room ID</span>
                                    <input type="text" className="form-control" value={room_id} onChange={this.changeroomid}/>
                                </div>
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Capacity</span>
                                    <input type="text" className="form-control" value={capacity} onChange={this.changecapacity}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Room No</span>
                                    <input type="text" className="form-control" value={room_no} onChange={this.cahngeroomno}/>
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