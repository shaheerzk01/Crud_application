using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Lab6.model;
namespace Lab6.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class TeacherController : Controller
    {
        [HttpGet]
        public JsonResult Get([FromQuery] int teacherid)
        {
            return new JsonResult(new teacher().teacher_getall(teacherid));
        }

        [HttpPost]
        public IActionResult Post([FromQuery] int teacherid, string teachername, string contact, string email)
        {
            new teacher().insertall_teacher(teacherid, teachername, contact, email);
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] int teacherid)
        {
            new teacher().deleteall_teacher(teacherid);
            return Ok();
        }

        [HttpPut]
        public IActionResult update_teacher([FromQuery] int teacherid, string teachername, string contact, string email)
        {
            new teacher().updateall_teacher(teacherid, teachername, contact, email);
            return Ok();
        }
    }
}

