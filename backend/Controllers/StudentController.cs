using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Lab6.model;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LAB6.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class StudentController : Controller
    {

        private readonly IConfiguration _configuration;
        public StudentController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get([FromQuery] string Status = "Active")
        {
            return new JsonResult(new Student().Students_GetAll(Status, _configuration));
        }

        [HttpPost]
        //public JsonResult Post([FromBody] Student student)
        //{
        //    return new JsonResult(new Student().Student_Save(student).ReturnMessage);
        //}
        //public IActionResult Post([FromBody] int studentid, string studentname, string CONTACT, string EMAIL, string studentregno, string Status) {
        //    new Student().insert_student(studentid, studentname, CONTACT, EMAIL, studentregno, Status);
        //    return Ok();
        //}

        public JsonResult Post([FromBody] Student s)
        {
            new Student().insert_student(s.studentid, s.studentname, s.CONTACT, s.EMAIL, s.studentregno, s.Status);
            return new JsonResult("OK");
        }


        [HttpPut]
        public IActionResult update_student([FromBody] Student s)
        {
            new Student().update_student(s.studentid, s.studentname, s.studentregno, s.CONTACT, s.EMAIL);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete([FromBody] Student s)
        {
            new Student().delete_student(s.studentid);
            return Ok();
        }
    }
}

