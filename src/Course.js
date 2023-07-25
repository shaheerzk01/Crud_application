import React from "react";
import { variables } from "./Variables";

export class Course extends React.Component
{
    constructor(porps){
        super(props);
        this.state = {
            courses: [],
            modalTitle: "",
            COURSE_ID:0,
            COURSE_CODE: "",
            COURSE_NAME: "",
            SHORT_NAME: ""
        }
    }

    refrehList(){
        fetch(variables.API_URL + 'Course')
        .then(response => response.json)
        .then(data => {
            this.setState({ courses: data})
        })
    }

    componentDidMount(){
        this.refrehList();
    }

    addClick(){
        this.setState({
            modalTitle: 'Add course',
            COURSE_ID:0,
            COURSE_CODE: "",
            COURSE_NAME: "",
            SHORT_NAME: ""
        })
    }

    editClick(c){
        this.setState({
            modalTitle: "Edit Course",
            COURSE_ID: c.COURSE_ID,
            COURSE_CODE: c.COURSE_CODE,
            COURSE_NAME: c.COURSE_NAME,
            SHORT_NAME: c.SHORT_NAME
        })
    }

    createClick(){
        fetch(variables.API_URL + "Course",{
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                COURSE_ID:this.state.COURSE_ID,
                COURSE_CODE:this.state.COURSE_CODE,
                COURSE_NAME:this.name.COURSE_NAME,
                SHORT_NAME:this.SHORT_NAME    
            })
        })
        .then(res=>res.json)
        .then((result) => {
            alert(result)
            this.refrehList()
        },(error) => {
            alert("Failed")
        })
    }

    render(){
        const{
            courses,
            modalTitle,
            COURSE_ID,
            COURSE_CODE,
            COURSE_NAME,
            SHORT_NAME
        } = this.state
    }
}
